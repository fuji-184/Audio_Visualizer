<!-- AnimationEffects.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    import init, { Animator } from '$lib/pkg/animasi.js';
  
    export let enableRainbow = false;
    export let enableSmoke = false;
    // export let rainbowSpeed = 1;
  
    let canvas;
    let animator;
    let animationFrame;
    let lastTime = 0;
  
    onMount(async () => {
      try {
        await init();
        
        const resizeCanvas = () => {
          const { innerWidth, innerHeight } = window;
          canvas.width = innerWidth;
          canvas.height = innerHeight;
          if (animator) {
            animator.resize(innerWidth, innerHeight);
          }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        animator = new Animator(canvas.id);
        
        if (enableRainbow){
            
            // Array warna kustom cool dark untuk animasi pelangi
        // let coolDarkColors = [
        //     "rgb(5, 31, 64)",     // Navy Blue
        //     "rgb(2, 48, 71)",     // Deep Sea Green
        //     "rgb(47, 79, 79)",    // Dark Slate Gray
        //     "rgb(0, 56, 56)",     // Midnight Green
        //     "rgb(42, 52, 57)",    // Gunmetal
        //     "rgb(60, 20, 20)",    // Dark Sienna
        //     "rgb(54, 69, 79)",    // Charcoal
        //     "rgb(74, 100, 108)",  // Deep Space Sparkle
        //     "rgb(0, 46, 99)",     // Cool Black
        //     "rgb(65, 74, 76)",    // Outer Space
        //     "rgb(72, 61, 139)",   // Dark Slate Blue
        //     "rgb(35, 48, 68)"     // Deep Indigo
        // ];


            animator.enable_rainbow(0.05, 0.0000000000000000000000000000000000000000001, null, 0.2);
            // animator.set_rainbow_speed(rainbowSpeed);
        }
        if (enableSmoke) animator.enable_smoke();
        
        const animate = (currentTime) => {
          if (!lastTime) lastTime = currentTime;
          const deltaTime = (currentTime - lastTime) / 1000;
          lastTime = currentTime;
          
          animator.update(deltaTime);
          animationFrame = requestAnimationFrame(animate);
        };
        
        animationFrame = requestAnimationFrame(animate);
        
        return () => {
          window.removeEventListener('resize', resizeCanvas);
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        };

      } catch (error) {
        console.error('Failed to initialize animator:', error);
      }
    });
  
    onDestroy(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    });
  </script>
  
  <canvas
    id="effectsCanvas"
    bind:this={canvas}
  />
  
  <style>
    #effectsCanvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  </style>