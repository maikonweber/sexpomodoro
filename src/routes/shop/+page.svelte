<script lang="ts">
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';

  interface Product {
    productName: string;
    itemId: number;
    price: string;
    sales: number;
    imageUrl: string;
    shopName: string;
    offerLink: string;
    ratingStar: string;
    priceDiscountRate: number;
    // ... outros campos necessários ...
  }

  let products: Product[] = [];
  let loading = false;
  let currentPage = 1;
  const LIMIT = 20;
  let isMuted = false;
  let hoverSound: HTMLAudioElement;

  async function fetchOffers(page: number = 1) {
    loading = true;
    try {
      const response = await fetch(
        `https://dev.muttercorp.com.br/shopee-affiliate/offers?page=${page}&limit=${LIMIT}`,
        {
          headers: {
            'accept': '*/*'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar ofertas');
      }

      const data = await response.json();
      return data.data.productOfferV2.nodes;
    } catch (error) {
      console.error('Erro ao carregar ofertas:', error);
      return [];
    } finally {
      loading = false;
    }
  }

  // Função para carregar mais produtos
  async function loadMoreProducts() {
    const newProducts = await fetchOffers(currentPage);
    products = [...products, ...newProducts];
    currentPage++;
  }

  onMount(async () => {
    hoverSound = new Audio('../sounds/hover.mp3');
    await loadMoreProducts();
  });

  // Adicione um observador de interseção para carregar mais produtos
  let observer: IntersectionObserver;

  function setupIntersectionObserver(node: Element) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loading) {
          loadMoreProducts();
        }
      });
    });

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  function playSound(sound: HTMLAudioElement) {
    if (!isMuted && sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.error('Erro ao tocar som:', err));
    }
  }

  function formatPrice(price: string): string {
    return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
  }

  function formatSales(sales: number): string {
    if (sales >= 1000) {
      return `${(sales/1000).toFixed(1)}k`;
    }
    return sales.toString();
  }
</script>

<!-- Loading Spinner -->
{#if loading}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
  </div>
{/if}

<div class="min-h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md relative overflow-x-hidden">
  <Header />

  <!-- Botão de Som -->
  <button
    class="fixed top-20 right-2 md:top-24 md:right-4 z-50 glass-button-outline p-2 md:p-3 rounded-full"
    on:click={() => isMuted = !isMuted}
  >
    {#if isMuted}
      <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    {:else}
      <svg class="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 8v8m-5.536-6.464a5 5 0 010 7.072" />
      </svg>
    {/if}
  </button>

  <main class="max-w-6xl mx-auto px-2 md:px-4 pt-24 pb-24">
   
    <!-- Banner -->
    <div class="glass-container mb-8 overflow-hidden">
      <div class="relative overflow-hidden rounded-xl md:rounded-2xl">
        <img
          src="https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200"
          alt="Banner Promocional"
          class="w-full h-32 md:h-48 object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 backdrop-blur-sm"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">Produtos em Destaque</h2>
            <p class="text-sm md:text-lg text-white/90">Ofertas exclusivas para você</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Produtos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each products as product}
        <a
          href={product.offerLink}
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
          on:mouseenter={() => playSound(hoverSound)}
        >
          <div class="relative">
            <img
              src={product.imageUrl}
              alt={product.productName}
              class="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {#if product.priceDiscountRate > 0}
              <div class="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                -{product.priceDiscountRate}%
              </div>
            {/if}
          </div>
          
          <div class="p-4 bg-gradient-to-b from-transparent via-black/50 to-black/80">
            <h3 class="text-white font-medium text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.productName}
            </h3>
            
            <div class="flex items-center justify-between mb-2">
              <div>
                <p class="text-pink-400 font-bold text-lg">
                  {formatPrice(product.price)}
                </p>
                <div class="flex items-center gap-1 text-xs text-white/60">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {product.ratingStar}
                  </span>
                  <span>•</span>
                  <span>{formatSales(product.sales)} vendidos</span>
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <p class="text-white/60 text-xs truncate max-w-[70%]">
                {product.shopName}
              </p>
              <div 
                class="comprar-button px-4 py-1.5 rounded-full text-sm font-medium 
                bg-gradient-to-r from-pink-500 to-purple-500 
                text-white transform transition-all duration-300 
                hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] 
                active:scale-95 group-hover:animate-pulse flex items-center gap-2"
              >
                Comprar Agora
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Elemento observador para scroll infinito -->
    <div 
      class="h-10 mt-8"
      use:setupIntersectionObserver
    ></div>
  </main>
</div>

<style lang="postcss">
  .glass-card {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
  }

  .glass-card:hover {
    box-shadow: 0 0 50px rgba(236, 72, 153, 0.2);
  }

  .glass-button-outline {
    @apply border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300;
  }

  .glass-button-outline:hover {
    @apply border-white/40 bg-white/10;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .comprar-button {
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    box-shadow: 0 2px 10px rgba(236, 72, 153, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.2);
    position: relative;
    overflow: hidden;
  }

  .comprar-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.2),
      transparent
    );
    transition: 0.5s;
  }

  .comprar-button:hover::before {
    left: 100%;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }
</style>
