<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-light.svg">
  <img alt="Tidepool" src="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg" width="420">
</picture>

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![xterm.js](https://img.shields.io/badge/xterm.js-000000?style=flat)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Interactive terminal portfolio built with xterm.js**

Explore a developer profile through real shell commands in the browser. Virtual filesystem with navigable directories, daily GitHub data via CI, Catppuccin Mocha theming with 24-bit ANSI color, tab completion, command history, boot animation, and permalink support.

[Quick Start](#quick-start) · [Features](#features) · [Architecture](#architecture) · [Platform Support](#platform-support)

</div>

---

## Quick Start

```bash
git clone https://github.com/Real-Fruit-Snacks/Tidepool.git
cd Tidepool
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Production build
npm run build
npm run preview
```

The production build outputs to `dist/` with hashed asset filenames and xterm.js split into a separate chunk.

### Verify it works

```bash
visitor@real-fruit-snacks:~ $ help          # list all commands
visitor@real-fruit-snacks:~ $ neofetch      # system info with ASCII art
visitor@real-fruit-snacks:~ $ repos         # browse GitHub repositories
visitor@real-fruit-snacks:~ $ cat about.md  # read a file
```

---

## Features

### Terminal Emulation

Full xterm.js terminal with VT100/VT220 emulation, 24-bit ANSI color, cursor blink, scrollback buffer (1000 lines), and automatic viewport fitting via `@xterm/addon-fit`. Clickable URLs detected by `@xterm/addon-web-links`.

```bash
visitor@real-fruit-snacks:~ $ help          # categorized command listing
visitor@real-fruit-snacks:~ $ neofetch      # system info with ASCII art
visitor@real-fruit-snacks:~ $ skills        # color-coded progress bars
visitor@real-fruit-snacks:~ $ repos         # GitHub repositories table
```

### Virtual Filesystem

Navigate directories, read files, and discover content through a simulated Unix filesystem.

```
~/
├── about.md          Developer biography
├── contact.md        Email and social links
├── resume.md         Full resume
├── skills.md         Technical skills
└── projects/
    ├── README.md     Project overview
    └── [repo].md     Per-repository details (from GitHub)
```

Supports `ls` (grid and long format), `cd` (with `~`, `-`, `..`), `cat`, and `pwd`.

### GitHub Data Pipeline

Repository stats, languages, and profile info fetched daily via GitHub Actions using the `gh` CLI. Data is committed to `public/data/github.json` and hydrated into the virtual filesystem at load time. No API tokens are exposed to the frontend.

```bash
# Pipeline: GitHub Actions (daily) -> gh CLI -> github.json -> Virtual FS
```

### Tab Completion

Context-aware completion for commands and file paths. Common prefix expansion when multiple matches exist, with candidate cycling on repeated Tab presses.

```bash
visitor@real-fruit-snacks:~ $ re<Tab>       # completes to "repos" or "resume"
visitor@real-fruit-snacks:~ $ cat pr<Tab>    # completes to "cat projects/"
```

### Boot Sequence

Simulated BIOS and kernel boot animation with ASCII art logo. Progressive line reveal with randomized timing. Skippable with any keypress for returning visitors.

### Catppuccin Mocha Theme

Full Catppuccin Mocha palette applied across the terminal, prompt, command output, and all UI elements. Sky and sapphire accent colors throughout. Unicode box-drawing characters for clean borders, progress bar rendering, and responsive table layout.

### Command History

Arrow key navigation through previous commands with localStorage persistence (200 entries). Line-numbered `history` command for reference.

```bash
visitor@real-fruit-snacks:~ $ history       # show numbered history
```

### Permalink Support

Share direct links to commands via URL hash. Visiting `#neofetch` auto-runs the command on page load. Bookmarkable deep links to any command output.

### Command Reference

| Command | Aliases | Description |
|---|---|---|
| `help` | `?` | Show available commands |
| `clear` | `cls` | Clear the terminal |
| `history` | -- | Show command history |
| `pwd` | -- | Print working directory |
| `cd` | -- | Change directory |
| `ls` | `dir`, `ll` | List directory contents |
| `cat` | `less`, `more` | Display file contents |
| `whoami` | -- | Display current user |
| `about` | -- | About me |
| `contact` | `email`, `socials` | Contact information |
| `resume` | `cv` | View resume |
| `skills` | `tech`, `stack` | Technical skills with progress bars |
| `repos` | `projects` | GitHub repositories table |
| `neofetch` | `fetch` | System info with ASCII art |

### Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Tab` | Autocomplete commands and file paths |
| `Up / Down` | Browse command history |
| `Home / End` | Jump to start / end of line |
| `Ctrl+C` | Cancel current input |
| `Ctrl+L` | Clear screen |
| `Ctrl+U` | Clear line |

---

## Architecture

```
Tidepool/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.js               # Entry point
│   ├── shell.js               # Input handling, prompt, command execution
│   ├── terminal.js            # xterm.js setup with addons
│   ├── filesystem.js          # Virtual filesystem
│   ├── content.js             # Static content (about, resume, skills)
│   ├── formatter.js           # ANSI color, box drawing, tables
│   ├── github.js              # GitHub data loader
│   ├── history.js             # Command history with localStorage
│   ├── autocomplete.js        # Tab completion
│   ├── boot.js                # Boot animation
│   ├── permalink.js           # URL hash read/write
│   ├── theme.js               # Catppuccin Mocha palette
│   ├── styles.css             # Base styles
│   └── commands/
│       ├── registry.js        # Command registry with fuzzy suggestions
│       ├── help.js            # Categorized command listing
│       ├── ls.js              # Directory listing
│       ├── cat.js             # File display
│       ├── cd.js              # Directory navigation
│       ├── pwd.js             # Working directory
│       ├── clear.js           # Terminal clear
│       ├── history.js         # History listing
│       ├── whoami.js          # User identity
│       ├── about.js           # About page
│       ├── contact.js         # Contact info
│       ├── resume.js          # Resume display
│       ├── skills.js          # Skill bars
│       ├── repos.js           # GitHub repos table
│       └── neofetch.js        # System info with ASCII art
├── public/data/
│   └── github.json            # GitHub API data (updated daily)
├── docs/
│   ├── index.html             # Project website
│   └── assets/
│       ├── logo-dark.svg
│       └── logo-light.svg
└── .github/workflows/
    ├── deploy.yml             # Build and deploy to GitHub Pages
    └── update-github-data.yml # Daily GitHub data fetch
```

Entry point loads xterm.js, fetches GitHub data, hydrates the virtual filesystem, runs the boot animation, then hands control to the shell. All commands produce ANSI-colored output via the formatter engine with Unicode box-drawing, progress bars, and responsive tables.

---

## Platform Support

| Capability | Chrome | Firefox | Safari | Mobile |
|---|---|---|---|---|
| Terminal Rendering | Full | Full | Full | Full |
| 24-bit ANSI Color | Full | Full | Full | Full |
| Tab Completion | Full | Full | Full | N/A |
| Command History | Full | Full | Full | Full |
| Web Links | Full | Full | Full | Full |
| Viewport Fitting | Full | Full | Full | Full |
| Boot Animation | Full | Full | Full | Full |
| Permalink | Full | Full | Full | Full |
| Keyboard Toggle | N/A | N/A | N/A | Touch button |
| localStorage | Full | Full | Full (non-private) | Full (non-private) |

---

## License

[MIT](LICENSE) -- Copyright 2026 Real-Fruit-Snacks
