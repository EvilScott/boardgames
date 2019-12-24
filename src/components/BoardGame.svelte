<script>
  export let game;
</script>

<div class="board-game row">
  <a href={game.url} target="_blank">
    {game.name} ({game.year})
  </a>
</div>
