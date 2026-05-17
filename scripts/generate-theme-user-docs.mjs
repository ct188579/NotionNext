/**
 * Generate docs/user-guide/themes/<id>.md for every built-in theme.
 * Run: node scripts/generate-theme-user-docs.mjs
 *
 * Themes with merged long-form docs (proxio, heo) use <!-- theme-config-table -->
 * markers; only the config table between markers is regenerated.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const themesDir = path.join(root, 'themes')
const outDir = path.join(root, 'docs/user-guide/themes')
const manifestPath = path.join(root, 'conf/themeSwitch.manifest.js')

/** 开发者向长篇在 docs/developer/themes/（不进在线站） */
const DEV_DEEP_DOCS = {
  claude: '../../developer/themes/CLAUDE.md',
  endspace: '../../developer/themes/ENDSPACE.md',
  fuwari: '../../developer/themes/FUWARI.md',
  thoughtlite: '../../developer/themes/THOUGHTLITE.md'
}

const manifestSrc = fs.readFileSync(manifestPath, 'utf8')
const manifest = {}
for (const m of manifestSrc.matchAll(/(\w+):\s*\{([^}]+)\}/g)) {
  const id = m[1]
  const body = m[2]
  const nameM = body.match(/name:\s*'([^']+)'/)
  const sumM = body.match(/summary:\s*'([^']+)'/)
  manifest[id] = { name: nameM?.[1], summary: sumM?.[1] }
}

const scenes = {
  simple: '个人文字博客、默认入门',
  hexo: '类 Hexo 双栏博客',
  heo: '模块化首页、通知与英雄区',
  gitbook: '技术文档、手册侧栏目录',
  next: '经典双栏 + 移动 TOC',
  medium: 'Medium 风阅读列表',
  matery: 'Material 卡片封面列表',
  nobelium: '极简博客',
  fukasawa: '多栏高密度信息',
  fuwari: '日系双栏、色板定制',
  typography: '排版优先、少干扰',
  nav: '导航站、链接聚合',
  plog: '图文轻博客',
  photo: '摄影相册、侧栏推荐',
  movie: '影视海报墙',
  game: '游戏像素风装饰',
  landing: '单页着陆分区',
  starter: '营销落地页区块',
  proxio: '作品集、SaaS 品牌站',
  commerce: '商品展示页',
  magzine: '杂志封面大图列表',
  claude: '文档风、GitHub 式首页',
  endspace: '工业风加载与侧栏',
  example: '新主题开发骨架',
  thoughtlite: '时间线首页、Latest 卡片'
}

function extractKeys(configPath) {
  const src = fs.readFileSync(configPath, 'utf8')
  const keys = []
  const re = /^\s*([A-Z][A-Z0-9_]+):/gm
  let km
  while ((km = re.exec(src)) !== null) keys.push(km[1])
  return [...new Set(keys)]
}

function extractComments(configPath) {
  const lines = fs.readFileSync(configPath, 'utf8').split('\n')
  const map = {}
  for (let i = 0; i < lines.length; i++) {
    const km = lines[i].match(/^\s*([A-Z][A-Z0-9_]+):/)
    if (!km) continue
    const key = km[1]
    const inline = lines[i].match(/\/\/\s*(.+)$/)
    if (inline) {
      map[key] = inline[1].trim()
      continue
    }
    if (i > 0) {
      const prev = lines[i - 1].match(/^\s*\/\/\s*(.+)$/)
      if (prev) map[key] = prev[1].trim()
    }
  }
  return map
}

function buildConfigTableBlock(id, keys, notes) {
  let block = '<!-- theme-config-table -->\n\n'
  block += '### 主要配置项\n\n'
  block += '| 配置键 | 说明 |\n| --- | --- |\n'
  const showKeys = keys.slice(0, 40)
  for (const k of showKeys) {
    const note = (notes[k] || '见 config.js').replace(/\|/g, '\\|')
    block += `| \`${k}\` | ${note} |\n`
  }
  if (keys.length > 40) {
    block += `\n共 **${keys.length}** 项，上表列出前 40 项，完整列表见 config.js。\n`
  }
  block += '\n<!-- /theme-config-table -->\n'
  return block
}

function patchConfigTable(filePath, tableBlock) {
  const src = fs.readFileSync(filePath, 'utf8')
  const start = '<!-- theme-config-table -->'
  const end = '<!-- /theme-config-table -->'
  if (!src.includes(start) || !src.includes(end)) {
    console.warn('skip patch (no markers):', filePath)
    return false
  }
  const re = new RegExp(
    `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
  )
  fs.writeFileSync(filePath, src.replace(re, tableBlock.trim()), 'utf8')
  return true
}

function buildFullDoc(id, title, summary, keys, notes) {
  let md = `# ${title} 主题\n\n`
  md += `> 主题 ID：\`${id}\` · 预览：[preview.tangly1024.com/?theme=${id}](https://preview.tangly1024.com/?theme=${id})\n\n`
  md += `## 简介\n\n${summary}\n\n`
  md += `## 适用场景\n\n${scenes[id] || '见 [主题全览](./THEMES_CATALOG.md) 选型表'}\n\n`
  md += '## 启用方式\n\n'
  md += `1. Notion Config 表：\`THEME\` = \`${id}\`\n`
  md += `2. 环境变量：\`NEXT_PUBLIC_THEME=${id}\`\n`
  md += '3. `blog.config.js` 的 `THEME`\n\n'

  const devLink = DEV_DEEP_DOCS[id]
  if (devLink) {
    md += '## 开发者深度文档\n\n'
    md += `实现细节、全局改动与架构说明见 [${title} 开发者文档](${devLink})（\`docs/developer/themes/\`，与本文站长向说明分工）。\n\n`
  }

  md += '## 配置说明\n\n'
  md += `配置文件：[\`themes/${id}/config.js\`](../../../themes/${id}/config.js)  \n`
  md += '也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。\n\n'
  md += buildConfigTableBlock(id, keys, notes)
  md += '\n## 相关\n\n'
  md += '- [内置主题全览](./THEMES_CATALOG.md)\n'
  md += '- [如何配置站点](../config-site.md)\n'
  md += '- [菜单 Menu / SubMenu](../menu-secondary.md)\n'
  return md
}

const ids = fs
  .readdirSync(themesDir)
  .filter(d => fs.existsSync(path.join(themesDir, d, 'config.js')))
  .sort()

for (const id of ids) {
  const cfgPath = path.join(themesDir, id, 'config.js')
  const keys = extractKeys(cfgPath)
  const notes = extractComments(cfgPath)
  const meta = manifest[id] || {}
  const title = meta.name || id.charAt(0).toUpperCase() + id.slice(1)
  const summary = meta.summary || scenes[id] || ''
  const outPath = path.join(outDir, `${id}.md`)
  const tableBlock = buildConfigTableBlock(id, keys, notes)

  if (fs.existsSync(outPath) && patchConfigTable(outPath, tableBlock)) {
    console.log('patched config table:', outPath, keys.length, 'keys')
    continue
  }

  fs.writeFileSync(outPath, buildFullDoc(id, title, summary, keys, notes), 'utf8')
  console.log('wrote', outPath, keys.length, 'keys')
}
