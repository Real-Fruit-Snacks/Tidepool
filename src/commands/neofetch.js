import { palette } from '../theme.js';
import { fg, bg, bold, dim } from '../formatter.js';

const ART_WIDTH = 41;

const ASCII_ART = [
  '  _______     __                       __',
  ' /_  __(_)___/ /__  ____  ____  ____  / /',
  '  / / / / __  / _ \\/ __ \\/ __ \\/ __ \\/ / ',
  ' / / / / /_/ /  __/ /_/ / /_/ / /_/ / /  ',
  '/_/ /_/\\__,_/\\___/ .___/\\____/\\____/_/   ',
  '                /_/                      ',
];

export function register(registry) {
  registry.register('neofetch', {
    description: 'System info display',
    category: 'Info',
    aliases: ['fetch'],
    action(ctx) {
      const data = ctx.githubData;
      const user = data?.user || {};

      const info = [
        ['', fg(palette.green, bold('visitor')) + fg(palette.text, '@') + fg(palette.mauve, bold('real-fruit-snacks'))],
        ['', dim('─'.repeat(30))],
        ['OS', fg(palette.text, 'TerminalOS 1.0 (Browser)')],
        ['Host', fg(palette.text, 'github.com/Real-Fruit-Snacks')],
        ['Shell', fg(palette.text, 'web-sh 1.0')],
        ['Terminal', fg(palette.text, 'xterm.js v5')],
        ['Theme', fg(palette.text, 'Catppuccin Mocha')],
        ['', ''],
        ['Repos', fg(palette.blue, String(user.public_repos ?? '~'))],
        ['Followers', fg(palette.mauve, String(user.followers ?? '~'))],
        ['Following', fg(palette.green, String(user.following ?? '~'))],
        ['Member Since', fg(palette.peach, user.created_at ? new Date(user.created_at).getFullYear().toString() : '~')],
      ];

      ctx.term.writeln('');

      const artLines = ASCII_ART.length;
      const infoLines = info.length;
      const maxLines = Math.max(artLines, infoLines);

      for (let i = 0; i < maxLines; i++) {
        const artLine = i < artLines ? fg(palette.mauve, ASCII_ART[i]) : ' '.repeat(ART_WIDTH);

        if (i < infoLines) {
          const [key, val] = info[i];
          const label = key ? fg(palette.blue, bold(key.padEnd(14))) : ''.padEnd(14);
          ctx.term.writeln(`  ${artLine}  ${label}${val}`);
        } else {
          ctx.term.writeln(`  ${artLine}`);
        }
      }

      // Color blocks
      ctx.term.writeln('');
      const colors = [palette.red, palette.peach, palette.yellow, palette.green, palette.teal, palette.blue, palette.mauve, palette.pink];
      let colorBar = '  ' + ' '.repeat(ART_WIDTH) + '  ';
      for (const c of colors) {
        colorBar += bg(c, '   ');
      }
      ctx.term.writeln(colorBar);
      if (!data?.updated_at) {
        ctx.term.writeln(dim('  GitHub data not yet loaded. It updates daily via CI.'));
      }
      ctx.term.writeln('');
    }
  });
}
