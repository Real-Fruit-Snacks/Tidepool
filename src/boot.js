import { palette } from './theme.js';
import { fg, bold, dim } from './formatter.js';

const BOOT_MESSAGES = [
  { text: 'BIOS v1.0 - Real-Fruit-Snacks Systems', color: palette.borderStrong, delay: 30 },
  { text: 'Checking memory... 1024MB OK', color: palette.borderStrong, delay: 50 },
  { text: 'Detecting hardware...', color: palette.borderStrong, delay: 40 },
  { text: '', delay: 20 },
  { text: '[    0.000000] Linux version 6.1.0-terminal (gcc 13.2.0)', color: palette.textFaint, delay: 30 },
  { text: '[    0.000142] Command line: BOOT_IMAGE=/vmlinuz root=/dev/browser', color: palette.textFaint, delay: 20 },
  { text: '[    0.001337] x86_64 portfolio system detected', color: palette.textFaint, delay: 20 },
  { text: '[    0.004200] Memory: 1024MB available', color: palette.textFaint, delay: 20 },
  { text: '[    0.006900] CPU: WebAssembly vCPU @ ∞ GHz', color: palette.textFaint, delay: 20 },
  { text: '[    0.010000] xterm.js framebuffer initialized', color: palette.textFaint, delay: 30 },
  { text: '[    0.015000] Mounting virtual filesystem...', color: palette.textFaint, delay: 40 },
  { text: '[    0.020000] Loading user profile...', color: palette.textFaint, delay: 30 },
  { text: '[    0.025000] Network: GitHub API endpoint configured', color: palette.textFaint, delay: 30 },
  { text: '[    0.030000] All systems ready.', color: palette.accent, delay: 50 },
  { text: '', delay: 30 },
];

const LOGO = [
  ' _____ _     _                        _ ',
  '|_   _(_) __| | ___ _ __   ___   ___ | |',
  '  | | | |/ _` |/ _ \\ \'_ \\ / _ \\ / _ \\| |',
  '  | | | | (_| |  __/ |_) | (_) | (_) | |',
  '  |_| |_|\\__,_|\\___| .__/ \\___/ \\___/|_|',
  '                   |_|                  ',
];

const MOTD = [
  '',
  `  Welcome to ${fg(palette.accent, bold("Real-Fruit-Snacks"))}'s terminal portfolio`,
  '',
  `  ${dim('Type')} ${fg(palette.accent, 'help')} ${dim('to see available commands')}`,
  `  ${dim('Type')} ${fg(palette.accent, 'neofetch')} ${dim('for a quick overview')}`,
  `  ${dim('Type')} ${fg(palette.accent, 'repos')} ${dim('to see my GitHub projects')}`,
  '',
];

export async function* bootSequence() {
  // Kernel messages
  for (const msg of BOOT_MESSAGES) {
    yield { text: msg.text ? (msg.color ? fg(msg.color, msg.text) : msg.text) : '', delay: msg.delay };
  }

  // Logo
  for (const line of LOGO) {
    yield { text: fg(palette.accent, line), delay: 15 };
  }

  yield { text: '', delay: 50 };

  // MOTD
  for (const line of MOTD) {
    yield { text: line, delay: 20 };
  }
}

export async function runBoot(term) {
  let interrupted = false;
  let linesYielded = 0;
  const preMotdCount = BOOT_MESSAGES.length + LOGO.length + 1; // +1 for empty line after logo

  const handler = term.onData(() => {
    interrupted = true;
  });

  try {
    for await (const { text, delay } of bootSequence()) {
      if (interrupted) {
        term.writeln('');
        // Print only remaining MOTD lines that haven't been shown
        const motdIndex = Math.max(0, linesYielded - preMotdCount);
        for (let i = motdIndex; i < MOTD.length; i++) {
          term.writeln(MOTD[i]);
        }
        break;
      }
      term.writeln(text);
      linesYielded++;

      await sleep(delay);
    }
  } finally {
    handler.dispose();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
