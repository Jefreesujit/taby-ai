import { build } from 'esbuild';
import copy from 'esbuild-plugin-copy';
import postcss from '@chialab/esbuild-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// index.jsx

build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  target: ['chrome88', 'firefox109'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  loader: {
    '.jsx': 'jsx',
    '.js': 'js',
    '.css': 'css',
  },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  outfile: 'dist/bundle.js',
  plugins: [
    postcss({
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    }),
    copy({
      resolveFrom: 'cwd',
      assets: [
        { from: './src/manifest.json', to: './dist' },
        { from: './src/background.js', to: './dist' },
        { from: './public/**/*', to: './dist' },
      ]
    })
  ],
}).catch(() => process.exit(1));

// options.jsx

build({
  entryPoints: ['src/options.jsx'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  target: ['chrome88', 'firefox109'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  loader: {
    '.jsx': 'jsx',
    '.js': 'js',
    '.css': 'css',
  },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  outfile: 'dist/options.js',
  plugins: [
    postcss({
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    })
  ],
});

// background.js

build({
  entryPoints: ['src/content.js'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  target: ['chrome88', 'firefox109'],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  loader: {
    '.js': 'js',
  },
  outfile: 'dist/content.js'
});
