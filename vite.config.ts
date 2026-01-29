import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import { getDescription } from './scripts/util'
import descriptions from './src/descriptions.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        'name': '全国企业信用信息公示系统（广西）增强',
        'icon': `data:image/png;base64,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`,
        'author': 'gritix',
        'version': `0.0.1`,
        'homepageURL': 'https://github.com/gritix/gxqyxygs-enhance',
        'supportURL': 'https://github.com/gritix/gxqyxygs-enhance',
        'description': `${getDescription(descriptions)}。`,
        'namespace': 'http://tampermonkey.net/',
        'match': [
          'https://gxqyxygs.scjdglj.gxzf.gov.cn:8443/*',
        ],
        'run-at': 'document-start',
      },
    }),
  ],
})
