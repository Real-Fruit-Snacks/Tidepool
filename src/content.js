import { palette } from './theme.js';
import { fg, bold, dim } from './formatter.js';

export const about = `
${fg(palette.violet, bold('Real-Fruit-Snacks'))}
${dim('─'.repeat(40))}

Hey! I'm a developer who loves building things that live
in the terminal. I'm passionate about open source,
clean code, and the Unix philosophy.

When I'm not coding, you can find me exploring new
technologies, contributing to open source projects,
and learning something new every day.

${dim('Feel free to explore — type')} ${fg(palette.accent, 'help')} ${dim('to see available commands.')}
`;

export const contact = [
  ['GitHub',   fg(palette.accentAlt, 'https://github.com/Real-Fruit-Snacks')],
  ['Email',    fg(palette.orange, 'Check GitHub profile')],
];

export const skills = [
  { category: 'Languages', items: [
    { name: 'JavaScript',  level: 90, color: palette.warm },
    { name: 'Python',      level: 85, color: palette.accent },
    { name: 'Go',          level: 75, color: palette.accentAlt },
    { name: 'TypeScript',  level: 70, color: palette.accentAlt },
    { name: 'Rust',        level: 65, color: palette.orange },
    { name: 'C',           level: 60, color: palette.textNormal },
    { name: 'Assembly',    level: 55, color: palette.red },
    { name: 'Bash',        level: 75, color: palette.accentAlt },
  ]},
  { category: 'Frameworks & Tools', items: [
    { name: 'Node.js',    level: 88, color: palette.accent },
    { name: 'Git',        level: 90, color: palette.red },
    { name: 'Linux',      level: 85, color: palette.warm },
    { name: 'Docker',     level: 70, color: palette.accentAlt },
    { name: 'Vite',       level: 75, color: palette.violet },
  ]},
];

export const resume = `
${fg(palette.violet, bold('EXPERIENCE'))}
${dim('─'.repeat(40))}

${fg(palette.accentAlt, bold('Open Source Developer'))}
${dim('GitHub • Ongoing')}
  Building tools, contributing to projects, and learning
  by shipping real code.

${fg(palette.violet, bold('EDUCATION'))}
${dim('─'.repeat(40))}

${fg(palette.accentAlt, bold('Self-Taught Developer'))}
${dim('The Internet • Always learning')}
  Continuous learning through documentation, open source
  contributions, and building real-world projects.

${fg(palette.violet, bold('INTERESTS'))}
${dim('─'.repeat(40))}

  ${fg(palette.accent, '•')} Terminal-based applications
  ${fg(palette.accent, '•')} Developer tooling
  ${fg(palette.accent, '•')} Systems programming
  ${fg(palette.accent, '•')} Open source collaboration
`;

// Build the initial filesystem
export function populateFilesystem(fs) {
  fs.addFile('/about.md', about);
  fs.addFile('/resume.md', resume);
  fs.addFile('/contact.md', contact.map(([k, v]) => `${k}: ${v}`).join('\n'));
  fs.addDir('/projects');
  fs.addFile('/.hidden', dim('You found a hidden file! Nice exploration skills.'));
}
