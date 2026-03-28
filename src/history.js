const STORAGE_KEY = 'terminal-history';
const MAX_ENTRIES = 200;

export class History {
  constructor() {
    this.entries = this._load();
    this.cursor = this.entries.length;
    this.draft = '';
  }

  _load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries.slice(-MAX_ENTRIES)));
    } catch { /* localStorage may be unavailable (private browsing) or over quota */ }
  }

  push(cmd) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    // Deduplicate consecutive
    if (this.entries[this.entries.length - 1] !== trimmed) {
      this.entries.push(trimmed);
      this._save();
    }
    this.cursor = this.entries.length;
    this.draft = '';
  }

  up(currentInput) {
    if (this.cursor <= 0) return null;
    if (this.cursor === this.entries.length) {
      this.draft = currentInput;
    }
    this.cursor--;
    return this.entries[this.cursor];
  }

  down() {
    if (this.cursor >= this.entries.length) return null;
    this.cursor++;
    if (this.cursor === this.entries.length) {
      return this.draft;
    }
    return this.entries[this.cursor];
  }

  reset() {
    this.cursor = this.entries.length;
    this.draft = '';
  }

  getAll() {
    return [...this.entries];
  }

  clear() {
    this.entries = [];
    this.cursor = 0;
    this.draft = '';
    this._save();
  }
}
