import { injectAnalytics } from '@vercel/analytics/sveltekit';

// Keep it simple with just the analytics injection
export const handle = injectAnalytics();

// Optional: Add error handling
// export const handleError = handleErrorWithSentry(); 


