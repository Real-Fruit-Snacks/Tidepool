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
        ['', fg(palette.accent, bold('visitor')) + fg(palette.textNormal, '@') + fg(palette.accentAlt, bold('real-fruit-snacks'))],
        ['', dim('─'.repeat(30))],
        ['OS', fg(palette.textNormal, 'TerminalOS 1.0 (Browser)')],
        ['Host', fg(palette.textNormal, 'github.com/Real-Fruit-Snacks')],
        ['Shell', fg(palette.textNormal, 'web-sh 1.0')],
        ['Terminal', fg(palette.textNormal, 'xterm.js v5')],
        ['Theme', fg(palette.textNormal, 'Terminal Workbench')],
        ['', ''],
        ['Repos', fg(palette.accentAlt, String(user.public_repos ?? '~'))],
        ['Followers', fg(palette.warm, String(user.followers ?? '~'))],
        ['Following', fg(palette.accent, String(user.following ?? '~'))],
        ['Member Since', fg(palette.orange, user.created_at ? new Date(user.created_at).getFullYear().toString() : '~')],
      ];

      ctx.term.writeln('');

      const artLines = ASCII_ART.length;
      const infoLines = info.length;
      const maxLines = Math.max(artLines, infoLines);

      for (let i = 0; i < maxLines; i++) {
        const artLine = i < artLines ? fg(palette.accent, ASCII_ART[i]) : ' '.repeat(ART_WIDTH);

        if (i < infoLines) {
          const [key, val] = info[i];
          const label = key ? fg(palette.accentAlt, bold(key.padEnd(14))) : ''.padEnd(14);
          ctx.term.writeln(`  ${artLine}  ${label}${val}`);
        } else {
          ctx.term.writeln(`  ${artLine}`);
        }
      }

      // Color blocks
      ctx.term.writeln('');
      const colors = [palette.red, palette.orange, palette.warm, palette.accent, palette.accentAlt, palette.violet];
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
