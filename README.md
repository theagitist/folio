# folio

A tiny, dependency-free web reader for zines. Turn a PDF into page images once, drop one `<div>` on a page, and people can flip through the zine in the browser instead of only downloading it.

- Cover on its own, then facing two-page spreads, like the printed booklet
- One page at a time on narrow screens
- Arrow keys, tap either half of the page, or swipe
- Full-screen button
- Shareable links to a page (`#vol1-12`) when the reader has an `id`
- Under 6 KB of plain JavaScript and CSS (about 2.5 KB gzipped), no build step

In use on [polivoxia.ca](https://polivoxia.ca/the_somatic_ghost/).

## Why images and not the PDF?

Rendering pages ahead of time keeps the reader small and fast, and the zine looks exactly as designed on every device, with no PDF engine shipped to the browser. Keep the PDF as a download alongside it.

## 1. Render the pages

Needs `poppler-utils` (`pdftoppm`, `pdfinfo`) and `webp` (`cwebp`).

```sh
./folio-render zine.pdf read/zine          # 150 dpi, WebP quality 80
./folio-render zine.pdf read/zine 200 85   # sharper, heavier
```

This writes `read/zine/1.webp`, `2.webp`, ... and prints a ready-to-paste snippet with the page count and aspect ratio.

## 2. Add the reader

```html
<link rel="stylesheet" href="folio.css">

<div class="folio" id="zine"
     data-src="read/zine/{n}.webp"
     data-count="24"
     data-title="My Zine"
     style="--folio-ratio: 612 / 945.36">
  <noscript>The reader needs JavaScript. Download the PDF instead.</noscript>
</div>

<script src="folio.js" defer></script>
```

| Attribute | Meaning |
|---|---|
| `data-src` | Page URL pattern; `{n}` becomes the page number |
| `data-count` | Number of pages |
| `data-title` | Used for the region label and image alt text |
| `id` | Optional; enables page links like `#zine-7` |

Every `.folio` element on the page is mounted automatically. Several readers on one page work fine.

## Styling

The controls inherit the surrounding font and colour. Tune with plain CSS:

```css
.folio { --folio-page-bg: #fbf7ec; }          /* placeholder while a page loads */
.folio-bar { font-family: "Courier Prime", monospace; }
```

`--folio-ratio` sets the page shape (width / height) so the layout doesn't jump while images load.

## Accessibility

Each page image gets alt text with its number, the counter is announced on page turns, and the reader is keyboard focusable. Page images can't carry the zine's text, so link the PDF (or a text version) next to the reader.

## Test

```sh
node test.js
```

## License

MIT, see [LICENSE](LICENSE).
