<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import init, { Visualizer } from '$lib/pkg/tes/tes.js';
  
    let canvas;
    let visualizer;
    let audioContext;
    let analyser;
    let rafId;
    let source;
    let isPlaying = false;
    let staticAudioPath = "/Mortals.mp3"; // Path audio dari folder `static`
  
    $: if (canvas) {
      const updateCanvasSize = () => {
        canvas.width = canvas.offsetWidth * devicePixelRatio;
        canvas.height = canvas.offsetHeight * devicePixelRatio;
        if (visualizer) {
          visualizer = new Visualizer(canvas);
        }
      };
      updateCanvasSize();
    }
  
    async function initVisualizer() {
      if (!browser || !canvas) return;
  
      try {
        await init();
  
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
  
        visualizer = new Visualizer(canvas);
  
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
        function draw() {
          analyser.getByteFrequencyData(dataArray);
          visualizer.draw(dataArray);
          rafId = requestAnimationFrame(draw);
        }
  
        draw();
      } catch (error) {
        console.error('Failed to initialize visualizer:', error);
      }
    }
  
    async function handleAudio(arrayBuffer) {
      if (!audioContext) await initVisualizer();
      if (!audioContext || !analyser) return;
  
      try {
        if (isPlaying) {
          audioContext.close();
          await initVisualizer();
        }
  
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
  
        // Add some audio processing
        const gainNode = audioContext.createGain();
        const biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.value = 1000;
        biquadFilter.gain.value = 25;
  
        source.connect(biquadFilter);
        biquadFilter.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioContext.destination);
  
        source.start(0);
        isPlaying = true;
  
        source.onended = () => {
          isPlaying = false;
          destroyVisualizer(); // Call to clean up resources when audio ends
        };
      } catch (error) {
        console.error('Failed to process audio:', error);
      }
    }
  
    async function loadStaticAudio() {
      try {
        const response = await fetch(staticAudioPath);
        const arrayBuffer = await response.arrayBuffer();
        handleAudio(arrayBuffer);
      } catch (error) {
        console.error('Failed to load static audio file:', error);
      }
    }
  
    function destroyVisualizer() {
      if (rafId) cancelAnimationFrame(rafId);
      if (audioContext) {
        audioContext.close().then(() => {
          audioContext = null;
        });
      }
      analyser = null;
      visualizer = null;
    }
  
    onMount(() => {
      const resizeObserver = new ResizeObserver(() => {
        if (canvas) {
          canvas.width = canvas.offsetWidth * devicePixelRatio;
          canvas.height = canvas.offsetHeight * devicePixelRatio;
          if (visualizer) {
            visualizer = new Visualizer(canvas);
          }
        }
      });
  
      resizeObserver.observe(canvas);
  
      return () => {
        resizeObserver.disconnect();
        destroyVisualizer();
      };
    });
  
    onDestroy(() => {
      destroyVisualizer();
    });
  </script>
  
  <div class="visualizer-container">
    <canvas bind:this={canvas}></canvas>
  </div>
  <button on:click={loadStaticAudio}>Play Audio from Static</button>
  
  <style>
    .visualizer-container {
      /* display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem; */
      /* position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0; */
      width: 50px;
      height: 50px;
      background-color: transparent;
      /* z-index: -5; */
    }
  
    canvas {
      width: 100%;
      height: 100%;
    }
  
    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 60;
    }
  
    button:hover {
      background: #45a049;
    }
  </style>
  