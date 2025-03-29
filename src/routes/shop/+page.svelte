<script lang="ts">
  import { onMount } from 'svelte';
  import { products, fetchProducts } from '../store/products';

  let hoverSound: HTMLAudioElement;
  let isMuted = false;

  onMount(async () => {
    try {
      // Inicializa o som de hover
      hoverSound = new Audio('/sounds/hover.mp3');
      await hoverSound.load();
      
      // Carrega os produtos
      await fetchProducts();
    } catch (err) {
      console.error('Erro ao inicializar:', err);
    }
  });

  async function playSound(sound: HTMLAudioElement | null) {
    if (!isMuted && sound) {
      try {
        sound.currentTime = 0;
        await sound.play();
      } catch (err) {
        console.error('Erro ao tocar som:', err);
      }
    }
  }
</script>

<svelte:head>
  <title>Kama-Doro | Produtos Recomendados</title>
  <meta name="description" content="Produtos selecionados para melhorar sua experiência íntima. Acessórios, jogos e produtos sensuais recomendados." />
  <meta name="keywords" content="produtos sensuais, acessórios, jogos, intimidade, relacionamento" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 p-4 md:p-8 backdrop-blur-md">
  <!-- Barra de Navegação -->
  <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border-b border-white/10">
    <div class="max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
      <h1 class="text-white/80 text-xl font-medium">Kama-Doro</h1>
      <div class="flex gap-4">
        <a
          href="/"
          class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
          on:mouseenter={() => playSound(hoverSound)}
        >
          Timer
        </a>
        <a
          href="/kamasutra-dado"
          class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
          on:mouseenter={() => playSound(hoverSound)}
        >
          Kamasutra Dado
        </a>
        <a
          href="/raspadinha"
          class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
          on:mouseenter={() => playSound(hoverSound)}
        >
          Raspadinha
        </a>
        <a
          href="/shop"
          class="glass-button-outline px-4 py-2 rounded-full text-sm md:text-base text-white/80 hover:text-white transition-all duration-300"
          on:mouseenter={() => playSound(hoverSound)}
        >
          Shop
        </a>
      </div>
    </div>
  </div>

  <!-- Botão de Som -->
  <button
    class="fixed top-20 right-2 md:top-24 md:right-4 z-50 glass-button-outline p-2 md:p-3 rounded-full"
    on:click={() => isMuted = !isMuted}
  >
    {#if isMuted}
      <svg class="w-4 h-4 md:w-6 md:h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    {:else}
      <svg class="w-4 h-4 md:w-6 md:h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m-5.536-6.464a5 5 0 010 7.072" />
      </svg>
    {/if}
  </button>

  <div class="max-w-6xl mx-auto pt-24">
    <!-- Título da Página -->
    <div class="glass-container p-4 md:p-8 rounded-3xl mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Produtos Recomendados
      </h1>
      <p class="text-center text-white/80">
        Produtos selecionados para melhorar sua experiência íntima
      </p>
    </div>

    <!-- Grid de Produtos -->
    {#if $products.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $products as product}
          <a 
            href={product.affiliateLink}
            target="_blank"
            class="glass-card group p-6 rounded-2xl hover:scale-105 transition-all duration-500"
            on:mouseenter={() => playSound(hoverSound)}
          >
            <div class="relative h-48 mb-4 overflow-hidden rounded-xl">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 class="text-lg font-bold text-white mb-2">{product.name}</h3>
            <p class="text-white/80 text-sm mb-4">{product.description}</p>
            <div class="flex justify-between items-center">
              <span class="text-pink-400 font-bold">R$ {product.price.toFixed(2)}</span>
              <span class="text-white/60 text-sm">Amazon</span>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <div class="flex items-center justify-center py-16">
        <div class="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" role="progressbar" aria-label="Carregando produtos..."></div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  :global(body) {
    @apply m-0 p-0;
    background: url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200') center/cover fixed;
    font-family: 'Cinzel', serif;
  }

  .glass-container {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
    transition: transform 0.3s ease;
  }

  .glass-container:hover {
    transform: translateY(-2px);
  }

  .glass-button-outline {
    @apply bg-transparent border-2 border-white/20 backdrop-blur-md
           hover:border-pink-500/50 hover:bg-white/5;
  }

  .glass-card {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
  }

  .glass-card:hover {
    box-shadow: 0 0 70px rgba(236, 72, 153, 0.3);
  }
</style>
