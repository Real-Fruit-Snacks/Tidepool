import { palette } from '../theme.js';
import { fg } from '../formatter.js';

export function register(registry) {
  registry.register('cd', {
    description: 'Change directory',
    category: 'Navigation',
    action(ctx, args) {
      const target = args[0] || '~';
      const result = ctx.fs.cd(target);
      if (result.error) {
        ctx.term.writeln(fg(palette.red, result.error));
      }
    }
  });
}
