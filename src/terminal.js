import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { xtermTheme, palette } from './theme.js';

export function createTerminal(container) {
  const term = new Terminal({
    theme: xtermTheme,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 14,
    lineHeight: 1.2,
    cursorBlink: true,
    cursorStyle: 'block',
    scrollback: 5000,
  });

  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.loadAddon(new WebLinksAddon((_, uri) => window.open(uri, '_blank'), {
    urlRegex: /https?:\/\/[^\s"'<>]+[^\s"'<>.,;:!?\)]/,
  }));

  term.open(container);
  fitAddon.fit();

  const ro = new ResizeObserver(() => fitAddon.fit());
  ro.observe(container);

  // Handle mobile keyboard toggle
  const toggle = document.getElementById('keyboard-toggle');
  if (toggle) {
    const hiddenInput = document.createElement('input');
    hiddenInput.style.cssText = 'position:fixed;left:-9999px;opacity:0;';
    document.body.appendChild(hiddenInput);
    toggle.addEventListener('click', () => {
      hiddenInput.focus();
      setTimeout(() => term.focus(), 100);
    });
  }

  // Handle visualViewport resize on mobile
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => fitAddon.fit());
  }

  return term;
}
