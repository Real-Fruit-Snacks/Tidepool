<div align="center">

  # Tidepool

  **Interactive terminal portfolio built with xterm.js.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-cba6f7.svg)](https://opensource.org/licenses/MIT)
  [![Version](https://img.shields.io/badge/version-1.0.0-89b4fa)](https://github.com/Real-Fruit-Snacks/Tidepool/releases)
  
  [Live Demo](https://Real-Fruit-Snacks.github.io/Tidepool/) • [Report Issue](https://github.com/Real-Fruit-Snacks/Tidepool/issues) • [Request Feature](https://github.com/Real-Fruit-Snacks/Tidepool/issues)

</div>

---

## Overview

Tidepool is a terminal-first portfolio rendered with xterm.js — every page in the site is a shell command. Explore a developer profile through real shell commands in the browser. It features a virtual filesystem with navigable directories, daily GitHub data via CI, Catppuccin Mocha theming with 24-bit ANSI color, tab completion, command history, a boot animation, and permalink support.

*A tidepool is the smallest pocket of ocean — small, contained, complete in itself. Felt fitting for a portfolio that is a whole tiny operating system in the browser.*

### Key Features

- **Virtual Terminal Experience:** Fully functional xterm.js implementation with 24-bit ANSI color and 1000-line scrollback.
- **Robust Shell:** Includes 14 core commands (`help`, `ls`, `cd`, `cat`, etc.) with tab completion and arrow-key history.
- **Virtual Filesystem:** Navigate directories and read files using standard Unix semantics (`~`, `-`, `..`).
- **Data Automation:** GitHub data is fetched daily via a GitHub Action and committed to `public/data/github.json`, keeping the frontend completely free of API tokens or runtime calls.
- **Deep Linking:** Bookmarkable permalinks automatically execute commands on page load (e.g., `#neofetch`).

---

## Getting Started

### Installation

```bash
git clone https://github.com/Real-Fruit-Snacks/Tidepool.git
cd Tidepool
npm install
npm run dev                      # Runs development server
```

For production builds:
```bash
npm run build
npm run preview
```

---

## Usage

Inside the running terminal, you can interact just like a standard shell:

```bash
visitor@real-fruit-snacks:~ $ help          # categorized command listing
visitor@real-fruit-snacks:~ $ neofetch      # system info with ASCII art
visitor@real-fruit-snacks:~ $ skills        # color-coded progress bars
visitor@real-fruit-snacks:~ $ repos         # GitHub repositories table
```

Use `Tab` to autocomplete commands and file paths, and the `Up`/`Down` arrow keys to browse your command history.

---

## Architecture / File Structure

```text
src/
├── main.js              # Entry point
├── shell.js             # Input handling, prompt, command execution
├── terminal.js          # xterm.js setup with addons
├── filesystem.js        # Virtual filesystem
├── content.js           # Static content (about, resume, skills)
├── formatter.js         # ANSI color, box drawing, tables
├── github.js            # GitHub data loader
├── history.js           # Command history with localStorage
├── autocomplete.js      # Tab completion
├── boot.js              # Boot animation
├── permalink.js         # URL hash read/write
├── theme.js             # Catppuccin Mocha palette
└── commands/            # Per-command implementations + registry

public/data/
└── github.json          # GitHub API data (updated daily)

.github/workflows/
├── deploy.yml           # Build and deploy to GitHub Pages
└── update-github-data.yml # Daily GitHub data fetch
```

---

## Contributing

Contributions from the community are highly encouraged. Whether it's adding new commands, improving the shell parser, or fixing bugs, your help is appreciated.

Please refer to the `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` files for full guidelines on how to submit pull requests and report issues.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Real-Fruit-Snacks - [https://github.com/Real-Fruit-Snacks](https://github.com/Real-Fruit-Snacks)

Project Link: [https://github.com/Real-Fruit-Snacks/Tidepool](https://github.com/Real-Fruit-Snacks/Tidepool)
