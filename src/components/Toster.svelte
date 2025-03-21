<!-- Toast.svelte -->
<script>
  /** @type {{message?: string, type?: string}} */
  let { message = '', type = 'info' } = $props();
  let visible = $state(true);

  function closeToast() {
    visible = false;
  }
</script>

<style>
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--bg-color);
    color: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    transition: opacity 0.5s, transform 0.5s;
  }
  .toast.hidden {
    opacity: 0;
    transform: translateY(100%);
  }
  .toast.info {
    --bg-color: #2196f3;
  }
  .toast.success {
    --bg-color: #4caf50;
  }
  .toast.error {
    --bg-color: #f44336;
  }
  .close-btn {
    background: none;
    border: none;
    color: white;
    margin-left: 15px;
    cursor: pointer;
    font-size: 20px;
  }
</style>

{#if visible}
  <div class="toast {type} {visible ? '' : 'hidden'}">
    <span>{message}</span>
    <button class="close-btn" onclick={closeToast}>&times;</button>
  </div>
{/if}
