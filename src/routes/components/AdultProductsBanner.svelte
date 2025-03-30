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
    if (loading) return;
    
    loading = true;
    try {
      const response = await fetch(
        `https://dev.muttercorp.com.br/shopee-affiliate/offers/search?keyword=${keyword}&page=1&limit=20`
      );
      if (!response.ok) throw new Error('Falha na requisição');
      
      const data = await response.json();
      if (data?.data?.productOfferV2?.nodes) {
        products = data.data.productOfferV2.nodes;
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      products = [];
    } finally {
      loading = false;
    }
  }

  async function changeCategory(index: number) {
    if (index === currentIndex || loading) return;
    
    isPaused = true;
    currentIndex = index;
    await fetchProducts(categories[index].keyword);
    isPaused = false;
  }

  function handlePrev() {
    if (loading) return;
    const newIndex = (currentIndex - 1 + categories.length) % categories.length;
    changeCategory(newIndex);
  }

  function handleNext() {
    if (loading) return;
    const newIndex = (currentIndex + 1) % categories.length;
    changeCategory(newIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      if (!isPaused && !loading) {
        handleNext();
      }
    }, 5000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
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
  class="glassmorphism-container relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl"
>
  <!-- Botões de navegação modificados com novo estilo -->
  <button
    type="button"
    class="absolute left-4 top-1/2 -translate-y-1/2 z-10 navigation-button left-button"
    on:click={() => !loading && handlePrev()}
    disabled={loading}
  >
    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
    </svg>
  </button>

  <button
    type="button"
    class="absolute right-4 top-1/2 -translate-y-1/2 z-10 navigation-button right-button"
    on:click={() => !loading && handleNext()}
    disabled={loading}
  >
    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
    </svg>
  </button>

  <!-- Indicadores modificados com novo estilo -->
  <div class="flex gap-4 justify-center mt-4">
    {#each categories as category, index}
      <button
        type="button"
        class="indicator-button {index === currentIndex ? 'active' : ''}"
        on:click={() => !loading && changeCategory(index)}
        disabled={loading}
      >
        <span class="indicator-text">{category.name}</span>
      </button>
    {/each}
  </div>

  <!-- Cabeçalho -->
  <div class="flex flex-col md:flex-row justify-between items-center mb-8">
    <h2 class="text-2xl md:text-3xl font-bold text-white/90 mb-4 md:mb-0 glassmorphism-text">
      {categories[currentIndex].name} {categories[currentIndex].icon}
    </h2>
  </div>

  <!-- Conteúdo com transição -->
  <div class="relative min-h-[400px]">
    <!-- Loading State -->
    {#if loading}
      <div class="absolute inset-0 flex justify-center items-center glassmorphism-overlay rounded-xl">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500/80"></div>
      </div>
    {/if}

    <!-- Produtos -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 {loading ? 'opacity-50' : ''}">
      {#each products.slice(0, 5) as product (product.itemId)}
        <a
          href={product.offerLink}
          target="_blank"
          rel="noopener noreferrer"
          class="glassmorphism-card group"
        >
          <div class="relative aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.imageUrl}
              alt={product.productName}
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {#if product.priceDiscountRate > 0}
              <div class="absolute top-2 right-2 glassmorphism-badge">
                -{product.priceDiscountRate}%
              </div>
            {/if}
          </div>
          
          <div class="p-4 glassmorphism-content">
            <p class="text-white/90 text-sm line-clamp-2 min-h-[2.5rem] mb-2">
              {product.productName}
            </p>
            
            <div class="flex items-center justify-between">
              <div>
                <p class="text-pink-400/90 font-bold">
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </p>
                {#if product.ratingStar !== "0"}
                  <div class="flex items-center text-xs text-yellow-400/90">
                    <span>★</span>
                    <span class="ml-1">{product.ratingStar}</span>
                  </div>
                {/if}
              </div>
              
              <button class="glassmorphism-buy-button">
                Comprar
              </button>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .glassmorphism-container {
    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .glassmorphism-button {
    @apply p-3 rounded-full transition-all duration-300;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glassmorphism-button:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  .glassmorphism-indicator {
    @apply w-2 h-2 rounded-full transition-all duration-300;
    background: rgba(255, 255, 255, 0.2);
  }

  .glassmorphism-indicator.active {
    @apply w-8;
    background: rgba(236, 72, 153, 0.6);
    box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
  }

  .glassmorphism-card {
    @apply rounded-xl overflow-hidden transition-all duration-300;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(4px);
  }

  .glassmorphism-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  .glassmorphism-content {
    background: linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
  }

  .glassmorphism-badge {
    @apply px-3 py-1 text-xs font-bold rounded-full;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 8px rgba(147, 51, 234, 0.4);
  }

  .glassmorphism-buy-button {
    @apply px-4 py-2 rounded-full text-white transition-all duration-300 text-sm font-medium;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8));
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 10px rgba(147, 51, 234, 0.3);
  }

  .glassmorphism-buy-button:hover {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9));
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4);
  }

  .glassmorphism-buy-button:active {
    transform: translateY(0);
  }

  .glassmorphism-overlay {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
  }

  .glassmorphism-text {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Estilo atualizado para os botões de navegação */
  .navigation-button {
    @apply p-4 rounded-full transition-all duration-300;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8));
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(147, 51, 234, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
  }

  .navigation-button:hover {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9));
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.6),
                inset 0 2px 4px rgba(255, 255, 255, 0.4);
  }

  .navigation-button:active {
    transform: translateY(-50%) scale(0.95);
    background: linear-gradient(135deg, rgba(147, 51, 234, 1), rgba(236, 72, 153, 1));
  }

  /* Estilo atualizado para os indicadores */
  .indicator-button {
    @apply px-6 py-2 rounded-full transition-all duration-300;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.4));
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 10px rgba(147, 51, 234, 0.2);
  }

  .indicator-button:hover {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(236, 72, 153, 0.6));
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
  }

  .indicator-button.active {
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8));
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 20px rgba(147, 51, 234, 0.5),
                inset 0 2px 4px rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  .indicator-text {
    @apply text-sm font-medium text-white relative z-10;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Estilo atualizado para botões desabilitados */
  .navigation-button[disabled],
  .indicator-button[disabled] {
    background: rgba(107, 114, 128, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>
