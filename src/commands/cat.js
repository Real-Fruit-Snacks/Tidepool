import { palette } from '../theme.js';
import { fg, dim } from '../formatter.js';

export function register(registry) {
  registry.register('cat', {
    description: 'Display file contents',
    category: 'Navigation',
    aliases: ['less', 'more'],
    action(ctx, args) {
      if (!args.length) {
        ctx.term.writeln(fg(palette.red, 'cat: missing file operand'));
        return;
      }

      for (const path of args) {
        const absPath = ctx.fs.resolve(path);
        const node = ctx.fs.get(absPath);

        if (!node) {
          ctx.term.writeln(fg(palette.red, `cat: ${path}: No such file or directory`));
          continue;
        }
        if (node.type === 'dir') {
          ctx.term.writeln(fg(palette.red, `cat: ${path}: Is a directory`));
          continue;
        }

        const lines = node.content.split('\n');
        for (const line of lines) {
          ctx.term.writeln(line);
        }
      }
    }
  });
}
