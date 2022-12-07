import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const config = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			scope: '/',
			manifest: {
				'name': 'bufe-app',
				'display': 'standalone',
				'id': 'bufe-app',
				'start_url': '/',
				'background_color': 'black',
				'icons': [
					{
						'src': 'pwa-icon.svg',
						'sizes': 'any'
					}
				],
				'description': 'Rendelj büféből a mobilodon, vedd át szünetben sorbanállás nélkül.'
			},			
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			}
		})
	]
};

export default config;
