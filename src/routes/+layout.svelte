<script>import "../app.css";
/** @type {{children?: import('svelte').Snippet}} */
let { children } = $props();

</script>

<main class="font-sans antialiased">
	{@render children?.()}
</main>




<style>
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		background-color: #000;
		color: #fff;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(::-webkit-scrollbar) {
		width: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #1a1a1a;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #3b82f6;
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: #2563eb;
	}
</style>
