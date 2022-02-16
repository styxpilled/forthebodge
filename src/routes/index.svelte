<script lang='ts'>
  import Generator from '$components/Generator.svelte';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <Generator />
</section>

<style lang='postcss'>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
</style>
