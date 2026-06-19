import '@xterm/xterm/css/xterm.css';
import { createTerminal } from './terminal.js';
import { Shell } from './shell.js';
import { VirtualFS } from './filesystem.js';
import { History } from './history.js';
import { Autocomplete } from './autocomplete.js';
import { CommandRegistry } from './commands/registry.js';
import { populateFilesystem } from './content.js';
import { loadGitHubData, hydrateFilesystem } from './github.js';
import { runBoot } from './boot.js';
import { readPermalink, writePermalink, clearPermalink } from './permalink.js';
import { stripAnsi } from './formatter.js';

// Import all commands
import { register as helpCmd } from './commands/help.js';
import { register as clearCmd } from './commands/clear.js';
import { register as pwdCmd } from './commands/pwd.js';
import { register as cdCmd } from './commands/cd.js';
import { register as lsCmd } from './commands/ls.js';
import { register as catCmd } from './commands/cat.js';
import { register as historyCmd } from './commands/history.js';
import { register as whoamiCmd } from './commands/whoami.js';
import { register as aboutCmd } from './commands/about.js';
import { register as contactCmd } from './commands/contact.js';
import { register as resumeCmd } from './commands/resume.js';
import { register as skillsCmd } from './commands/skills.js';
import { register as reposCmd } from './commands/repos.js';
import { register as neofetchCmd } from './commands/neofetch.js';

async function main() {
  // Initialize terminal
  const container = document.getElementById('terminal');
  const term = createTerminal(container);

  // Initialize subsystems
  const fs = new VirtualFS();
  const history = new History();
  const autocomplete = new Autocomplete();
  const registry = new CommandRegistry();

  // Populate filesystem with static content
  populateFilesystem(fs);

  // Load GitHub data
  const githubData = await loadGitHubData();
  hydrateFilesystem(fs, githubData);

  // Build execution context shared by all commands
  const ctx = {
    term,
    fs,
    history,
    registry,
    githubData,
  };

  // Register all commands
  helpCmd(registry);
  clearCmd(registry);
  pwdCmd(registry);
  cdCmd(registry);
  lsCmd(registry);
  catCmd(registry);
  historyCmd(registry);
  whoamiCmd(registry);
  aboutCmd(registry);
  contactCmd(registry);
  resumeCmd(registry);
  skillsCmd(registry);
  reposCmd(registry);
  neofetchCmd(registry);

  // Check for permalink command
  const permalinkCmd = readPermalink();

  // Run boot sequence
  await runBoot(term);

  // Create and start shell
  const shell = new Shell(term, registry, fs, history, autocomplete, ctx);

  // Execute permalink command if present
  if (permalinkCmd) {
    clearPermalink();
    shell.writePrompt();
    term.write(stripAnsi(permalinkCmd));
    term.writeln('');
    const parts = permalinkCmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmdName = parts[0]?.toLowerCase();
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));
    const cmd = registry.get(cmdName);
    if (cmd) {
      await cmd.action(ctx, args);
      writePermalink(permalinkCmd);
    }
  }

  shell.start();
  term.focus();
}

main().catch(console.error);
