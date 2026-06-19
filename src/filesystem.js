export class VirtualFS {
  constructor() {
    // Root directory tree. Each dir is a Map of name -> { type, content?, children? }
    this.root = new Map();
    this.cwd = '/';
    this.prevDir = '/';
  }

  // Add a file at an absolute path
  addFile(path, content) {
    const parts = this._splitPath(path);
    const fileName = parts.pop();
    let dir = this.root;
    for (const part of parts) {
      if (!dir.has(part)) {
        dir.set(part, { type: 'dir', children: new Map() });
      }
      const node = dir.get(part);
      if (node.type !== 'dir') {
        console.warn(`addFile: path component '${part}' in '${path}' is not a directory`);
        return false;
      }
      dir = node.children;
    }
    dir.set(fileName, { type: 'file', content });
    return true;
  }

  // Add a directory
  addDir(path) {
    const parts = this._splitPath(path);
    let dir = this.root;
    for (const part of parts) {
      if (!dir.has(part)) {
        dir.set(part, { type: 'dir', children: new Map() });
      }
      const node = dir.get(part);
      if (node.type !== 'dir') return;
      dir = node.children;
    }
  }

  // Resolve a path string to absolute
  resolve(path) {
    if (path === '~' || path === '') return '/';
    if (path === '-') return this.prevDir;

    let base = path.startsWith('/') ? [] : this.cwd.split('/').filter(Boolean);
    const parts = path.split('/').filter(Boolean);

    for (const part of parts) {
      if (part === '.' || part === '') continue;
      if (part === '..') {
        base.pop();
      } else {
        base.push(part);
      }
    }
    return '/' + base.join('/');
  }

  // Get a node at an absolute path
  get(absPath) {
    if (absPath === '/') return { type: 'dir', children: this.root };
    const parts = this._splitPath(absPath);
    let dir = this.root;
    for (let i = 0; i < parts.length; i++) {
      const node = dir.get(parts[i]);
      if (!node) return null;
      if (i === parts.length - 1) return node;
      if (node.type !== 'dir') return null;
      dir = node.children;
    }
    return null;
  }

  // List entries in a directory
  ls(absPath, showHidden = false) {
    const node = this.get(absPath);
    if (!node || node.type !== 'dir') return null;
    const entries = [];
    for (const [name, child] of node.children) {
      if (!showHidden && name.startsWith('.')) continue;
      entries.push({ name, type: child.type });
    }
    entries.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    return entries;
  }

  // Change directory
  cd(path) {
    const absPath = this.resolve(path);
    const node = this.get(absPath);
    if (!node) return { error: `cd: ${path}: No such file or directory` };
    if (node.type !== 'dir') return { error: `cd: ${path}: Not a directory` };
    this.prevDir = this.cwd;
    this.cwd = absPath;
    return { path: absPath };
  }

  // Get all file paths (for autocomplete)
  getAllPaths(absPath = '/') {
    const results = [];
    const collect = (node, prefix) => {
      if (!node.children) return;
      for (const [name, child] of node.children) {
        const full = prefix === '/' ? `/${name}` : `${prefix}/${name}`;
        results.push({ path: full, type: child.type });
        if (child.type === 'dir') {
          collect(child, full);
        }
      }
    };
    const node = this.get(absPath);
    if (node) collect(node, absPath === '/' ? '' : absPath);
    return results;
  }

  _splitPath(path) {
    return path.split('/').filter(Boolean);
  }
}
