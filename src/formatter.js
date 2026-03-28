import { palette } from './theme.js';

// Convert hex #rrggbb to ANSI 24-bit escape
function hexToRgb(hex) {
  if (!hex || hex[0] !== '#') return [0, 0, 0];
  const n = parseInt(hex.slice(1), 16);
  if (isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

export function fg(hex, text) {
  const [r, g, b] = hexToRgb(hex);
  return `\x1b[38;2;${r};${g};${b}m${text}\x1b[39m`;
}

export function bg(hex, text) {
  const [r, g, b] = hexToRgb(hex);
  return `\x1b[48;2;${r};${g};${b}m${text}\x1b[49m`;
}

export function bold(text) {
  return `\x1b[1m${text}\x1b[22m`;
}

export function dim(text) {
  return `\x1b[2m${text}\x1b[22m`;
}

export function italic(text) {
  return `\x1b[3m${text}\x1b[23m`;
}

export function underline(text) {
  return `\x1b[4m${text}\x1b[24m`;
}

// Strip ANSI escape sequences to get visible length
export function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

export function visibleLength(str) {
  return stripAnsi(str).length;
}

// Pad string to width accounting for ANSI codes
export function padEnd(str, width) {
  const vl = visibleLength(str);
  return vl >= width ? str : str + ' '.repeat(width - vl);
}

// Draw a box around lines of text
export function box(lines, { title = '', padding = 1, borderColor = palette.surface2 } = {}) {
  const contentLines = Array.isArray(lines) ? lines : lines.split('\n');
  const maxWidth = Math.max(
    ...contentLines.map(l => visibleLength(l)),
    title ? visibleLength(title) + 2 : 0
  );
  const innerWidth = maxWidth + padding * 2;
  const border = (ch) => fg(borderColor, ch);

  const result = [];
  // Top border
  if (title) {
    const titleStr = ` ${title} `;
    const remaining = Math.max(0, innerWidth - visibleLength(titleStr));
    result.push(border('╭') + border('─') + fg(palette.mauve, bold(title)) + border(' ') + border('─'.repeat(remaining)) + border('╮'));
  } else {
    result.push(border('╭' + '─'.repeat(innerWidth) + '╮'));
  }
  // Content
  const pad = ' '.repeat(padding);
  for (const line of contentLines) {
    const padded = pad + padEnd(line, maxWidth) + pad;
    result.push(border('│') + padded + border('│'));
  }
  // Bottom border
  result.push(border('╰' + '─'.repeat(innerWidth) + '╯'));
  return result;
}

// Key-value display (pad raw key, then wrap in ANSI)
export function keyValue(pairs, { keyColor = palette.blue, separator = ' : ' } = {}) {
  const maxKey = Math.max(...pairs.map(([k]) => k.length));
  return pairs.map(([k, v]) =>
    `  ${fg(keyColor, bold(k.padEnd(maxKey)))}${dim(separator)}${v}`
  );
}


// Progress bar
export function progressBar(value, max = 100, width = 20, { filled = palette.green, empty = palette.surface1 } = {}) {
  const ratio = Math.min(value / max, 1);
  const filledCount = Math.round(ratio * width);
  const emptyCount = width - filledCount;
  return fg(filled, '█'.repeat(filledCount)) + fg(empty, '░'.repeat(emptyCount));
}

// Table with headers
export function table(headers, rows, { headerColor = palette.mauve, borderColor = palette.surface2 } = {}) {
  const colWidths = headers.map((h, i) => {
    const dataWidths = rows.map(r => visibleLength(String(r[i] || '')));
    return Math.max(visibleLength(h), ...dataWidths);
  });

  const border = (ch) => fg(borderColor, ch);
  const sepLine = border('├') + colWidths.map(w => '─'.repeat(w + 2)).join(border('┼')) + border('┤');
  const topLine = border('┌') + colWidths.map(w => '─'.repeat(w + 2)).join(border('┬')) + border('┐');
  const botLine = border('└') + colWidths.map(w => '─'.repeat(w + 2)).join(border('┴')) + border('┘');

  const formatRow = (cells, color) =>
    border('│') + cells.map((c, i) => ' ' + padEnd(color ? fg(color, bold(String(c))) : String(c), colWidths[i]) + ' ').join(border('│')) + border('│');

  const result = [topLine, formatRow(headers, headerColor), sepLine];
  for (const row of rows) {
    result.push(formatRow(row, null));
  }
  result.push(botLine);
  return result;
}
