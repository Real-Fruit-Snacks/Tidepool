import { palette } from '../theme.js';
import { fg, bold, dim, box, keyValue } from '../formatter.js';
import { contact } from '../content.js';

export function register(registry) {
  registry.register('contact', {
    description: 'Contact information',
    category: 'Info',
    aliases: ['email', 'socials'],
    action(ctx) {
      const lines = [
        '',
        ...keyValue(contact, { keyColor: palette.green }),
        '',
      ];
      const boxed = box(lines, { title: 'Contact', borderColor: palette.surface2 });
      for (const line of boxed) {
        ctx.term.writeln(line);
      }
    }
  });
}
