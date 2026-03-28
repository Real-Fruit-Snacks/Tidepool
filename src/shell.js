import { palette } from './theme.js';
import { fg, bold, dim } from './formatter.js';

const PROMPT_USER = fg(palette.green, bold('visitor'));
const PROMPT_AT = fg(palette.text, '@');
const PROMPT_HOST = fg(palette.mauve, bold('real-fruit-snacks'));
const PROMPT_COLON = fg(palette.text, ':');
const PROMPT_ARROW = fg(palette.green, bold(' $ '));

export class Shell {
  constructor(term, registry, fs, history, autocomplete, ctx) {
    this.term = term;
    this.registry = registry;
    this.fs = fs;
    this.history = history;
    this.autocomplete = autocomplete;
    this.ctx = ctx;
    this.inputBuffer = '';
    this.cursorPos = 0;
    this.running = false;
  }

  getPrompt() {
    const dir = this.fs.cwd === '/' ? fg(palette.blue, bold('~')) : fg(palette.blue, bold(this.fs.cwd));
    return `${PROMPT_USER}${PROMPT_AT}${PROMPT_HOST}${PROMPT_COLON}${dir}${PROMPT_ARROW}`;
  }

  writePrompt() {
    this.term.write(this.getPrompt());
  }

  start() {
    this.running = true;
    this.writePrompt();
    this.term.onData((data) => this.handleInput(data));
    this.term.onKey(({ domEvent }) => {
      // Prevent default for Tab
      if (domEvent.key === 'Tab') domEvent.preventDefault();
    });
  }

  handleInput(data) {
    if (!this.running) return;

    // Handle special sequences
    for (let i = 0; i < data.length; i++) {
      const ch = data[i];
      const code = ch.charCodeAt(0);

      if (ch === '\x1b' && data[i + 1] === '[') {
        // Arrow keys
        const arrow = data[i + 2];
        if (arrow === 'A') {
          // Up arrow
          const prev = this.history.up(this.inputBuffer);
          if (prev !== null) this._replaceInput(prev);
          i += 2;
          continue;
        } else if (arrow === 'B') {
          // Down arrow
          const next = this.history.down();
          if (next !== null) this._replaceInput(next);
          i += 2;
          continue;
        } else if (arrow === 'C') {
          // Right arrow
          if (this.cursorPos < this.inputBuffer.length) {
            this.cursorPos++;
            this.term.write('\x1b[C');
          }
          i += 2;
          continue;
        } else if (arrow === 'D') {
          // Left arrow
          if (this.cursorPos > 0) {
            this.cursorPos--;
            this.term.write('\x1b[D');
          }
          i += 2;
          continue;
        } else if (arrow === 'H') {
          // Home key
          this.cursorPos = 0;
          this._refreshLine();
          i += 2;
          continue;
        } else if (arrow === 'F') {
          // End key
          this.cursorPos = this.inputBuffer.length;
          this._refreshLine();
          i += 2;
          continue;
        } else if (arrow === '1' && data[i + 3] === '~') {
          // Home key (alternate)
          this.cursorPos = 0;
          this._refreshLine();
          i += 3;
          continue;
        } else if (arrow === '4' && data[i + 3] === '~') {
          // End key (alternate)
          this.cursorPos = this.inputBuffer.length;
          this._refreshLine();
          i += 3;
          continue;
        } else if (arrow === '3' && i + 3 < data.length && data[i + 3] === '~') {
          // Delete key
          if (this.cursorPos < this.inputBuffer.length) {
            this.inputBuffer = this.inputBuffer.slice(0, this.cursorPos) + this.inputBuffer.slice(this.cursorPos + 1);
            this._refreshLine();
          }
          i += 3;
          continue;
        }
        i += 2;
        continue;
      }

      if (code === 13) {
        // Enter
        this.term.writeln('');
        const cmd = this.inputBuffer.trim();
        if (cmd) {
          this.history.push(cmd);
          this._execute(cmd);
        }
        this.inputBuffer = '';
        this.cursorPos = 0;
        this.writePrompt();
        continue;
      }

      if (code === 127 || code === 8) {
        // Backspace
        if (this.cursorPos > 0) {
          this.inputBuffer = this.inputBuffer.slice(0, this.cursorPos - 1) + this.inputBuffer.slice(this.cursorPos);
          this.cursorPos--;
          this._refreshLine();
        }
        continue;
      }

      if (code === 3) {
        // Ctrl+C
        this.term.writeln('^C');
        this.inputBuffer = '';
        this.cursorPos = 0;
        this.writePrompt();
        continue;
      }

      if (code === 12) {
        // Ctrl+L
        this.term.clear();
        this._refreshLine();
        continue;
      }

      if (code === 21) {
        // Ctrl+U - clear line
        this.inputBuffer = '';
        this.cursorPos = 0;
        this._refreshLine();
        continue;
      }

      if (ch === '\t') {
        // Tab completion
        if (this.autocomplete) {
          const result = this.autocomplete.complete(this.inputBuffer, this.cursorPos, this.registry, this.fs);
          if (result.value) {
            this._replaceInput(result.value);
          } else if (result.candidates && result.candidates.length > 0) {
            this.term.writeln('');
            this.term.writeln(result.candidates.join('  '));
            this.writePrompt();
            this.term.write(this.inputBuffer);
            this._lastLineLen = this.inputBuffer.length + this._promptVisibleLen();
          }
        }
        continue;
      }

      // Regular character (handle surrogate pairs for emoji/multi-byte)
      if (code >= 32) {
        let char = ch;
        if (code >= 0xD800 && code <= 0xDBFF && i + 1 < data.length) {
          char = ch + data[++i];
        }
        this.inputBuffer = this.inputBuffer.slice(0, this.cursorPos) + char + this.inputBuffer.slice(this.cursorPos);
        this.cursorPos += char.length;
        this._refreshLine();
      }
    }
  }

