<script>import "../app.css";
import { inject } from '@vercel/analytics';
/** @type {{children?: import('svelte').Snippet}} */
let { children } = $props();

// Initialize analytics
inject();
</script>

<slot />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
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

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
