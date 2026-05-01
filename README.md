<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-light.svg">
  <img alt="Tidepool" src="https://raw.githubusercontent.com/Real-Fruit-Snacks/Tidepool/main/docs/assets/logo-dark.svg" width="100%">
</picture>

> [!IMPORTANT]
> **Interactive terminal portfolio built with xterm.js.** Explore a developer profile through real shell commands in the browser. Virtual filesystem with navigable directories, daily GitHub data via CI, Catppuccin Mocha theming with 24-bit ANSI color, tab completion, command history, boot animation, and permalink support.

> *A tidepool is the smallest pocket of ocean — small, contained, complete in itself. Felt fitting for a portfolio that is a whole tiny operating system in the browser.*

---

## §1 / Premise

Tidepool is a **terminal-first portfolio** rendered with [xterm.js](https://xtermjs.org/) — every page in the site is a shell command. Run `help` for the catalog, `cat about.md` for the bio, `repos` for a live table of GitHub repositories. A virtual Unix filesystem lets you `cd projects && ls -l`. Tab completion, command history, ANSI 24-bit color, and a boot animation make it feel like a real shell.

GitHub data is fetched by a daily Action and committed to `public/data/github.json` — no API tokens reach the frontend, no runtime API calls.

▶ **[Live demo](https://Real-Fruit-Snacks.github.io/Tidepool/)**

---

## §2 / Specs

| KEY        | VALUE                                                                       |
|------------|-----------------------------------------------------------------------------|
| TERMINAL   | **xterm.js** · VT100/VT220 · 24-bit ANSI · 1000-line scrollback             |
| ADDONS     | `@xterm/addon-fit` · `@xterm/addon-web-links`                               |
| COMMANDS   | **14 core** · `help` · `ls` · `cd` · `cat` · `pwd` · `whoami` · `history` · `clear` · `about` · `contact` · `resume` · `skills` · `repos` · `neofetch` |
| FILESYSTEM | Virtual Unix-like · grid + long `ls` · `~`, `-`, `..` semantics             |
| DATA       | GitHub API via daily `gh` CLI Action · committed to `public/data/github.json` |
| THEME      | **Catppuccin Mocha** · sky + sapphire accents · Unicode box-drawing         |
| HISTORY    | localStorage-persisted · 200 entries · arrow-key recall                     |
| STACK      | **Vanilla JS** · Vite · zero runtime deps beyond xterm.js · MIT             |

Architecture in §5 below.

---

## §3 / Quickstart

```bash
git clone https://github.com/Real-Fruit-Snacks/Tidepool.git
cd Tidepool
npm install
npm run dev                      # → http://localhost:5173
```

```bash
# Production build (hashed assets, xterm.js split into its own chunk)
npm run build
npm run preview
```

Inside the running terminal:

```bash
visitor@real-fruit-snacks:~ $ help          # categorized command listing
visitor@real-fruit-snacks:~ $ neofetch      # system info with ASCII art
visitor@real-fruit-snacks:~ $ skills        # color-coded progress bars
visitor@real-fruit-snacks:~ $ repos         # GitHub repositories table
```

---

## §4 / Reference

```
COMMANDS                 ALIASES                DESCRIPTION

  help                   ?                      Categorized command listing
  clear                  cls                    Clear the terminal
  history                                       Show numbered command history
  pwd                                           Print working directory
  cd                                            Change directory (~ - ..)
  ls                     dir, ll                List directory (grid + long)
  cat                    less, more             Display file contents
  whoami                                        Display current user
  about                                         About me
  contact                email, socials         Email and social links
  resume                 cv                     View resume
  skills                 tech, stack            Technical skills with bars
  repos                  projects               GitHub repositories table
  neofetch               fetch                  System info with ASCII art

KEYBOARD SHORTCUTS

  Tab                    Autocomplete commands and file paths
  Up / Down              Browse command history
  Home / End             Jump to start / end of line
  Ctrl+C                 Cancel current input
  Ctrl+L                 Clear screen
  Ctrl+U                 Clear line

VIRTUAL FILESYSTEM

  ~/about.md             Developer biography
  ~/contact.md           Email and social links
  ~/resume.md            Full resume
  ~/skills.md            Technical skills
  ~/projects/README.md   Project overview
  ~/projects/<repo>.md   Per-repository details (from GitHub)

PERMALINK

  #neofetch              Auto-runs `neofetch` on page load
  #repos                 Auto-runs `repos` on page load
  Bookmarkable deep links to any command output
```

---

## §5 / Architecture

```
src/
  main.js              Entry point
  shell.js             Input handling, prompt, command execution
  terminal.js          xterm.js setup with addons
  filesystem.js        Virtual filesystem
  content.js           Static content (about, resume, skills)
  formatter.js         ANSI color, box drawing, tables
  github.js            GitHub data loader
  history.js           Command history with localStorage
  autocomplete.js      Tab completion
  boot.js              Boot animation
  permalink.js         URL hash read/write
  theme.js             Catppuccin Mocha palette
  commands/            Per-command implementations + registry

public/data/
  github.json          GitHub API data (updated daily)

.github/workflows/
  deploy.yml           Build and deploy to GitHub Pages
  update-github-data.yml   Daily GitHub data fetch
```

| Layer        | Implementation                                                  |
|--------------|-----------------------------------------------------------------|
| **Terminal** | xterm.js · `addon-fit` for viewport · `addon-web-links`         |
| **Shell**    | Hand-rolled · prompt rendering · context-aware tab completion   |
| **FS**       | Virtual filesystem object · `cd`/`ls`/`cat`/`pwd` semantics     |
| **Data**     | GitHub Actions runs `gh` CLI daily · commits to `public/data/github.json` · no runtime API calls |
| **Render**   | ANSI 24-bit color · Unicode box-drawing · responsive table layout |
| **Persist**  | localStorage · 200-entry command history · per-visitor state    |

**Key patterns:** Boot sequence first, then the shell takes over. All output flows through the formatter for consistent ANSI styling and box-drawn tables. URL hash drives permalinks (`#neofetch` auto-runs the command on page load). No API tokens reach the frontend — daily CI does the fetch and commits the JSON.

---

[License: MIT](LICENSE) · Part of [Real-Fruit-Snacks](https://github.com/Real-Fruit-Snacks) — building offensive security tools, one wave at a time.
