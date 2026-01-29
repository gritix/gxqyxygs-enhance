#!/usr/bin/env node
/* eslint-disable regexp/no-unused-capturing-group */
/* eslint-disable regexp/strict */
/* eslint-disable regexp/no-useless-escape */
/* eslint-disable no-cond-assign */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const modulesDir = path.join(__dirname, '../src/modules')
const moduleNames = fs.readdirSync(modulesDir).filter(name => name !== 'index.ts')
const descriptions = {}

for (const moduleName of moduleNames) {
  const moduleIndexPath = path.join(modulesDir, moduleName, 'index.ts')
  if (!fs.existsSync(moduleIndexPath)) {
    continue
  }
  const content = fs.readFileSync(moduleIndexPath, 'utf-8')
  const exportMatch = content.match(/export default\s+(\w+)/)
  if (!exportMatch) {
    continue
  }
  const itemName = exportMatch[1]
  const arrayMatch = content.match(new RegExp(`const\\s+${itemName}:\\s*Item\\[\\]\\s*=\\s*\\[([\\s\\S]*?)\\n\\]`))
  if (!arrayMatch) {
    continue
  }
  const arrayContent = arrayMatch[0]
  const itemPattern = /\{\s*name:\s*['\"`]([^'\"`]+)['\"`],\s*id:\s*['\"`]([^'\"`]+)['\"`],\s*description:\s*\[([\s\S]*?)\]/g
  let match
  const moduleItems = []

  while ((match = itemPattern.exec(arrayContent)) !== null) {
    const name = match[1]
    const descContent = match[3]
    const descStrings = descContent.match(/['\"`]([^'\"`]+)['\"`]/g)
    const descriptionsList = descStrings ? descStrings.map(s => s.replace(/^[ '\"`]|[ '\"`]$/g, '')) : []

    moduleItems.push({ name, description: descriptionsList })
  }

  if (moduleItems.length > 0) {
    descriptions[moduleName] = moduleItems
  }
}

const outputPath = path.join(__dirname, '../src/descriptions.json')
fs.writeFileSync(outputPath, JSON.stringify(descriptions, null, 2), 'utf-8')
