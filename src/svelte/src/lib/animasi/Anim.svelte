<!-- AnimationWrapper.svelte -->
<script>
    import { onMount, onDestroy } from 'svelte';
    import animationEffects from '$lib/utils/animator.js';
  
    export let canvasId;
    export let enableRainbow = false;
    export let enableSmoke = false;

    let containerRef;
    let error = null;
    let instance = null;

    onMount(() => {
        if (containerRef) {
            createAnimationInstance();
        }
    })

    async function createAnimationInstance() {
        try {
        instance = await animationEffects.createInstance(canvasId, containerRef, {
            enableRainbow,
            enableSmoke
        });
        } catch (err) {
        error = err.message;
        console.error(`Failed to initialize animation effects for canvas '${canvasId}':`, err);
        }
    }

    onDestroy(() => {
        if (instance) {
        try {
            animationEffects.destroyInstance(canvasId);
        } catch (err) {
            console.error(`Failed to destroy animation effects for canvas '${canvasId}':`, err);
        }
        }
    });
    </script>

<div bind:this={containerRef} class="" >
    {#if error}
        <p style="color: red;">Error: {error}</p>
    {/if}
</div>

<style>
    .anim {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
</style>