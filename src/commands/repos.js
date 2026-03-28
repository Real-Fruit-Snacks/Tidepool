import { palette } from '../theme.js';
import { fg, bold, dim, table as fmtTable } from '../formatter.js';

export function register(registry) {
  registry.register('repos', {
    description: 'GitHub repositories',
    category: 'GitHub',
    aliases: ['projects'],
    action(ctx) {
      const data = ctx.githubData;
      if (!data || !data.repos || data.repos.length === 0) {
        ctx.term.writeln(dim('  No repository data available.'));
        ctx.term.writeln(dim('  GitHub data updates daily via CI.'));
        return;
      }

      const repos = data.repos
        .sort((a, b) => (b.stars ?? 0) - (a.stars ?? 0))
        .slice(0, 15);

      const headers = ['Repository', 'Stars', 'Language', 'Description'];
      const rows = repos.map(r => [
        fg(palette.blue, r.name || ''),
        fg(palette.yellow, String(r.stars ?? 0)),
        fg(r.language ? palette.green : palette.overlay0, r.language || '-'),
        dim((r.description || '').slice(0, 40) + ((r.description || '').length > 40 ? '...' : '')),
      ]);

      ctx.term.writeln('');
      const lines = fmtTable(headers, rows, { headerColor: palette.mauve, borderColor: palette.surface2 });
      for (const line of lines) {
        ctx.term.writeln(line);
      }
      ctx.term.writeln('');
      ctx.term.writeln(dim(`  Total: ${data.repos.length} public repositories`));
      ctx.term.writeln('');
    }
  });
}
