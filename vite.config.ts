import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts()],
  base: `/table-of-people/`,
  define: {
    PROJECT_NAME: JSON.stringify(process.env.npm_package_name),
  },
});
