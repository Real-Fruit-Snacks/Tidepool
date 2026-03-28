export class CommandRegistry {
  constructor() {
    this.commands = new Map();
    this.aliases = new Map();
  }

  register(name, { description, category, action, aliases = [] }) {
    this.commands.set(name, { name, description, category, action });
    for (const alias of aliases) {
      this.aliases.set(alias, name);
    }
  }

  get(name) {
    const resolved = this.aliases.get(name) || name;
    return this.commands.get(resolved) || null;
  }

  getAll() {
    return [...this.commands.values()];
  }

  getNames() {
    return [...this.commands.keys(), ...this.aliases.keys()];
  }

  getAliasesFor(name) {
    return [...this.aliases.entries()]
      .filter(([, v]) => v === name)
      .map(([k]) => k);
  }

  suggest(input) {
    if (!input) return [];
    const names = this.getNames();
    const scored = names
      .map(name => ({ name, dist: levenshtein(input, name) }))
      .filter(({ dist, name }) => dist <= Math.min(3, Math.max(1, Math.floor(name.length / 3))))
      .sort((a, b) => a.dist - b.dist);
    return scored.slice(0, 3).map(s => s.name);
  }
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
