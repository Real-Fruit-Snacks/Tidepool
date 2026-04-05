<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-light.svg">
  <img alt="Tidepool" src="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg" width="520">
</picture>

![JavaScript](https://img.shields.io/badge/language-JavaScript-f7df1e.svg)
![Browser](https://img.shields.io/badge/platform-Browser-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Interactive terminal portfolio built with xterm.js**

Explore a developer profile through real shell commands in the browser. Virtual filesystem with navigable directories. GitHub data updated daily via CI. Catppuccin Mocha theming with 24-bit ANSI color. Tab completion, command history, boot animation, and permalink support.

[Quick Start](#quick-start) • [Commands](#command-reference) • [Features](#features) • [Architecture](#architecture) • [Deployment](#deployment) • [Security](#security)

</div>

---

## Highlights

<table>
<tr>
<td width="50%">

**Real Terminal Emulation**
Full xterm.js terminal with cursor movement, line editing, scrollback buffer, and ANSI 24-bit color rendering. Proper cursor blink, web link detection, and automatic viewport fitting.

**Virtual Filesystem**
Navigate directories, read files, and discover content through a fully simulated Unix filesystem. Supports `ls`, `cd`, `cat`, `pwd` with long format, grid layout, and `~` / `-` path shortcuts.

**Live GitHub Integration**
Repository stats, languages, and profile info fetched daily via GitHub Actions and committed to `public/data/github.json`. Hydrated into the virtual filesystem at load time.

**Tab Completion**
Context-aware completion for commands and file paths. Common prefix expansion when multiple matches exist. Cycles through candidates on repeated Tab presses.

</td>
<td width="50%">

**Boot Sequence**
Simulated BIOS and kernel boot animation with ASCII art logo. Progressive line reveal with randomized timing. Skippable with any keypress for returning visitors.

**Catppuccin Mocha Theme**
Full Catppuccin Mocha palette applied across the terminal, prompt, command output, and all UI elements. Sky and sapphire accent colors throughout.

**Command History**
Arrow key navigation through previous commands. Persistent storage via localStorage (200 entries). Line-numbered `history` command for reference.

**Permalink Support**
Share direct links to commands via URL hash. Visiting `#neofetch` auto-runs the command on page load. Bookmarkable deep links to any command output.

</td>
</tr>
</table>

---

## Quick Start

### Prerequisites

<table>
<tr>
<th>Requirement</th>
<th>Version</th>
<th>Purpose</th>
</tr>
<tr>
<td>Node.js</td>
<td>20+</td>
<td>Runtime environment</td>
</tr>
<tr>
<td>npm</td>
<td>any</td>
<td>Package manager</td>
</tr>
</table>

### Install & Run

```bash
# Clone repository
git clone https://github.com/Real-Fruit-Snacks/Tidepool.git
cd Tidepool

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The production build outputs to `dist/` with hashed asset filenames and xterm.js split into a separate chunk.

### Verification

```bash
# Type commands in the terminal
visitor@real-fruit-snacks:~ $ help          # list all commands
visitor@real-fruit-snacks:~ $ neofetch      # system info display
visitor@real-fruit-snacks:~ $ repos         # browse GitHub repositories
visitor@real-fruit-snacks:~ $ cat about.md  # read a file
```

---

## Command Reference

<table>
<tr>
<th>Command</th>
<th>Aliases</th>
<th>Category</th>
<th>Description</th>
</tr>
<tr>
<td><code>help</code></td>
<td><code>?</code></td>
<td>General</td>
<td>Show available commands</td>
</tr>
<tr>
<td><code>clear</code></td>
<td><code>cls</code></td>
<td>General</td>
<td>Clear the terminal</td>
</tr>
<tr>
<td><code>history</code></td>
<td>&mdash;</td>
<td>General</td>
<td>Show command history</td>
</tr>
<tr>
<td><code>pwd</code></td>
<td>&mdash;</td>
<td>Navigation</td>
<td>Print working directory</td>
</tr>
<tr>
<td><code>cd</code></td>
<td>&mdash;</td>
<td>Navigation</td>
<td>Change directory</td>
</tr>
<tr>
<td><code>ls</code></td>
<td><code>dir</code>, <code>ll</code></td>
<td>Navigation</td>
<td>List directory contents</td>
</tr>
<tr>
<td><code>cat</code></td>
<td><code>less</code>, <code>more</code></td>
<td>Navigation</td>
<td>Display file contents</td>
</tr>
<tr>
<td><code>whoami</code></td>
<td>&mdash;</td>
<td>Info</td>
<td>Display current user</td>
</tr>
<tr>
<td><code>about</code></td>
<td>&mdash;</td>
<td>Info</td>
<td>About me</td>
</tr>
<tr>
<td><code>contact</code></td>
<td><code>email</code>, <code>socials</code></td>
<td>Info</td>
<td>Contact information</td>
</tr>
<tr>
<td><code>resume</code></td>
<td><code>cv</code></td>
<td>Info</td>
<td>View my resume</td>
</tr>
<tr>
<td><code>skills</code></td>
<td><code>tech</code>, <code>stack</code></td>
<td>Info</td>
<td>Technical skills with progress bars</td>
</tr>
<tr>
<td><code>repos</code></td>
<td><code>projects</code></td>
<td>GitHub</td>
<td>GitHub repositories table</td>
</tr>
<tr>
<td><code>neofetch</code></td>
<td><code>fetch</code></td>
<td>Info</td>
<td>System info display with ASCII art</td>
</tr>
</table>

### Keyboard Shortcuts

<table>
<tr>
<th>Shortcut</th>
<th>Action</th>
</tr>
<tr>
<td><code>Tab</code></td>
<td>Autocomplete commands and file paths</td>
</tr>
<tr>
<td><code>Up / Down</code></td>
<td>Browse command history</td>
</tr>
<tr>
<td><code>Home / End</code></td>
<td>Jump to start / end of line</td>
</tr>
<tr>
<td><code>Ctrl+C</code></td>
<td>Cancel current input</td>
</tr>
<tr>
<td><code>Ctrl+L</code></td>
<td>Clear screen</td>
</tr>
<tr>
<td><code>Ctrl+U</code></td>
<td>Clear line</td>
</tr>
</table>

---

## Features

### Terminal Emulation

<table>
<tr>
<th>Feature</th>
<th>Implementation</th>
<th>Details</th>
</tr>
<tr>
<td>Terminal Engine</td>
<td>xterm.js 5.5</td>
<td>Full VT100/VT220 emulation with 24-bit color</td>
</tr>
<tr>
<td>Viewport Fitting</td>
<td>@xterm/addon-fit</td>
<td>Auto-resize on window change via ResizeObserver</td>
</tr>
<tr>
<td>Web Links</td>
<td>@xterm/addon-web-links</td>
<td>Clickable URLs detected in terminal output</td>
</tr>
<tr>
<td>Cursor</td>
<td>Block with blink</td>
<td>Configurable style with smooth animation</td>
</tr>
<tr>
<td>Scrollback</td>
<td>1000 lines</td>
<td>Scroll through command history output</td>
</tr>
</table>

### Virtual Filesystem

```
~/
├── about.md              Developer biography and background
├── contact.md            Email, social links, and profiles
├── resume.md             Full resume with experience and education
├── skills.md             Technical skills and proficiency levels
│
└── projects/
    ├── README.md          Project overview and highlights
    └── [repo].md          Per-repository details (hydrated from GitHub)
```

**Supported operations:** `ls` (grid and long format), `cd` (with `~`, `-`, `..`), `cat` (file display), `pwd` (working directory).

### GitHub Data Pipeline

<table>
<tr>
<th>Stage</th>
<th>Mechanism</th>
<th>Output</th>
</tr>
<tr>
<td>Fetch</td>
<td>GitHub Actions + <code>gh</code> CLI</td>
<td>Raw API response</td>
</tr>
<tr>
<td>Transform</td>
<td>CI workflow script</td>
<td><code>public/data/github.json</code></td>
</tr>
<tr>
<td>Load</td>
<td><code>fetch()</code> at page load</td>
<td>In-memory data object</td>
</tr>
<tr>
<td>Hydrate</td>
<td>VirtualFS injection</td>
<td>Navigable repo files</td>
</tr>
</table>

### Output Formatting

```bash
# Neofetch — system info with ASCII art and color blocks
visitor@real-fruit-snacks:~ $ neofetch

# Skills — color-coded progress bars per language
visitor@real-fruit-snacks:~ $ skills

# Repos — sortable table with stars, language, description
visitor@real-fruit-snacks:~ $ repos

# Help — categorized command listing in a styled box
visitor@real-fruit-snacks:~ $ help
```

**Formatting engine:** Unicode box-drawing characters, ANSI 24-bit color via Catppuccin Mocha palette, progress bar rendering, and responsive table layout.

---

## Architecture

```
Tidepool/
├── package.json                      # Dependencies and scripts
├── vite.config.js                    # Build config with relative base path and manual chunks
├── index.html                        # Entry HTML with meta tags and font loading
│
├── src/
│   ├── main.js                       # Entry point — wires terminal, filesystem, commands, shell
│   ├── shell.js                      # Input handling, prompt rendering, command execution
│   ├── terminal.js                   # xterm.js setup with fit addon and web links
│   ├── filesystem.js                 # Virtual filesystem with directories, files, path resolution
│   ├── content.js                    # Static content: about, resume, skills, contact
│   ├── formatter.js                  # ANSI color, box drawing, tables, progress bars
│   ├── github.js                     # GitHub data loader and filesystem hydration
│   ├── history.js                    # Command history with localStorage persistence
│   ├── autocomplete.js              # Tab completion for commands and file paths
│   ├── boot.js                       # Boot sequence animation with interrupt support
│   ├── permalink.js                  # URL hash permalink read/write
│   ├── theme.js                      # Catppuccin Mocha color palette
│   ├── styles.css                    # Base styles and mobile layout
│   │
│   └── commands/                     # ── Command Implementations ──
│       ├── registry.js               # Command registry with Levenshtein fuzzy suggestions
│       ├── help.js                   # Categorized command listing in a box
│       ├── ls.js                     # Directory listing with grid and long format
│       ├── cat.js                    # File content display
│       ├── cd.js                     # Directory navigation with ~ and - support
│       ├── pwd.js                    # Working directory display
│       ├── clear.js                  # Terminal clear
│       ├── history.js               # History listing with line numbers
│       ├── whoami.js                 # User identity display
│       ├── about.js                  # About page from virtual filesystem
│       ├── contact.js               # Contact info in a styled box
│       ├── resume.js                 # Resume display from virtual filesystem
│       ├── skills.js                 # Skill bars with per-language colors
│       ├── repos.js                  # GitHub repos table sorted by stars
│       └── neofetch.js              # System info with ASCII art and color blocks
│
├── public/
│   └── data/
│       └── github.json               # GitHub API data (updated daily by CI)
│
├── docs/                             # ── GitHub Pages ──
│   ├── index.html                    # Project website
│   └── assets/
│       ├── logo-dark.svg             # Logo for dark theme
│       └── logo-light.svg            # Logo for light theme
│
└── .github/
    └── workflows/
        ├── deploy.yml                # Build and deploy to GitHub Pages
        └── update-github-data.yml    # Fetch GitHub profile and repo data daily
```

### Execution Flow

### Stage 1: Initialization
1. **Load entry HTML** — `index.html` loads fonts, styles, and the ES module entry point
2. **Initialize xterm.js** — Create terminal instance with fit addon and web links
3. **Load GitHub data** — Fetch `github.json` and hydrate the virtual filesystem
4. **Run boot sequence** — Animated BIOS/kernel boot with ASCII logo (skippable)

### Stage 2: Shell Ready
```
                    User Input
                        │
            Shell.handleInput()
                        │
         ┌──────┬───────┼──────┬──────────┐
         │      │       │      │          │
       Tab   Arrow   Ctrl+C  Enter    Ctrl+L
         │      │       │      │          │
     Complete History Cancel  Parse     Clear
         │      │              │
         └──────┘       CommandRegistry
                              │
                    ┌────┬────┼────┬────┐
                    │    │    │    │    │
                   ls   cd  cat  repos ...
                    │    │    │    │    │
                    └────┴────┼────┴────┘
                              │
                     Formatter Engine
                   (ANSI color, boxes,
                    tables, progress)
                              │
                     Terminal Output
```

### Stage 3: Rendering
- All commands produce ANSI-colored output via the formatter engine
- Box drawing uses Unicode characters for clean borders
- Progress bars render with per-language Catppuccin colors
- Tables auto-size columns based on terminal width
- Output written directly to xterm.js buffer

---

## Tech Stack

<table>
<tr>
<th>Layer</th>
<th>Technology</th>
<th>Purpose</th>
</tr>
<tr>
<td>Terminal</td>
<td>xterm.js 5.5</td>
<td>VT100/VT220 emulation with 24-bit ANSI color</td>
</tr>
<tr>
<td>Addons</td>
<td>@xterm/addon-fit, @xterm/addon-web-links</td>
<td>Viewport fitting and clickable URLs</td>
</tr>
<tr>
<td>Build</td>
<td>Vite 6</td>
<td>ES2020 target with manual chunk splitting</td>
</tr>
<tr>
<td>Language</td>
<td>JavaScript (ES modules)</td>
<td>Zero compilation step, native browser modules</td>
</tr>
<tr>
<td>Theming</td>
<td>Catppuccin Mocha</td>
<td>24-bit ANSI color palette across all output</td>
</tr>
<tr>
<td>Deployment</td>
<td>GitHub Pages via GitHub Actions</td>
<td>Automatic build and deploy on push to main</td>
</tr>
<tr>
<td>Data</td>
<td>GitHub REST API via <code>gh</code> CLI in CI</td>
<td>Daily repo stats, languages, and profile info</td>
</tr>
<tr>
<td>Persistence</td>
<td>localStorage</td>
<td>Command history (200 entries)</td>
</tr>
</table>

---

## Platform Support

<table>
<tr>
<th>Capability</th>
<th>Chrome</th>
<th>Firefox</th>
<th>Safari</th>
<th>Mobile</th>
</tr>
<tr>
<td>Terminal Rendering</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>24-bit ANSI Color</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Tab Completion</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>N/A</td>
</tr>
<tr>
<td>Command History</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Web Links</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Viewport Fitting</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Boot Animation</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Permalink</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
<td>Full</td>
</tr>
<tr>
<td>Keyboard Toggle</td>
<td>N/A</td>
<td>N/A</td>
<td>N/A</td>
<td>Touch button</td>
</tr>
<tr>
<td>localStorage</td>
<td>Full</td>
<td>Full</td>
<td>Full (non-private)</td>
<td>Full (non-private)</td>
</tr>
</table>

---

## Security

### Supply Chain

All GitHub Actions workflows are pinned to commit SHAs. No third-party actions use mutable tags. Dependencies are locked via `package-lock.json`.

### Data Handling

- GitHub data is fetched server-side in CI, not from the client browser
- No API tokens are exposed to the frontend
- No user input is sent to any server — everything runs client-side
- localStorage stores only command history strings

### Content Security

- No inline scripts — all JavaScript loaded via ES modules
- No external API calls from the browser (data is pre-fetched in CI)
- No cookies, tracking, or analytics
- No authentication or user accounts

### Vulnerability Reporting

**Report security issues via:**
- GitHub Security Advisories (preferred)
- Private disclosure to maintainers
- Responsible disclosure timeline (90 days)

**Do NOT:**
- Open public GitHub issues for vulnerabilities
- Disclose before coordination with maintainers

---

## License

MIT License

Copyright &copy; 2026 Real-Fruit-Snacks

```
THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
THE AUTHORS ARE NOT LIABLE FOR ANY DAMAGES ARISING FROM USE.
USE AT YOUR OWN RISK.
```

---

## Resources

- **GitHub**: [github.com/Real-Fruit-Snacks/Tidepool](https://github.com/Real-Fruit-Snacks/Tidepool)
- **Live Demo**: [real-fruit-snacks.github.io/Tidepool](https://real-fruit-snacks.github.io/Tidepool)
- **Issues**: [Report a Bug](https://github.com/Real-Fruit-Snacks/Tidepool/issues)
- **Security**: [SECURITY.md](SECURITY.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Changelog**: [CHANGELOG.md](CHANGELOG.md)

---

<div align="center">

**Part of the Real-Fruit-Snacks toolkit**

[Aquifer](https://github.com/Real-Fruit-Snacks/Aquifer) • [armsforge](https://github.com/Real-Fruit-Snacks/armsforge) • [Cascade](https://github.com/Real-Fruit-Snacks/Cascade) • [Conduit](https://github.com/Real-Fruit-Snacks/Conduit) • [Deadwater](https://github.com/Real-Fruit-Snacks/Deadwater) • [Deluge](https://github.com/Real-Fruit-Snacks/Deluge) • [Depth](https://github.com/Real-Fruit-Snacks/Depth) • [Dew](https://github.com/Real-Fruit-Snacks/Dew) • [Droplet](https://github.com/Real-Fruit-Snacks/Droplet) • [Fathom](https://github.com/Real-Fruit-Snacks/Fathom) • [Flux](https://github.com/Real-Fruit-Snacks/Flux) • [Grotto](https://github.com/Real-Fruit-Snacks/Grotto) • [HydroShot](https://github.com/Real-Fruit-Snacks/HydroShot) • [LigoloSupport](https://github.com/Real-Fruit-Snacks/LigoloSupport) • [Maelstrom](https://github.com/Real-Fruit-Snacks/Maelstrom) • [Rapids](https://github.com/Real-Fruit-Snacks/Rapids) • [Ripple](https://github.com/Real-Fruit-Snacks/Ripple) • [Riptide](https://github.com/Real-Fruit-Snacks/Riptide) • [Runoff](https://github.com/Real-Fruit-Snacks/Runoff) • [Seep](https://github.com/Real-Fruit-Snacks/Seep) • [Shallows](https://github.com/Real-Fruit-Snacks/Shallows) • [Siphon](https://github.com/Real-Fruit-Snacks/Siphon) • [Slipstream](https://github.com/Real-Fruit-Snacks/Slipstream) • [Spillway](https://github.com/Real-Fruit-Snacks/Spillway) • [Sunken-Archive](https://github.com/Real-Fruit-Snacks/Sunken-Archive) • [Surge](https://github.com/Real-Fruit-Snacks/Surge) • [Tidemark](https://github.com/Real-Fruit-Snacks/Tidemark) • **Tidepool** • [Undercurrent](https://github.com/Real-Fruit-Snacks/Undercurrent) • [Undertow](https://github.com/Real-Fruit-Snacks/Undertow) • [Vapor](https://github.com/Real-Fruit-Snacks/Vapor) • [Wellspring](https://github.com/Real-Fruit-Snacks/Wellspring) • [Whirlpool](https://github.com/Real-Fruit-Snacks/Whirlpool)

*Type `help` to begin.*

</div>
