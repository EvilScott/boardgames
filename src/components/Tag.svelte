<script context="module">
  import { filters } from '~/utils/stores.js';
</script>

<script>
  export let name;
  $: selected = $filters.tags.includes(name);
  let toggle = () => {
    if (selected) {
      filters.set({
        ...$filters,
        tags: $filters.tags.filter(v => v !== name)
      });
    } else {
      filters.set({
        ...$filters,
        tags: [ ...$filters.tags, name ]
      });
    }
  };
</script>

<span on:click={toggle} class:selected>
  {name}
</span>

<style>
  span {
    border: 1px solid #333;
    cursor: pointer;
    display: inline-block;
    font-size: 1.2rem;
    margin-right: 0.25rem;
    padding: 0 0.5rem;
    user-select: none;
  }

  span.selected {
    background-color: #333333;
    color: white;
  }
</style>
