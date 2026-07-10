// Terminal Workbench palette
// https://github.com/Real-Fruit-Snacks/terminal-workbench-design-system
export const palette = {
  // Accent ramp
  accent:       '#63f2ab',
  accentAlt:    '#6bdcff',
  warm:         '#f0c674',

  // Semantic hues
  red:          '#ff6e7a',
  orange:       '#f7a35c',
  violet:       '#b78cff',

  // Surfaces (graphite ramp)
  bg0:          '#090c0d',
  bg1:          '#0e1214',
  bg2:          '#13191c',
  bg3:          '#182024',
  bg4:          '#202a2f',
  border:       '#2a363d',
  borderStrong: '#39484f',

  // Text
  textNormal:   '#dce4df',
  textSoft:     '#b4c3bd',
  textMuted:    '#879994',
  textFaint:    '#63736f',
  textOnAccent: '#07100d',
};

export const xtermTheme = {
  foreground:      palette.textNormal,
  background:      palette.bg0,
  cursor:          palette.accent,
  cursorAccent:    palette.bg0,
  selectionBackground: palette.accent + '33',
  selectionForeground: palette.textNormal,
  black:           palette.bg3,
  red:             palette.red,
  green:           palette.accent,
  yellow:          palette.warm,
  blue:            palette.accentAlt,
  magenta:         palette.violet,
  cyan:            palette.accentAlt,
  white:           palette.textSoft,
  brightBlack:     palette.textFaint,
  brightRed:       palette.red,
  brightGreen:     palette.accent,
  brightYellow:    palette.warm,
  brightBlue:      palette.accentAlt,
  brightMagenta:   palette.violet,
  brightCyan:      palette.accentAlt,
  brightWhite:     palette.textNormal,
};
