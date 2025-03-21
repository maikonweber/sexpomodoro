import { writable } from 'svelte/store';

function createCartStore() {
    const { subscribe, set, update } = writable({
        items: [],
        total: 0,
        itemCount: 0
    });

    return {
        subscribe,
        addItem: (/** @type {{ id: any; }} */ product) => update(cart => {
            // @ts-ignore
            const existingItem = cart.items.find(item => item.id === product.id);
            
            if (existingItem) {
                // @ts-ignore
                existingItem.quantity += 1;
            } else {
                // @ts-ignore
                cart.items = [...cart.items, { ...product, quantity: 1 }];
            }
            
            // @ts-ignore
            cart.itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
            // @ts-ignore
            cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            
            return cart;
        }),
        removeItem: (/** @type {any} */ productId) => update(cart => {
            // @ts-ignore
            cart.items = cart.items.filter(item => item.id !== productId);
            // @ts-ignore
            cart.itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
            // @ts-ignore
            cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return cart;
        }),
        updateQuantity: (/** @type {any} */ productId, /** @type {any} */ quantity) => update(cart => {
            // @ts-ignore
            const item = cart.items.find(item => item.id === productId);
            if (item) {
                // @ts-ignore
                item.quantity = quantity;
                // @ts-ignore
                if (item.quantity <= 0) {
                    // @ts-ignore
                    cart.items = cart.items.filter(item => item.id !== productId);
                }
            }
            // @ts-ignore
            cart.itemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
            // @ts-ignore
            cart.total = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return cart;
        }),
        clearCart: () => set({ items: [], total: 0, itemCount: 0 })
    };
}

export const cart = createCartStore();