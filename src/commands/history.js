import { palette } from '../theme.js';
import { fg, dim } from '../formatter.js';

export function register(registry) {
  registry.register('history', {
    description: 'Show command history',
    category: 'General',
    action(ctx) {
      const entries = ctx.history.getAll();
      if (entries.length === 0) {
        ctx.term.writeln(dim('  No history yet.'));
        return;
      }
      for (let i = 0; i < entries.length; i++) {
        const num = String(i + 1).padStart(4);
        ctx.term.writeln(`${dim(num)}  ${fg(palette.text, entries[i])}`);
      }
    }
  });
}
