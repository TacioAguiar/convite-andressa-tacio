# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page wedding invitation site (Andressa & Tácio, 21/11/2026), in Portuguese (pt-BR). Static HTML/CSS/JS, no build step, no package.json, no dependencies to install.

## Running / previewing

No build or dev server tooling exists. Open [index.html](index.html) directly in a browser, or serve the directory with any static file server (e.g. `npx serve` or the VS Code Live Server extension) to avoid CORS/relative-path issues with fonts and the QR script.

There are no tests and no linter configured.

## Architecture

Everything is driven by one page:

- [index.html](index.html) — all markup and content, single file, sections are anchored `<section id="...">` blocks scrolled to via nav dots.
- [css/styles.css](css/styles.css) — **the actual stylesheet in use** (linked from index.html).
- [css/style.css](css/style.css) — leftover/unused file, NOT linked from index.html. Don't edit it expecting effect; confirm the `<link>` in index.html before touching CSS.
- [js/main.js](js/main.js) — all page behavior in one file, no modules/bundler. Key pieces:
  - Envelope intro screen (`openEnvelope()`) that reveals `#main-site` and kicks off countdown/nav/reveal-on-scroll/grid build.
  - Pix gift flow: `PIX_KEY`, `PIX_QR_CODE` (pre-built EMV payload string), `PIX_CHAVE` are hardcoded constants. `pixPayload()` builds a BR Pix EMV/TLV payload but is currently unused at runtime — the QR actually rendered uses the hardcoded `PIX_QR_CODE` string via the `qrcodejs` CDN library (loaded in index.html `<head>`).
  - `buildGrid()` renders the single gift card (`PRESENTE_PIX`) into `#presentes-grid`.
  - Countdown timer targets a hardcoded wedding date/time (`2026-11-21T18:00:00`).
  - Scroll-based nav dot highlighting and `IntersectionObserver`-based reveal animations, each with fallbacks for missing browser support.

Fonts: Google Fonts (Italiana, Alex Brush, Cinzel) loaded via `<link>` in index.html. There's a documented but unused path to swap in a paid "ALTA" font — see [fonts/README.md](fonts/README.md) and the font-face block at the top of [css/style.css](css/style.css) (note: that block lives in the *unused* stylesheet).

## Content notes

- All copy, dates, venue details, and Pix/payment info are real personal data belonging to the couple — treat as sensitive, don't invent or genericize it, and confirm with the user before changing factual details (dates, addresses, Pix key/CPF/bank).
- The `.cursor`, `.clinerules`, `.windsurf`, `.github/copilot-instructions.md`, `.opencode`, and `AGENTS.md` files in this repo all just configure a "caveman mode" response style for AI assistants — not project/architecture instructions.
