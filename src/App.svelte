<script>
    import BoardGame from '~/components/BoardGame.svelte';
    import Designer from '~/components/Designer.svelte';
    import Tag from '~/components/Tag.svelte';
    import { filters, filteredList } from '~/utils/stores.js';
</script>

<div class="container">
    <h1>boardgames</h1>
    <div class="filters">
        {#each $filters.designers as name}
            <Designer name={name} />
        {/each}
        {#each $filters.tags as name}
            <Tag name={name} />
        {/each}
    </div>
    <div class="games">
        {#each $filteredList as game}
            <BoardGame game={game} />
        {:else}
            No games found
        {/each}
    </div>
</div>

<style>
    .filters {
        margin-bottom: 2rem;
    }
</style>
