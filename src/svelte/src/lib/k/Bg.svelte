<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import init, { SharedAudioProcessor, StyleType } from '$lib/pkg/audio/audio.js';
  import { sharedProcessorStore, clicked } from '$lib/stores/audio.js';
  import { get } from 'svelte/store';

  export let visualizers = [
    { mode: 'visualizer', useExistingAudio: true, canvasRefs: null },
    { mode: 'bg', useExistingAudio: false, canvasRefs: null }
  ];

  let sharedProcessor = null;
  let isPlaying = false;
  let isDrawing = false; 
  let unsubscribe;
  let jumlah = 0;
  let notHasUseExistingAudio = visualizers.some(({ useExistingAudio }) => !useExistingAudio);
  let hasUseExistingAudio = visualizers.some(({ useExistingAudio }) => useExistingAudio);
  // console.log(notHasUseExistingAudio)

  async function initWasm() {
    try {
      await init();
      if (!sharedProcessor) {
        sharedProcessor = new SharedAudioProcessor();
        sharedProcessorStore.set(sharedProcessor);
      }

      for (const isi of visualizers) {
        if (!isi.useExistingAudio && isi.canvasRefs) {
          const dpr = window.devicePixelRatio || 1;
          isi.canvasRefs.width = isi.canvasRefs.clientWidth * dpr;
          isi.canvasRefs.height = isi.canvasRefs.clientHeight * dpr;

          const styleType = isi.mode === 'visualizer' ? StyleType.Visualizer : StyleType.Bg;
          await sharedProcessor.add_instance(isi.canvasRefs, styleType);
          jumlah += 1;
        }
      }

      sharedProcessor.set_on_audio_end(() => {
        isPlaying = false;
        isDrawing = false;
      });

    } catch (error) {
      console.error('Failed to initialize WASM:', error);
    }
  }

  async function handleAudio() {
    try {
      if (sharedProcessor === null) {
        await initWasm();
      }

      if (sharedProcessor) {
        await sharedProcessor.process_audio_from_path("/audio/Mortals.mp3");
        isPlaying = true;
        clicked.set(true);
        draw();
      }
    } catch (error) {
      console.error('Failed to process audio:', error);
    }
  }

  function draw() {
    if (sharedProcessor && isPlaying && !isDrawing) {
      isDrawing = true;
      sharedProcessor.draw();

      requestAnimationFrame(() => {
        isDrawing = false;
        if (isPlaying) draw();
      });
    }
  }

  function stopAudio() {
    if (sharedProcessor) {
      sharedProcessor.stop_audio();
      isPlaying = false;
      isDrawing = false;
      // sharedProcessorStore.set(null);
    }
    clicked.set(false);
    jumlah = 0;
  }

  onMount(() => {
    if (hasUseExistingAudio) {
      unsubscribe = clicked.subscribe(async (value) => {
        if (sharedProcessor === null) {
          sharedProcessor = get(sharedProcessorStore);
        }

        if (jumlah !== visualizers.length && sharedProcessor !== null) {
          for (const isi of visualizers) {
            if (isi.useExistingAudio && isi.canvasRefs) {
              const dpr = window.devicePixelRatio || 1;
              isi.canvasRefs.width = isi.canvasRefs.clientWidth * dpr;
              isi.canvasRefs.height = isi.canvasRefs.clientHeight * dpr;

              const styleType = isi.mode === 'visualizer' ? StyleType.Visualizer : StyleType.Bg;
              await sharedProcessor.add_instance(isi.canvasRefs, styleType);
              jumlah += 1;
            }
          }
        }

        if (value && !isDrawing) {
          isPlaying = true;
          isDrawing = true;
          // console.log("hello")
          draw(); 
        }
      });
    }
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
    stopAudio();
  });
</script>

{#if notHasUseExistingAudio}
<div class="control-panel">
  <button class="control-button play" on:click={handleAudio} disabled={isPlaying}>
    Play Audio
  </button>
  <button class="control-button stop" on:click={stopAudio} disabled={!isPlaying}>
    Stop Audio
  </button>
</div>
{/if}

<style>
  .visualizer-container {
    width: 100%;
    height: 50vh;
    background: black;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
  }

  .control-panel {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16px;
    z-index: 10;
  }

  .control-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .control-button.play {
    background: linear-gradient(135deg, #50e3c2, #b8e986);
  }

  .control-button.stop {
    background: linear-gradient(135deg, #ff4b5c, #ff8a80);
  }

  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
