import { sequence } from '@sveltejs/kit/hooks';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

export const handle = sequence(injectAnalytics()); 