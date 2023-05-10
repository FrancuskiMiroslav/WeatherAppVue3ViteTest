import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		},
		preprocessorOptions: {
			scss: {
				additionalData: `
			  @import "@/assets/scss/abstracts/_vars.scss";
			  @import "@/assets/scss/abstracts/_mixins.scss";
			  @import "@/assets/scss/abstracts/_functions.scss";
			`,
			},
		},
	},
});
