import { palette } from '../theme.js';
import { fg } from '../formatter.js';

export function register(registry) {
  registry.register('resume', {
    description: 'View my resume',
    category: 'Info',
    aliases: ['cv'],
    action(ctx) {
      const node = ctx.fs.get('/resume.md');
      if (node) {
        for (const line of node.content.split('\n')) {
          ctx.term.writeln(line);
        }
      } else {
        ctx.term.writeln(fg(palette.red, 'resume: content not available'));
      }
    }
  });
}
