<script>
    import { createEventDispatcher } from 'svelte';

    let content = $state('');
    const dispatch = createEventDispatcher();

    function handleSubmit(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        dispatch('submit', { content }); // Envia o conteúdo do tweet como payload
        content = ''; // Limpa o campo após o envio
    }
</script>

<style>
    .tweet-form {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    textarea {
        resize: none;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
    }

    button {
        background-color: #1da1f2;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        border-radius: 3px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0d95e8;
    }
</style>

<form class="tweet-form" onsubmit={handleSubmit}>
    <textarea rows="3" bind:value={content} placeholder="What's happening?"></textarea>
    <button type="submit">Tweet</button>
</form>
