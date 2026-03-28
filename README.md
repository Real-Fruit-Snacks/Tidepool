# Terminal Portfolio

An interactive terminal-based portfolio website built with [xterm.js](https://xtermjs.org/) and [Vite](https://vitejs.dev/). Visitors explore your developer profile by typing shell commands like `ls`, `cat`, `neofetch`, and more.

## Features

- Realistic terminal emulation with xterm.js
- Virtual filesystem with navigable directories
- Commands: `help`, `ls`, `cd`, `cat`, `pwd`, `whoami`, `about`, `contact`, `resume`, `skills`, `repos`, `neofetch`, `history`, `clear`
- Tab completion for commands and file paths
- Command history with arrow keys (persisted in localStorage)
- GitHub data fetched daily via CI and displayed in `repos` and `neofetch`
- Catppuccin Mocha color theme
- Mobile keyboard support
- Permalink support via URL hash (e.g., `#neofetch`)
- Boot sequence animation (skippable)

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
npm run preview
```

The production build outputs to `dist/`.

## Deployment

The site deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

GitHub profile data updates daily via `.github/workflows/update-github-data.yml` and triggers a redeploy.

## Project Structure

```
src/
  main.js          # Entry point, wires everything together
  shell.js         # Input handling, prompt, command execution
  terminal.js      # xterm.js setup and configuration
  filesystem.js    # Virtual filesystem (VirtualFS)
  content.js       # Static content (about, resume, skills, contact)
  formatter.js     # ANSI color/formatting utilities
  github.js        # GitHub data loader
  history.js       # Command history with localStorage persistence
  autocomplete.js  # Tab completion engine
  boot.js          # Boot sequence animation
  permalink.js     # URL hash permalink support
  theme.js         # Catppuccin Mocha color palette
  styles.css       # Base styles
  commands/        # Individual command implementations
    registry.js    # Command registry with fuzzy suggestions
    help.js, ls.js, cat.js, cd.js, pwd.js, clear.js,
    whoami.js, about.js, contact.js, resume.js,
    skills.js, repos.js, neofetch.js, history.js
public/
  data/github.json # GitHub API data (updated by CI)
```

## License

MIT
