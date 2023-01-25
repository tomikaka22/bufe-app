import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: 'bufe-app',
				description: 'Rendelj büféből a mobilodon, vedd át szünetben sorbanállás nélkül.',
				// eslint-disable-next-line camelcase
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'pwa-icon.svg',
						sizes: 'any'
					}
				]
			}
		})
	]
};

export default config;
