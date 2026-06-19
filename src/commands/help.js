import { palette } from '../theme.js';
import { fg, bold, dim, box, padEnd } from '../formatter.js';

export function register(registry) {
  registry.register('help', {
    description: 'Show available commands',
    category: 'General',
    aliases: ['?'],
    action(ctx) {
      const commands = ctx.registry.getAll();
      const categories = {};
      for (const cmd of commands) {
        const cat = cmd.category || 'Other';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd);
      }

      const lines = [];
      const order = ['General', 'Navigation', 'Info', 'GitHub', 'Other'];
      const sorted = Object.keys(categories).sort((a, b) => {
        const ai = order.indexOf(a), bi = order.indexOf(b);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });

      for (const cat of sorted) {
        lines.push('');
        lines.push(fg(palette.mauve, bold(`  ${cat}`)));
        lines.push('');
        for (const cmd of categories[cat]) {
          const aliases = ctx.registry.getAliasesFor(cmd.name);
          const aliasStr = aliases.length ? dim(` (${aliases.join(', ')})`) : '';
          lines.push(`    ${fg(palette.green, cmd.name.padEnd(12))}${aliasStr}  ${dim(cmd.description)}`);
        }
      }
      lines.push('');

      const boxed = box(lines, { title: 'Commands', borderColor: palette.surface2 });
      for (const line of boxed) {
        ctx.term.writeln(line);
      }
    }
  });
}
