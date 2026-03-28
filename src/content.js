import { palette } from './theme.js';
import { fg, bold, dim, italic } from './formatter.js';

export const about = `
${fg(palette.mauve, bold('Real-Fruit-Snacks'))}
${dim('─'.repeat(40))}

Hey! I'm a developer who loves building things that live
in the terminal. I'm passionate about open source,
clean code, and the Unix philosophy.

When I'm not coding, you can find me exploring new
technologies, contributing to open source projects,
and learning something new every day.

${dim('Feel free to explore — type')} ${fg(palette.green, 'help')} ${dim('to see available commands.')}
`;

export const contact = [
  ['GitHub',   fg(palette.blue, 'https://github.com/Real-Fruit-Snacks')],
  ['Email',    fg(palette.peach, 'Check GitHub profile')],
];

export const skills = [
  { category: 'Languages', items: [
    { name: 'JavaScript',  level: 90, color: palette.yellow },
    { name: 'TypeScript',  level: 85, color: palette.blue },
    { name: 'Python',      level: 80, color: palette.green },
    { name: 'Rust',        level: 60, color: palette.peach },
    { name: 'Bash',        level: 75, color: palette.teal },
  ]},
  { category: 'Frameworks & Tools', items: [
    { name: 'Node.js',    level: 88, color: palette.green },
    { name: 'React',      level: 82, color: palette.sky },
    { name: 'Git',        level: 90, color: palette.red },
    { name: 'Linux',      level: 85, color: palette.yellow },
    { name: 'Docker',     level: 70, color: palette.sapphire },
  ]},
];

export const resume = `
${fg(palette.mauve, bold('EXPERIENCE'))}
${dim('─'.repeat(40))}

${fg(palette.blue, bold('Open Source Developer'))}
${dim('GitHub • Ongoing')}
  Building tools, contributing to projects, and learning
  by shipping real code.

${fg(palette.mauve, bold('EDUCATION'))}
${dim('─'.repeat(40))}

${fg(palette.blue, bold('Self-Taught Developer'))}
${dim('The Internet • Always learning')}
  Continuous learning through documentation, open source
  contributions, and building real-world projects.

${fg(palette.mauve, bold('INTERESTS'))}
${dim('─'.repeat(40))}

  ${fg(palette.green, '•')} Terminal-based applications
  ${fg(palette.green, '•')} Developer tooling
  ${fg(palette.green, '•')} Systems programming
  ${fg(palette.green, '•')} Open source collaboration
`;

// Build the initial filesystem
export function populateFilesystem(fs) {
  fs.addFile('/about.md', about);
  fs.addFile('/resume.md', resume);
  fs.addFile('/contact.md', contact.map(([k, v]) => `${k}: ${v}`).join('\n'));
  fs.addDir('/projects');
  fs.addFile('/.hidden', dim('You found a hidden file! Nice exploration skills.'));
}
