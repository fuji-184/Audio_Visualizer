<script>
    import "../app.css";
    import Nav from '$lib/k/Nav.svelte';
    import Bg from "$lib/k/Bg.svelte"
    import Anim from '$lib/animasi/Anim.svelte';

    let visualizers = [
        { mode: 'bg', useExistingAudio: false, canvasRefs: null }
    ];
</script>

<Nav />

<Anim canvasId={"a"} enableRainbow={true} />
<Bg visualizers={visualizers} />

<div class="fixed left-0 top-0 z-[-2] w-full h-full">
    <canvas bind:this={visualizers[0].canvasRefs}></canvas>
</div>

<slot />

<style>
  .visualizer-container {
    width: 100px;
    height: 100px;
    /* background: transparent; */
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    /* background-color: black; */
  }
</style>