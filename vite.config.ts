import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const ALIAS_PATHS = [
  'app',
  'pages',
  'widgets',
  'features',
  'entities',
  'shared',
]

export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: ALIAS_PATHS.map((path) => {
        return {
          find: `@${path}`,
          replacement: resolve(__dirname, `src/${path}`),
        }
      }),
    }),
  ],
})
