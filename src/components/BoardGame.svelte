<script>
  import Designer from '~/components/Designer.svelte';
  export let game;
</script>

<div class="board-game row">
  <div>
    <a class="name" href={game.url} target="_blank">
      {game.name} ({game.year})
    </a>
  </div>
  <div>
    design:
    {#each game.designers as name}
      <Designer name={name} />
    {/each}
  </div>
</div>

<style>
  .board-game {
    margin-bottom: 1.6rem;
  }

  .board-game a.name {
    font-size: 1.8rem;
  }
</style>
