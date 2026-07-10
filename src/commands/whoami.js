import { palette } from '../theme.js';
import { fg, bold } from '../formatter.js';

export function register(registry) {
  registry.register('whoami', {
    description: 'Display current user',
    category: 'Info',
    action(ctx) {
      ctx.term.writeln(fg(palette.accent, bold('visitor')) + fg(palette.textNormal, '@') + fg(palette.violet, bold('real-fruit-snacks')));
    }
  });
}
