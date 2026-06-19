import { palette } from '../theme.js';
import { fg, bold } from '../formatter.js';

export function register(registry) {
  registry.register('whoami', {
    description: 'Display current user',
    category: 'Info',
    action(ctx) {
      ctx.term.writeln(fg(palette.green, bold('visitor')) + fg(palette.text, '@') + fg(palette.mauve, bold('real-fruit-snacks')));
    }
  });
}
