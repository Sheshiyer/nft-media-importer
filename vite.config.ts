import { defineConfig, LibraryFormats } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Buffer } from 'buffer';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Common configuration
const commonConfig = {
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
      '@': resolve(__dirname, './src'),
      stream: 'stream-browserify',
      util: 'util',
      buffer: 'buffer'
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
  },
  publicDir: 'public',
  base: './',
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
};

// Development configuration
const devConfig = {
  ...commonConfig,
  define: {
    ...commonConfig.define,
    'process.env.NODE_ENV': '"development"'
  }
};

// Production library configuration
const prodConfig = {
  ...commonConfig,
  build: {
    ...commonConfig.build,
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
        exports: 'named' as const,
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    sourcemap: true,
    cssCodeSplit: false
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
