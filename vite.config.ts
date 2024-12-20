import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Buffer } from 'buffer';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Development configuration
const devConfig = {
  plugins: [
    react(),
    svgr()
  ],
  define: {
    global: 'globalThis',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
};

// Production library configuration
const prodConfig = {
  plugins: [
    react(),
    svgr()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'NFTMediaImporter',
      formats: ['es' as LibraryFormats],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        // Ensure proper exports for Framer plugin capabilities
        exports: 'named' as const,
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    sourcemap: true,
    cssCodeSplit: false,
    // Ensure proper handling of Framer plugin features
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
      exclude: [/node_modules\/(@framer|framer)/]
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
};

// Add Buffer polyfill
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return devConfig;
  }
  return prodConfig;
});
