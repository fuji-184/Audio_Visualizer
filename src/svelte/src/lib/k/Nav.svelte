<script>
    import Bg from "$lib/k/Bg.svelte";
    import { clicked } from '$lib/stores/audio.js';
    import { get } from 'svelte/store';
    import { onMount } from "svelte";

    // Inisialisasi visualizers dengan canvasRefs sebagai objek kosong
    let visualizers = [
        { mode: 'visualizer', useExistingAudio: true, canvasRefs: {} }
    ];

    let eq = get(clicked); // Ambil nilai awal clicked dari store
    let unsubscribe; // Deklarasi unsubscribe untuk later use

    onMount(() => {
        unsubscribe = clicked.subscribe(value => {
            eq = value;
            // console.log(eq);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe(); // Unsubscribe store ketika komponen dihancurkan
            }
        };
    });

    let menu = ["a", "b"]; // Inisialisasi menu
</script>

<!-- Template HTML -->
<div class="flex justify-between p-8 m-8 rounded-xl gradien text-white">
    <h1 class="text-4xl font-extrabold">Fuji</h1>
    <!-- Div visualizer-container dengan conditional class binding -->
    <div class="visualizer-container rounded-full" class:bg-black={eq === true} class:bg-white={eq === false}>
        <canvas bind:this={visualizers[0].canvasRefs}></canvas>
    </div>
    <ol class="flex gap-4 text-xl font-bold">
        {#each menu as a}
            <li>{a}</li>
        {/each}
    </ol>
</div>

<!-- Komponen Bg -->
<Bg visualizers={visualizers} />

<style>
    .gradien {
        background-image: linear-gradient(to bottom right, rgba(59, 130, 246, 1), rgba(168, 85, 247, 1));
    }
    .visualizer-container {
        width: 50px;
        height: 50px;
        overflow: hidden;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>
