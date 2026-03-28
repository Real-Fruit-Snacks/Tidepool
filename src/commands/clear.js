export function register(registry) {
  registry.register('clear', {
    description: 'Clear the terminal',
    category: 'General',
    aliases: ['cls'],
    action(ctx) {
      ctx.term.clear();
    }
  });
}
