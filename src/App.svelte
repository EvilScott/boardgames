<script>
    import BoardGame from '~/components/BoardGame.svelte'
    export let games;
</script>

<div class="container">
    <h1>boardgames</h1>
    <BoardGame game={games[0]} />
</div>
