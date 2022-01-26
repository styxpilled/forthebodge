<script lang="ts">
  import { onMount } from "svelte";
  import { badge } from "$lib/badge.svelte";

  let promise: Promise<string>;
  let url: string;
  let timer;

  let biginput = {
    url: url,
    text: ["🗿🗿🗿abc🐱🐱🐱abc", "some text🗿🗿"],
    colors: ["#31C4F3", "#389AD5"],
    fonts: [
      "http://localhost:3000/src/fonts/roboto-medium-webfont.woff",
      "http://localhost:3000/src/fonts/montserrat-extrabold-webfont.woff",
    ],
    primaryColor: "#31C4F3",
    secondaryColor: "#389AD5",
    primaryFont: `http://localhost:3000/src/lib/roboto-medium-webfont.woff`,
    secondaryFont: `http://localhost:3000/src/lib/montserrat-extrabold-webfont.woff`,
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
      on:keyup={({ target: { value } }) => debounce(value, 0)}
      value="🗿🗿🗿abc🐱🐱🐱abc"
    />
    <input
      on:keyup={({ target: { value } }) => debounce(value, 1)}
      value="some text🗿🗿"
    />
    <button on:click={handleClick}>test</button>
  </form>
  {#await promise}
  <!-- something -->
{:then svg}
  {@html svg}
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
