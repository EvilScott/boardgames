<script>
    import BoardGame from '~/components/BoardGame.svelte';
    import { filteredList } from '~/utils/stores.js';
</script>

<div class="container">
    <h1>boardgames</h1>
    {#each $filteredList as game}
        <BoardGame game={game} />
    {:else}
        No games found
    {/each}
</div>
