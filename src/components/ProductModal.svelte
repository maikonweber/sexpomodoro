<!-- components/ProductModal.svelte -->
<script>
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { toasts } from '../lib/TostStore';
    import { cart } from '../lib/cartStore';
    
    /**
	 * @type {{ images?: any; src?: any; title?: any; price?: any; description?: any; category?: any; id?: any; } | null}
	 */
     export let product = null;
    export let onClose = () => {};
    
    let quantity = 1;
    let selectedTab = 'description';
    let imageIndex = 0;
    
    $: images = product?.images || [product?.src];
    
    function handleAddToCart() {
        // @ts-ignore
        cart.addItem({ ...product, quantity });
        toasts.success('Produto adicionado ao carrinho!');
        onClose();
    }
    
    /**
	 * @param {{ key: string; }} e
	 */
    function handleKeydown(e) {
        if (e.key === 'Escape') onClose();
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if product}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    transition:fade={{ duration: 200 }}
    on:click={onClose}
>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl"
        transition:fly={{ y: 20, duration: 300, easing: quintOut }}
        on:click|stopPropagation
    >
        <!-- Close Button -->
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
            class="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
            on:click={onClose}
        >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>

        <div class="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
            <!-- Product Images -->
            <div class="space-y-4">
                <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={images[imageIndex]}
                        alt={product.title}
                        class="h-full w-full object-cover object-center"
                    />
                </div>
                
                {#if images.length > 1}
                    <div class="flex gap-2 overflow-x-auto">
                        {#each images as image, i}
                            <button
                                class="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2
                                    {i === imageIndex ? 'border-pink-500' : 'border-transparent'}"
                                on:click={() => imageIndex = i}
                            >
                                <img
                                    src={image}
                                    alt={`${product.title} - Imagem ${i + 1}`}
                                    class="h-full w-full object-cover"
                                />
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Product Info -->
            <div class="space-y-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900">{product.title}</h2>
                    <p class="mt-2 text-2xl font-semibold text-pink-600">
                        R$ {product.price?.toFixed(2) || '99.99'}
                    </p>
                </div>

                <!-- Tabs -->
                <div class="border-b border-gray-200">
                    <div class="flex gap-6">
                        <button
                            class="border-b-2 pb-2 text-sm font-medium
                                {selectedTab === 'description' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                            on:click={() => selectedTab = 'description'}
                        >
                            Descrição
                        </button>
                        <button
                            class="border-b-2 pb-2 text-sm font-medium
                                {selectedTab === 'details' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
                            on:click={() => selectedTab = 'details'}
                        >
                            Detalhes
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="min-h-[200px]">
                    {#if selectedTab === 'description'}
                        <p class="text-gray-600">
                            {product.description || 'Descrição detalhada do produto...'}
                        </p>
                    {:else}
                        <div class="space-y-4">
                            <div class="grid grid-cols-2 gap-4 text-sm">
                                <div class="font-medium text-gray-500">Categoria</div>
                                <div>{product.category || 'Geral'}</div>
                                <div class="font-medium text-gray-500">Formato</div>
                                <div>Digital</div>
                                <div class="font-medium text-gray-500">Acesso</div>
                                <div>Vitalício</div>
                                <div class="font-medium text-gray-500">Suporte</div>
                                <div>30 dias</div>
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Add to Cart -->
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-sm font-medium text-gray-700">Quantidade:</label>
                        <div class="flex items-center gap-2">
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                class="rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                                on:click={() => quantity = Math.max(1, quantity - 1)}
                            >
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                                </svg>
                            </button>
                            <span class="w-8 text-center">{quantity}</span>
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button
                                class="rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
                                on:click={() => quantity += 1}
                            >
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <button
                        class="w-full rounded-lg bg-pink-600 px-6 py-3 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        on:click={handleAddToCart}
                    >
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}