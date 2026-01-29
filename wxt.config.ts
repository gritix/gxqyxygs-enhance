import { defineConfig } from 'wxt'
import { getDescription } from './scripts/util'
import descriptions from './src/descriptions.json'

// See https://wxt.dev/api/config.html
export default defineConfig({
  entrypointsDir: 'src/entrypoints',
  publicDir: 'src/public',
  outDir: 'dist',
  outDirTemplate: '{{browser}}-mv{{manifestVersion}}',
  zip: {
    artifactTemplate: '{{name}}-{{version}}-{{browser}}-{{manifestVersion}}.zip',
    zipSources: false,
  },
  manifest: {
    name: '全国企业信用信息公示系统（广西）增强',
    description: `${getDescription(descriptions)}。`,
    homepage_url: 'https://github.com/gritix/gxqyxygs-enhance',
    update_url: 'https://github.com/gritix/gxqyxygs-enhance',
    author: { email: 'qq32vip@163.com' },
  },
})