  _replaceInput(newInput) {
    this.inputBuffer = newInput;
    this.cursorPos = newInput.length;
    this._refreshLine();
  }

  _refreshLine() {
    const promptStr = this.getPrompt();
    const fullLine = promptStr + this.inputBuffer;
    const cols = this.term.cols || 80;
    // Calculate how many wrapped rows the previous content occupied
    const prevLen = this._lastLineLen || 0;
    const prevRows = Math.max(0, Math.floor(prevLen / cols));
    // Move cursor up to the first row if wrapped
    if (prevRows > 0) {
      this.term.write(`\x1b[${prevRows}A`);
    }
    this.term.write('\r');
    this.term.write('\x1b[J'); // Clear from cursor to end of screen
    this.term.write(fullLine);
    // Track total visible length for next refresh
    this._lastLineLen = this.inputBuffer.length + this._promptVisibleLen();
    // Position cursor
    const diff = this.inputBuffer.length - this.cursorPos;
    if (diff > 0) {
      this.term.write(`\x1b[${diff}D`);
    }
  }

  _promptVisibleLen() {
    // Approximate visible prompt length by stripping ANSI
    const prompt = this.getPrompt();
    return prompt.replace(/\x1b\[[0-9;]*m/g, '').length;
  }

  async _execute(input) {
    const parts = input.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmdName = parts[0]?.toLowerCase();
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));

    if (!cmdName) return;

    const cmd = this.registry.get(cmdName);
    if (cmd) {
      try {
        await cmd.action(this.ctx, args);
      } catch (err) {
        this.term.writeln(fg(palette.red, `Error: ${err.message}`));
      }
    } else {
      const suggestions = this.registry.suggest(cmdName);
      this.term.writeln(fg(palette.red, `Command not found: ${cmdName}`));
      if (suggestions.length > 0) {
        this.term.writeln(dim(`  Did you mean: ${suggestions.map(s => fg(palette.green, s)).join(', ')}?`));
      }
      this.term.writeln(dim(`  Type ${fg(palette.green, 'help')} for available commands.`));
    }
  }
}
