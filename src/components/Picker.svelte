<script lang="ts">
  import { onMount } from "svelte";
  const m = { x: 0, y: 0 };
  let w, h, w2;
  let rect;

  onMount(() => {
    rect = document.getElementById("color-picker").getBoundingClientRect()
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

<div class="megacontainer">
  The mouse position is {Math.round(m.x)} x {Math.round(m.y)}
  <div id="color-picker" bind:offsetWidth={w} bind:clientWidth={w2} bind:offsetHeight={h} on:mousemove={handleMousemove} on:mousedown={handleMouseclick} class="container">
    <div class="bg">
      <div class="bg bg1" />
      <div class="bg bg2" />
    </div>
  </div>
</div>

<style>
  .container {
    position: relative;
    width: 10rem;
    height: 10rem;
  }
  .megacontainer {
    position: relative;
    width: 10rem;
    height: 10rem;
  }
  .bg {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
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
</style>
