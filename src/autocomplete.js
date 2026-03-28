export class Autocomplete {
  complete(input, cursorPos, registry, fs) {
    const before = input.slice(0, cursorPos);
    const parts = before.split(/\s+/);

    if (parts.length <= 1) {
      // Complete command name
      const partial = parts[0] || '';
      const names = registry.getNames().filter(n => n.startsWith(partial));
      if (names.length === 1) {
        return { value: names[0] + ' ' };
      }
      if (names.length > 1) {
        const common = commonPrefix(names);
        if (common.length > partial.length) {
          return { value: common };
        }
        return { value: null, candidates: names };
      }
      return { value: null };
    }

    // Complete file/dir path
    const partial = parts[parts.length - 1];
    const cmdPart = parts.slice(0, -1).join(' ');

    // Determine the directory to search in
    let dirPath, namePrefix;
    const lastSlash = partial.lastIndexOf('/');
    if (lastSlash >= 0) {
      dirPath = fs.resolve(partial.slice(0, lastSlash) || '/');
      namePrefix = partial.slice(lastSlash + 1);
    } else {
      dirPath = fs.cwd;
      namePrefix = partial;
    }

    const entries = fs.ls(dirPath, namePrefix.startsWith('.'));
    if (!entries) return { value: null };

    const matches = entries
      .filter(e => e.name.startsWith(namePrefix))
      .map(e => e.type === 'dir' ? e.name + '/' : e.name);

    if (matches.length === 1) {
      const completed = lastSlash >= 0
        ? partial.slice(0, lastSlash + 1) + matches[0]
        : matches[0];
      return { value: cmdPart + ' ' + completed };
    }
    if (matches.length > 1) {
      const common = commonPrefix(matches);
      if (common.length > namePrefix.length) {
        const completed = lastSlash >= 0
          ? partial.slice(0, lastSlash + 1) + common
          : common;
        return { value: cmdPart + ' ' + completed };
      }
      return { value: null, candidates: matches };
    }

    return { value: null };
  }
}

function commonPrefix(strings) {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}
