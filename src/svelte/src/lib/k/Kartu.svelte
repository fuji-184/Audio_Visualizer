{#each proyek as a, i}
    <div bind:this={kontainer} class="blue p-4 rounded-xl flex flex-col gap-4 text-white">
        <h2>{a.judul}</h2>
        <p>{a.deskripsi}</p>

        <!-- <Anim canvasId={"a"+i} enableRainbow={true} /> -->
    </div>
{/each}

<style>
    .blue {
        background-image: linear-gradient(to bottom right, rgba(255, 0, 0, 1), rgba(0, 0, 255, 1));
    }
</style>

<script>
    // import Anim from '$lib/animasi/Anim.svelte';

    let kontainer

    let proyek = [
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        },
        {
            judul: "a",
            deskripsi: "b"
        }
    ]
</script>