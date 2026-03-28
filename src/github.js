export async function loadGitHubData() {
  try {
    const resp = await fetch('./data/github.json');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch {
    return {
      user: { login: 'Real-Fruit-Snacks', public_repos: 0, followers: 0, following: 0 },
      repos: [],
      languages: {},
      updated_at: ''
    };
  }
}

export function hydrateFilesystem(fs, data) {
  if (!data?.repos) return;

  for (const repo of data.repos) {
    const desc = repo.description || 'No description';
    const lang = repo.language || 'Unknown';
    const stars = repo.stars ?? 0;
    const forks = repo.forks ?? 0;
    const url = repo.url || `https://github.com/${data.user.login}/${repo.name}`;
    const content = [
      '',
      `  \x1b[1m\x1b[38;2;203;166;247m${repo.name}\x1b[39m\x1b[22m`,
      `  \x1b[2m${'─'.repeat(40)}\x1b[22m`,
      '',
      `  ${desc}`,
      '',
      `  \x1b[1m\x1b[38;2;137;180;250mLanguage\x1b[39m\x1b[22m   \x1b[38;2;166;227;161m${lang}\x1b[39m`,
      `  \x1b[1m\x1b[38;2;137;180;250mStars\x1b[39m\x1b[22m      \x1b[38;2;249;226;175m★ ${stars}\x1b[39m`,
      `  \x1b[1m\x1b[38;2;137;180;250mForks\x1b[39m\x1b[22m      ${forks}`,
      `  \x1b[1m\x1b[38;2;137;180;250mURL\x1b[39m\x1b[22m        \x1b[38;2;116;199;236m${url}\x1b[39m`,
      '',
    ].join('\n');
    fs.addFile(`/projects/${repo.name}.md`, content);
  }
}
