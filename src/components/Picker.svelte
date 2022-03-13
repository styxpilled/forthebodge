<script lang="ts">
  import { onMount } from "svelte";
  import { hsbToRgb } from "$lib/helpers";
  const m = {
    x: 0, // Saturation
    y: 0, // Brightness
    z: 0, // Hue
  };
  let w, h, picker;
  let rect;
  let clicked = false;

  let SBCircle: HTMLElement, HCircle: HTMLElement;

  onMount(() => {
    rect = picker.getBoundingClientRect();
    HCircle.style.left = "25%";
    HCircle.style.top = "-100%";
  });

  function HChange(event) {
    const y = (event.clientY - rect.top) / h;
    const x = (event.clientX - rect.left) / w;
    m.z = y * 360;
    HCircle.style.top = `${y * 100 - 100 - 5}%`;
    HCircle.style.left = `${x * 100 - 100 + 10}%`;
  }

  function SBChange(event) {
    const y = (event.clientY - rect.top) / h;
    const x = (event.clientX - rect.left) / w;
    m.x = x;
    m.y = Math.abs(y - 1);
    SBCircle.style.top = `${y * 100 - 6}%`;
    SBCircle.style.left = `${m.x * 100 - 6}%`;
  }
</script>

<div class="picker">
  <div
    class="container color-container"
    bind:this={picker}
    bind:offsetWidth={w}
    bind:offsetHeight={h}
    on:mousedown={(e) => {
      clicked = true;
      SBChange(e);
    }}
    on:mousemove={(e) => clicked && SBChange(e)}
    on:mouseup={() => (clicked = false)}
    on:mouseleave={() => (clicked = false)}
  >
    <div class="bg" style:background-color="rgb({hsbToRgb(m.z, 1, 1)})">
      <div class="bg bg1" />
      <div class="bg bg2" />
    </div>
    <div class="circle" bind:this={SBCircle} />
  </div>
  <div class="container">
    <div
      class="hue"
      on:mousedown={(e) => {
        clicked = true;
        HChange(e);
      }}
      on:mousemove={(e) => clicked && HChange(e)}
      on:mouseup={() => (clicked = false)}
      on:mouseleave={() => (clicked = false)}
    />
    <div class="circle" bind:this={HCircle} />
  </div>
</div>
<div class="preview">
  <div class="color" style:background-color="rgb({hsbToRgb(m.z, m.x, m.y)}">
    sdadad
  </div>
</div>

<style>
  .circle {
    position: relative;
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.15rem;
    border-color: black;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
  }
  .picker {
    display: flex;
    justify-content: space-evenly;
    width: 14rem;
    height: 10rem;
  }
  .container {
    overflow: hidden;
  }
  .color-container {
    width: 10rem;
    height: 10rem;
  }
  .bg {
    position: absolute;
    display: block;
    width: 10rem;
    height: 10rem;
    opacity: 1;
    z-index: -1;
  }
  .bg1 {
    z-index: 2;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), black);
  }
  .bg2 {
    background: linear-gradient(to left, rgba(255, 255, 255, 0), #fff);
  }

  .hue {
    width: 2rem;
    height: 100%;
    background: linear-gradient(
      to bottom,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    z-index: 3;
  }
  .preview {
    background-color: hsl(250deg 100 8);
  }
</style>
