<script lang="ts">
  import { onMount } from "svelte";
  const m = { x: 0, y: 0 };
  let w, h, picker;
  let rect;

  onMount(() => {
    rect = picker.getBoundingClientRect()
  });
  function handleMousemove(event) {
    m.x = event.clientX - rect.left;
    m.y = event.clientY - rect.top;
    console.log(`${Math.round(m.x/w*255)}, ${Math.round(m.y/h*255)}`);
  }

  function handleMouseclick(event) {
    console.log(`${Math.round(m.x/w*255)}, ${Math.round(m.y/h*255)}`);
  }
</script>

<div class="picker">
  
  <div id="color-picker" bind:this={picker} bind:offsetWidth={w} bind:offsetHeight={h} on:mousemove={handleMousemove} on:mousedown={handleMouseclick} class="container">
    <div class="bg">
      <div class="bg bg1" />
      <div class="bg bg2" />
    </div>
  </div>
  <div class="hue">
    
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
</style>
