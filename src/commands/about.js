import { palette } from '../theme.js';
import { fg, dim } from '../formatter.js';

export function register(registry) {
  registry.register('about', {
    description: 'About me',
    category: 'Info',
    action(ctx) {
      const node = ctx.fs.get('/about.md');
      if (node) {
        for (const line of node.content.split('\n')) {
          ctx.term.writeln(line);
        }
      } else {
        ctx.term.writeln(fg(palette.red, 'about: content not available'));
      }
    }
  });
}
