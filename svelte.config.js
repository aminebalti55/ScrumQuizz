import { svelte } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const config = {
  kit: {
    adapter: adapter(),
  },
  preprocess: [
    preprocess({
      postcss: true,
      typescript: {
        // options
      },
    }),
    svelte(),
  ],
};

export default config;
