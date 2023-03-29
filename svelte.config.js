import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		// disable a11y onclick warning
		if (warning.code.startsWith('a11y-click-events-have-key-events')) return;
		handler(warning);
	},

	kit: {
		adapter: adapter({ out: 'bufe-app' })
	}
};

export default config;
