<script>
  import Designer from '~/components/Designer.svelte';
  import Tag from '~/components/Tag.svelte';
  export let game;
</script>

<div class="board-game row">
  <div class="name" >
    <a href={game.url} target="_blank">
      {game.name} ({game.year})
    </a>
  </div>
  <div>
    design:
    {#each game.designers as name}
      <Designer name={name} />
    {/each}
    tags:
    {#each game.tags as name}
      <Tag name={name} />
    {/each}
  </div>
</div>

<style>
  .board-game {
    border-bottom: 1px solid #ccc;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }

  .board-game div.name {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
</style>
