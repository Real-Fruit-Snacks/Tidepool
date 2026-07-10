# Changelog
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
## [Unreleased]
### Changed
- Repo presentation redesigned with the [Terminal Workbench design system](https://github.com/Real-Fruit-Snacks/terminal-workbench-design-system): new README, cover art banner, light/dark logo lockups, square icon set, and a rebuilt docs landing page with mandatory dark + light modes
- Terminal re-themed from Catppuccin Mocha to the Terminal Workbench palette (prompt, ANSI colors, boot animation, selection, cursor)
- Color balance reworked: violet reserved for semantic use; section headers use muted uppercase, hostnames and table headers use cyan, logos and titles use the green accent
### Fixed
- Box borders, tables, and progress bars misaligning: the webfont subset lacks box-drawing and block glyphs, so the terminal now uses the xterm canvas renderer, which draws those glyphs itself
- Docs landing page now deploys with the site at `/docs/`
## [1.0.0] - 2026-04-04
### Added
- Interactive terminal portfolio with xterm.js
- Shell command simulation
- Catppuccin Mocha theme
