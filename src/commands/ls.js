import { palette } from '../theme.js';
import { fg, bold, dim, padEnd } from '../formatter.js';

export function register(registry) {
  registry.register('ls', {
    description: 'List directory contents',
    category: 'Navigation',
    aliases: ['dir', 'll'],
    action(ctx, args) {
      // Parse flags from all dash-prefixed arguments (supports -l, -a, -la, -lah, etc.)
      const flags = new Set();
      for (const arg of args) {
        if (arg.startsWith('-') && !arg.startsWith('--')) {
          for (const ch of arg.slice(1)) flags.add(ch);
        }
      }
      const showAll = flags.has('a');
      const longFormat = flags.has('l');
      const hidden = showAll;

      // Get target path (non-flag argument)
      const target = args.find(a => !a.startsWith('-'));
      const absPath = target ? ctx.fs.resolve(target) : ctx.fs.cwd;
      const entries = ctx.fs.ls(absPath, hidden);

      if (entries === null) {
        ctx.term.writeln(fg(palette.red, `ls: cannot access '${target || absPath}': No such file or directory`));
        return;
      }

      if (entries.length === 0) {
        ctx.term.writeln(dim('  (empty directory)'));
        return;
      }

      if (longFormat) {
        // Long format
        for (const entry of entries) {
          const icon = entry.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--';
          const coloredName = entry.type === 'dir'
            ? fg(palette.blue, bold(entry.name + '/'))
            : entry.name.endsWith('.md')
              ? fg(palette.green, entry.name)
              : fg(palette.text, entry.name);
          ctx.term.writeln(`${dim(icon)}  ${coloredName}`);
        }
      } else {
        // Grid format
        const formatted = entries.map(e =>
          e.type === 'dir'
            ? fg(palette.blue, bold(e.name + '/'))
            : e.name.endsWith('.md')
              ? fg(palette.green, e.name)
              : fg(palette.text, e.name)
        );
        const names = entries.map(e => e.type === 'dir' ? e.name + '/' : e.name);
        const maxLen = Math.max(...names.map(n => n.length));
        const termCols = ctx.term.cols || 80;
        const cols = Math.max(1, Math.floor(termCols / (maxLen + 2)));

        let line = '';
        let col = 0;
        for (let i = 0; i < formatted.length; i++) {
          line += padEnd(formatted[i], maxLen + 2);
          col++;
          if (col >= cols) {
            ctx.term.writeln('  ' + line);
            line = '';
            col = 0;
          }
        }
        if (line) ctx.term.writeln('  ' + line);
      }
    }
  });
}
