import { injectAnalytics } from '@vercel/analytics/sveltekit';

// If you have other hooks, you can include them in the sequence
export const handle = injectAnalytics();

// Optional: Add error handling
export const handleError = handleErrorWithSentry(); 