# NotionNext 使用说明（用户教程）

本目录为 **部署者与站长** 操作手册，在仓库内持续维护（对齐主线 **4.9.5.2**）。  
**在线站**：[notionnext.tangly1024.com](https://notionnext.tangly1024.com) · 历史 Notion 版：[docs.tangly1024.com](https://docs.tangly1024.com/about)

> **维护者**：[维护工作流](./MAINTENANCE_WORKFLOW.md) · 策略：[DOCUMENTATION_POLICY.md](../DOCUMENTATION_POLICY.md) · 索引：[ARTICLE_INDEX.md](./ARTICLE_INDEX.md) · 迁移：[MIGRATION_STATUS.md](./MIGRATION_STATUS.md)

## 快速开始

1. [介绍与建站理由](./intro.md)  
2. [Vercel 部署](./deploy-vercel.md)  
3. [Notion 数据库与写作](./notion-database.md)  
4. [站点配置](./config-site.md) · [基础功能总览](./config/site-basics.md)  
5. [菜单 Menu / SubMenu](./menu-secondary.md)  
6. [升级教程](./update.md)

## 参考手册（4.9.x，推荐收藏）

| 文档 | 内容 |
| --- | --- |
| [reference/README.md](./reference/README.md) | 参考入口 |
| [reference/features.md](./reference/features.md) | 全站 `conf/*.config.js` 配置索引 |
| [reference/notion-4x.md](./reference/notion-4x.md) | NOTION_INDEX、TOP_TAG、密码、评论 Hide 等 |
| [themes/THEMES_CATALOG.md](./themes/THEMES_CATALOG.md) | **25 个内置主题** 全表与选型 |

## 按栏目浏览

### 部署

- [部署索引](./deploy/README.md) · 根目录 [DEPLOYMENT.md](../../DEPLOYMENT.md)  
- [Vercel 自定义域名](./deploy/vercel-domain.md) · [静态导出](./deploy/vercel-static.md)  
- [Netlify](./deploy/netlify.md) · [Cloudflare Pages](./deploy/cloudflare-pages.md)  
- [VPS / Docker](./deploy/vps.md)  
- [域名加速](./deploy/vercel-accelerate.md) · [Redeploy](./deploy/vercel-redeploy.md)

### Notion

- [快捷键](./notion/short-keys.md) · [Notion-faster](./notion/faster.md)  
- [Notion 4.x 参考](./reference/notion-4x.md)

### 配置扩展

- [URL 自定义](./config/url-customize.md) · [Algolia 搜索](./config/algolia.md)

### 主题

- [主题总览](./themes/overview.md) · **[25 个主题说明目录](./developer/themes/README.md)** · [选型全表](./themes/THEMES_CATALOG.md)  
- 示例：[Simple](./themes/simple.md) · [Hexo](./themes/hexo.md) · [Proxio](./themes/proxio.md) · [HEO](./themes/heo.md)

### 统计 · 评论 · 插件

- [统计总览](./analytics/overview.md)  
- [评论总览](./comments/overview.md)  
- [外部插件](./plugins/overview.md) · [音乐播放器](./plugins/music-player.md)

### 开发与运营

- [开发入门](./development/getting-started.md)（详见 [GETTING_STARTED.md](../developer/GETTING_STARTED.md)）  
- [运行原理](./development/architecture.md) · [SEO](./operations/seo.md)

### 帮助 · 社区 · 更新

- [**参与社区**](./community-participate.md) · [反馈与守则](./help/feedback.md) · [社群](./help/community.md) · [支持项目](./help/support.md)  
- [最新版本](./changelog/latest.md) · [V4 历史索引](./changelog/v4-history.md)

## 其它

- [参与社区](./community-participate.md) · [项目治理](../../GOVERNANCE.zh-CN.md) · [维护者名单](../../MAINTAINERS.md)  
- [参与维护在线文档](./maintain-docs.md) · [GitHub docs 目录](https://github.com/notionnext-org/NotionNext/tree/main/docs)  
- [Notion 建站模板](https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5)  
- [VitePress 静态站](./WEBSITE.md) · [Cloudflare 部署](./deploy/cloudflare-pages-docs.md)  
- **开发者文档**（仅 GitHub）：[docs/README.md](https://github.com/notionnext-org/NotionNext/blob/main/docs/README.md)
