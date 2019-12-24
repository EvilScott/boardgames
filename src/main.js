import App from '~/App.svelte';
import games from '~/boardgames.json';

const app = new App({
  target: document.body,
  props: { games },
});

export default app;
