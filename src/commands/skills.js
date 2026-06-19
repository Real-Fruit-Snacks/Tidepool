import { palette } from '../theme.js';
import { fg, bold, dim, progressBar } from '../formatter.js';
import { skills } from '../content.js';

export function register(registry) {
  registry.register('skills', {
    description: 'Technical skills',
    category: 'Info',
    aliases: ['tech', 'stack'],
    action(ctx) {
      for (const group of skills) {
        ctx.term.writeln('');
        ctx.term.writeln(fg(palette.mauve, bold(`  ${group.category}`)));
        ctx.term.writeln('');
        for (const skill of group.items) {
          const bar = progressBar(skill.level, 100, 20, {
            filled: skill.color,
            empty: palette.surface1
          });
          const name = fg(skill.color, skill.name.padEnd(14));
          const pct = dim(`${skill.level}%`);
          ctx.term.writeln(`    ${name} ${bar} ${pct}`);
        }
      }
      ctx.term.writeln('');
    }
  });
}
