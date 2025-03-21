<!-- PhotoGallery.svelte -->

<script>
    /** @type {{photos?: any}} */
    let { photos = [] } = $props();

    function handleDeletePhoto(id) {
        // Lógica para deletar a foto (caso necessário)
        console.log(`Deleting photo with ID: ${id}`);
    }
</script>

<style>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
    }

    .photo {
        position: relative;
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 5px;
    }

    .delete-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: #c40000;
        color: white;
        border: none;
        padding: 3px 8px;
        cursor: pointer;
        border-radius: 3px;
        transition: background-color 0.3s;
    }

    .delete-btn:hover {
        background-color: #ff0000;
    }
</style>

<div class="gallery">
    {#each photos as photo (photo.id)}
        <div class="photo">
            <img src={photo.url} alt="Photo" width="100%" height="auto" />
            <!-- Botão de exclusão -->
            <button class="delete-btn" onclick={() => handleDeletePhoto(photo.id)}>Delete</button>
        </div>
    {/each}
</div>
