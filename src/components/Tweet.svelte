<script>
    /** @type {{tweet: any, onDelete: any}} */
    let { tweet, onDelete } = $props();

    console.log(tweet)

    function handleDelete() {
        onDelete(tweet.id);
    }
</script>

<style>
    .tweet {
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .content {
        margin-bottom: 10px;
    }

    .actions {
        text-align: right;
    }

    button {
        background-color: #c40000;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 3px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #ff0000;
    }
</style>

<div class="tweet">
    <div class="content">{tweet.content}</div>
    <div class="actions">
        <button onclick={handleDelete}>Delete</button>
    </div>
</div>
