<script lang="ts">
  import { onMount } from "svelte";
  import { hslToRgb } from '$lib/helpers';
  const m = { x: 0, y: 0, z: 0 };
  let w, h, picker;
  let rect;

  onMount(() => {
    rect = picker.getBoundingClientRect()
  });
  function handleSLMove(event) {
    // m.x = Math.abs((event.clientX - rect.left) - (event.clientX - rect.left));
    m.x = (event.clientX - rect.left) / w;
    // m.y = Math.abs((event.clientY - rect.top) / h - 1);
    m.y = (event.clientY - rect.top) / h;
  }

  function handleHMove(event) {
    m.z = (event.clientY - rect.top) / h * 360;
    // console.log(`${Math.round(m.z/h)}`);
    
  }

  function handleMouseclick(event) {
    console.log(hslToRgb((m.z/h), (m.x/w), (m.y)));
    console.log(`${m.x/w}, ${m.y}`);
  }
</script>

<div class="picker">
  
  <div id="color-picker" bind:this={picker} bind:offsetWidth={w} bind:offsetHeight={h} on:mousemove={handleSLMove} on:mousedown={handleMouseclick} class="container">
    <div class="bg">
      <div class="bg bg1" />
      <div class="bg bg2" />
    </div>
  </div>
  <div class="hue" on:mousemove={handleHMove} />
</div> 
<div class="preview">
  <div class="color" style:background-color="rgb({hslToRgb(m.z, m.x, m.y)}">
    sdadad
    </div>
</div>
<style>
  .picker {
    display: flex;
    justify-content: space-evenly;
    width: 14rem;
    height: 10rem;
  }
  .container {
    width: 10rem;
    height: 10rem;
  }
  .bg {
    position: absolute;
    display: block;
    width: 10rem;
    height: 10rem;
    background-color: rgb(255, 0, 0);
    opacity: 1;
    z-index: -1;
  }
  .bg1 {
    z-index: 2;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), black);
  }
  .bg2 {
    /* top: -10rem; */
    z-index: 1;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), #fff);
  }

  .hue {
    width: 2rem;
    height: 100%;
    background: linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    z-index: 3;
  }
  .preview {
    background-color: hsl(250deg 100 8);
  }
</style>
