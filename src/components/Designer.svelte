<script context="module">
  import { filters } from '~/utils/stores.js';
</script>

<script>
  export let name;
  $: selected = $filters.designers.includes(name);
  let toggle = () => {
    if (selected) {
      filters.set({
        ...$filters,
        designers: $filters.designers.filter(v => v !== name)
      });
    } else {
      filters.set({
        ...$filters,
        designers: [ ...$filters.designers, name ]
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
    margin-right: 0.25rem;
    padding: 0 0.5rem;
    user-select: none;
  }

  span.selected {
    background-color: #333333;
    color: white;
  }
</style>
