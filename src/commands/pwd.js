import { palette } from '../theme.js';
import { fg } from '../formatter.js';

export function register(registry) {
  registry.register('pwd', {
    description: 'Print working directory',
    category: 'Navigation',
    action(ctx) {
      ctx.term.writeln(fg(palette.blue, ctx.fs.cwd));
    }
  });
}
