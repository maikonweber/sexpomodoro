<!-- components/Cart.svelte -->
<script>
    import { cart } from '../lib/cartStore';
    import { fly } from 'svelte/transition';
    import { Badge } from 'flowbite-svelte';
    
    let isOpen = false;
</script>

<div class="relative">
    <!-- Cart Button -->
    <button
        class="fixed right-4 bottom-4 p-4 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 z-50"
        on:click={() => isOpen = !isOpen}
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {#if $cart.itemCount > 0}
            <Badge color="red" class="absolute -top-2 -right-2">{$cart.itemCount}</Badge>
        {/if}
    </button>

    <!-- Cart Panel -->
    {#if isOpen}
        <div
            class="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-4"
            transition:fly={{ x: 400, duration: 300 }}
        >
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Carrinho</h2>
                <button
                    class="text-gray-500 hover:text-gray-700"
                    on:click={() => isOpen = false}
                >
                    ✕
                </button>
            </div>

            {#if $cart.items.length === 0}
                <p class="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
            {:else}
                <div class="space-y-4">
                    {#each $cart.items as item}
                        <div
                            class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                            transition:fly={{ y: 20, duration: 300 }}
                        >
                            <img
                                src={item.picture}
                                alt={item.title}
                                class="w-20 h-20 object-cover rounded"
                            />
                            <div class="flex-1">
                                <h3 class="font-semibold">{item.title}</h3>
                                <div class="flex items-center gap-2 mt-2">
                                    <button
                                        class="px-2 py-1 bg-pink-100 text-pink-700 rounded"
                                        on:click={() => cart.updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        class="px-2 py-1 bg-pink-100 text-pink-700 rounded"
                                        on:click={() => cart.updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                class="text-red-500 hover:text-red-700"
                                on:click={() => cart.removeItem(item.id)}
                            >
                                ✕
                            </button>
                        </div>
                    {/each}

                    <div class="border-t pt-4 mt-4">
                        <div class="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span>R$ {$cart.total.toFixed(2)}</span>
                        </div>
                        <button
                            class="w-full py-3 mt-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>