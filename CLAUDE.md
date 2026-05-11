# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # dev server at localhost:4321
npm run build     # production build to ./dist/
npm run preview   # preview production build locally
npm run astro check  # TypeScript type checking
```

There is no test suite.

## Stack

- **Astro** with MDX, sitemap, React, and Vercel adapter
- **KaTeX** for math (remark-math + rehype-katex); KaTeX CSS loaded from CDN in `BlogPost.astro`
- **Shiki** for syntax highlighting, theme `synthwave-84`, with `transformerMetaHighlight` and `transformerNotationDiff`
- Deployed to **Vercel**

## Architecture

### Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx`. The collection schema (`src/content.config.ts`) requires:

```
title: string
description: string
pubDate: date
updatedDate?: date      # optional
heroImage?: image()     # optional, processed by Astro's Image pipeline
tags?: string[]         # optional, used for filtering on the blog index
```

Pages route via `src/pages/blog/[...slug].astro` using `getCollection('blog')` + `render()`. The slug page computes each post's chronological entry number (01, 02, ...) and passes `older`/`newer` neighbors to `BlogPost.astro` for prev/next navigation.

### Theming

The theme system uses a single layer of semantic CSS variables (no separate brand tokens):

- **Core tokens**: `--paper`, `--ink`, `--ink-soft`, `--muted`, `--accent`, `--accent-soft`, `--rule`, `--rule-soft`, `--paper-tint`
- **Layout tokens**: `--maxw` (1080px), `--gutter` (responsive, ~56px)
- **Font tokens**: `--serif` (Spectral), `--mono` (IBM Plex Mono)

Dark mode is applied via `[data-theme="dark"]` on `<html>`. The default is **light (paper)** — `BaseHead.astro` has an inline `<script is:inline>` that sets `data-theme="light"` before paint unless the user previously chose `"dark"` (stored in `localStorage`). It also sets `data-nb-dark` on `<html>` (used by the theme toggle button CSS).

Always use the semantic CSS variables above rather than hardcoded colors.

### Design system — Lab Notebook

The UI uses a "Lab Notebook" aesthetic: warm cream paper, Spectral serif, IBM Plex Mono for meta/tags, dot-grid background, and marginalia sidebars.

Key CSS classes (all in `global.css`):

**Layout**
- `.nb-page` — max-width content container with horizontal padding
- `.nb-container` — same max-width but no vertical padding (used for header/footer)
- `.nb-rule` / `.nb-rule-soft` — thin horizontal hairlines

**Typography**
- `.nb-h1`, `.nb-h2` — heading styles
- `.nb-eyebrow` — mono uppercase label (11px, tracked)
- `.nb-lede` — intro paragraph style
- `.nb-italic` — italic accent text (uses `--accent` color)
- `.nb-prose` — prose body wrapper for posts and about page

**Grid layouts** (switch to single column below 720px)
- `.nb-hero` — home page: `180px 1fr`
- `.nb-blogindex-grid` — blog index: `180px 1fr`
- `.nb-post-grid` — post layout: `180px 1fr`
- `.nb-about-grid` — about page: `180px 1fr`

**Marginalia** (the 180px left column)
- `.nb-margin` — mono uppercase, muted color
- `.nb-margin-label` — accent-colored section label
- `.nb-margin-meta` — individual metadata line
- `.nb-margin-gap` — 18px vertical spacer
- `.nb-margin-filter` — clickable tag filter button (blog index)

**Entry rows** (blog index and home recent list)
- `.nb-entries` — `<ol>` container
- `.nb-entry` — 3-column grid: `48px 1fr 70px` (num, body, date)
- `.nb-entry-title` — uses stretched-link `::after` to make the whole row clickable
- `.nb-entry-num`, `.nb-entry-body`, `.nb-entry-desc`, `.nb-entry-date`, `.nb-entry-day`, `.nb-entry-mon`, `.nb-entry-yr`

**Post navigation**
- `.nb-back` — "← Back to index" link
- `.nb-post-meta` — mono meta line (date, author, tags)
- `.nb-postnav` — 2-column prev/next grid
- `.nb-link-title` — italic serif prev/next title link

**Tags**
- `.nb-tag` — mono uppercase pill with border
- `.nb-tag-row` — flex row of tags

### Site metadata

`src/consts.ts` exports `SITE_TITLE` and `SITE_DESCRIPTION`. Update these when changing the site's identity.

### Components

- `BaseHead.astro` — `<head>` contents: theme init script, Google Fonts link (Spectral + IBM Plex Mono), meta tags, OG tags
- `Header.astro` — star SVG brand mark, brand name + subtitle, mono nav links, social icons (inline SVG), pill theme toggle
- `Footer.astro` — mono copyright left, folio number right (derived from URL path)
- `BlogPost.astro` (layout) — post layout with marginalia (date, tags, citation) + article + prev/next nav; loads KaTeX CSS from CDN
- `FormattedDate.astro` — date formatting helper (still available but pages compute date parts directly)
- `HeaderLink.astro` — nav link with active-state (still available, not used in current header)

The `ResearchNote` component is CSS-only (`.research-note`, `.research-note-title`, `.research-note-body` in `global.css`) intended for use inside MDX posts.

### Fonts

Loaded from Google Fonts (no self-hosted fonts):
- **Spectral** — serif, used for body text and headings (`--serif`)
- **IBM Plex Mono** — monospace, used for all meta/tag/nav text (`--mono`)

### Writing style

- Never use "—" (em dash). Always prefer to use a comma or split into multiple sentences.
