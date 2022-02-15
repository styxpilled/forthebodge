<script lang="ts">
  import { onMount } from "svelte";
  import { badge } from "$lib/badge";
  import { download } from "$lib/helpers";
  let promise: Promise<string>;
  let url: string;
  let timer;

  let biginput: BadgeInput = {
    url: url,
    text: ["🗿🗿🗿abc🐱🐱🐱abc", "some text🗿🗿"],
    colors: ["#31C4F3", "#389AD5"],
    fonts: [
      "http://localhost:3000/src/styles/fonts/roboto-medium-webfont.woff",
      "http://localhost:3000/src/styles/fonts/montserrat-extrabold-webfont.woff",
    ]
  };

  onMount(() => {
    url = window.location.origin;
    promise = badge(biginput);
  });

  const debounce = (v, order) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      biginput.text[order] = v;
      promise = badge(biginput);
    }, 500);
  };

  function handleClick() {
    promise = badge(biginput);
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <form>
    <input
      on:keyup={event => debounce(event.currentTarget.value, 0)}
      value="🗿🗿🗿abc🐱🐱🐱abc"
    />
    <input
      on:keyup={event => debounce(event.currentTarget.value, 1)}
      value="some text🗿🗿"
    />
    <button on:click={handleClick}>test</button>
  </form>

{#await promise then svg}
  <button on:click={() => download(`${biginput.text[0]}${biginput.text[1]}.svg`, svg)}>
    {@html svg}
  </button>
{/await}
</section>

<style lang="postcss">
  /* section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    flex: 1;
  } */
</style>
