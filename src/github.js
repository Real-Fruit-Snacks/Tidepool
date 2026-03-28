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
    const stars = repo.stars || 0;
    const content = [
      `# ${repo.name}`,
      '',
      desc,
      '',
      `Language: ${lang}`,
      `Stars: ${stars}`,
      `URL: ${repo.url || `https://github.com/${data.user.login}/${repo.name}`}`,
    ].join('\n');
    fs.addFile(`/projects/${repo.name}.md`, content);
  }
}
