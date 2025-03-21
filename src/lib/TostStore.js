// stores/toast.js
import { writable } from 'svelte/store';

function createToastStore() {
    const { subscribe, update } = writable([]);
    
    // @ts-ignore
    function addToast(message, type = 'success', duration = 3000) {
        const id = Math.random().toString(36).substring(2);
        const toast = { id, message, type, duration };
        
        // @ts-ignore
        update(toasts => [...toasts, toast]);
        
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }
    
    // @ts-ignore
    function removeToast(id) {
        // @ts-ignore
        update(toasts => toasts.filter(t => t.id !== id));
    }
    
    return {
        subscribe,
        // @ts-ignore
        success: (message, duration) => addToast(message, 'success', duration),
        // @ts-ignore
        error: (message, duration) => addToast(message, 'error', duration),
        // @ts-ignore
        info: (message, duration) => addToast(message, 'info', duration),
        // @ts-ignore
        warning: (message, duration) => addToast(message, 'warning', duration),
        remove: removeToast
    };
}

export const toasts = createToastStore();