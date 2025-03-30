<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Product {
    productName: string;
    itemId: number;
    price: string;
    imageUrl: string;
    offerLink: string;
    ratingStar: string;
    priceDiscountRate: number;
    shopName: string;
  }

  const categories = [
    {
      id: 'intimate',
      name: 'Produtos Íntimos',
      keyword: 'sex+shop+sex+fantasy',
      icon: '🌹'
    },
    {
      id: 'toys',
      name: 'Brinquedos Adultos',
      keyword: 'sex+fantasy',
      icon: '💝'
    },
    {
      id: 'lingerie',
      name: 'Lingerie',
      keyword: 'calcinhas+babydoll+lingerie',
      icon: '👙'
    }
  ];

  let products: Product[] = [];
  let loading = false;
  let currentIndex = 0;
  let autoPlayInterval: ReturnType<typeof setInterval>;
  let isPaused = false;

  async function fetchProducts(keyword: string) {
    loading = true;
    try {
      const response = await fetch(
        `https://dev.muttercorp.com.br/shopee-affiliate/offers/search?keyword=${keyword}&page=1&limit=20`
      );
      const data = await response.json();
      products = data.data.productOfferV2.nodes;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      products = [];
    } finally {
      loading = false;
    }
  }

  async function changeCategory(index: number) {
    if (index === currentIndex) return; // Evita recarregar a mesma categoria
    
    currentIndex = index;
    isPaused = true; // Pausa temporariamente durante a mudança
    await fetchProducts(categories[currentIndex].keyword);
    isPaused = false; // Retoma após a mudança
  }

  async function nextCategory() {
    if (loading || isPaused) return; // Evita múltiplas chamadas durante loading
    const nextIndex = (currentIndex + 1) % categories.length;
    await changeCategory(nextIndex);
  }

  async function prevCategory() {
    if (loading || isPaused) return; // Evita múltiplas chamadas durante loading
    const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
    await changeCategory(prevIndex);
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(async () => {
      if (!isPaused && !loading) {
        await nextCategory();
      }
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function handleMouseEnter() {
    isPaused = true;
    stopAutoPlay();
  }

  function handleMouseLeave() {
    isPaused = false;
    startAutoPlay();
  }

  onMount(async () => {
    await fetchProducts(categories[currentIndex].keyword);
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });
</script>

<div 
  class="bg-gradient-to-r from-purple-900/90 to-pink-900/90 rounded-xl p-6 backdrop-blur-sm relative"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <!-- Botões de navegação -->
  <button
    class="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
    on:click|preventDefault={prevCategory}
    disabled={loading}
  >
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    class="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
    on:click|preventDefault={nextCategory}
    disabled={loading}
  >
    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>

  <!-- Cabeçalho -->
  <div class="flex flex-col md:flex-row justify-between items-center mb-8">
    <h2 class="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">
      {categories[currentIndex].name} {categories[currentIndex].icon}
    </h2>
    
    <!-- Indicadores de categoria -->
    <div class="flex gap-2">
      {#each categories as _, index}
        <button
          class="w-2 h-2 rounded-full transition-all {index === currentIndex ? 'bg-pink-500 w-8' : 'bg-white/50'}"
          on:click={() => changeCategory(index)}
          disabled={loading}
        />
      {/each}
    </div>
  </div>

  <!-- Conteúdo com transição -->
  <div class="relative min-h-[400px]">
    <!-- Loading State -->
    {#if loading}
      <div class="absolute inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm rounded-lg">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    {/if}

    <!-- Produtos -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 {loading ? 'opacity-50' : ''}">
      {#each products.slice(0, 5) as product (product.itemId)}
        <a
          href={product.offerLink}
          target="_blank"
          rel="noopener noreferrer"
          class="block group bg-black/20 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
        >
          <div class="relative aspect-square">
            <img
              src={product.imageUrl}
              alt={product.productName}
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            {#if product.priceDiscountRate > 0}
              <div class="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                -{product.priceDiscountRate}%
              </div>
            {/if}
          </div>
          
          <div class="p-3">
            <p class="text-white text-sm line-clamp-2 min-h-[2.5rem] mb-2">
              {product.productName}
            </p>
            
            <div class="flex items-center justify-between">
              <div>
                <p class="text-pink-400 font-bold">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </p>
                {#if product.ratingStar !== "0"}
                  <div class="flex items-center text-xs text-yellow-400">
                    <span>★</span>
                    <span class="ml-1">{product.ratingStar}</span>
                  </div>
                {/if}
              </div>
              
              <button class="text-xs px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors">
                Comprar
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
