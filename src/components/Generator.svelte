<script lang='ts'>
  import { onMount } from 'svelte';
  import { badge } from '$lib/badge';
  import { download } from '$lib/helpers';
  import Picker from './Picker.svelte';
  let promise: Promise<string>;
  let url: string;
  let timer: NodeJS.Timeout;

  let RGB: [number, number, number] = [49, 196, 243];
  let RGB2: [number, number, number] = [56, 154, 213];

  $: {
    RGB = RGB;
    RGB2 = RGB2;
    debounce();
  }

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
    input.colors[0] = rgbToHex(RGB);
    input.colors[1] = rgbToHex(RGB2);
    promise = badge(input);
  });

  const debounce = (v?: string, order?: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (v) {
        input.text[order] = v;
      }
      input.colors[0] = rgbToHex(RGB);
      input.colors[1] = rgbToHex(RGB2);
      console.log(input);
      
      promise = badge(input);
    }, 500);
  };

  function rgbToHex(rgb: [number, number, number]) {
    return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
  }
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

<div style="display:flex;">
  <Picker bind:RGB={RGB} />
  <Picker bind:RGB={RGB2} />
</div>