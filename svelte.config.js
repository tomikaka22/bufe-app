import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		// disable a11y warnings
		if (warning.code.startsWith('a11y')) return;

		handler(warning);
	},

	kit: {
		adapter: adapter({ out: 'bufe-app' }),
		serviceWorker: { register: false },
		version: { name: process.env.npm_package_version + ' ' + (new Date).toLocaleString('hu-HU').split('. ').join('').split(':').join('') }
	}

};

export default config;
