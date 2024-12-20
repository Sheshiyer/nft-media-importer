import { Buffer } from 'buffer';

// Add Buffer polyfill
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

// Add process polyfill
if (typeof window !== 'undefined') {
  (window as any).process = {
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    },
  };
}

// Add require polyfill
if (typeof window !== 'undefined') {
  (window as any).require = function mockRequire() {
    return {
      resolve: () => '',
      cache: {},
      extensions: {},
      main: null,
      Module: class {},
      createRequire: () => mockRequire,
    };
  };
}

// Add module polyfill
if (typeof window !== 'undefined') {
  (window as any).module = {
    exports: {},
    require: (window as any).require,
  };
}
