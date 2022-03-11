<script lang='ts'>
  import { onMount } from 'svelte';
  import { badge } from '$lib/badge';
  import { download } from '$lib/helpers';
  import Picker from './Picker.svelte';
  let promise: Promise<string>;
  let url: string;
  let timer: NodeJS.Timeout;

  const input: BadgeInput = {
    url: url,
    text: ['🗿🗿🗿abc🐱🐱🐱abc', 'some text🗿🗿'],
    colors: ['#31C4F3', '#389AD5'],
    fonts: [
      'http://localhost:3000/src/styles/fonts/roboto-medium-webfont.woff',
      'http://localhost:3000/src/styles/fonts/montserrat-extrabold-webfont.woff',
    ],
  };

  onMount(() => {
    url = window.location.origin;
    promise = badge(input);
  });

  const debounce = (v: string, order: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      input.text[order] = v;
      promise = badge(input);
    }, 500);
  };
</script>

<form>
  <input
    on:keyup={(event) => debounce(event.currentTarget.value, 0)}
    value='🗿🗿🗿abc🐱🐱🐱abc'
  />
  <input
    on:keyup={(event) => debounce(event.currentTarget.value, 1)}
    value='some text🗿🗿'
  />
</form>

{#await promise then svg}
  <button on:click={() => download(`${input.text[0]}${input.text[1]}.svg`, svg)}>
    {@html svg}
  </button>
{/await}

<div>
  <Picker />
  <Picker />
</div>