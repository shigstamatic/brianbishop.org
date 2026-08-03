# Content Guide

This guide defines how public content is added to `brianbishop.org`.

The goal is a workflow that stays simple: put a post folder in `content/`, add a `post.md`, include any public media assets nearby, and let Codex help turn that material into the live site.

## Folder naming

Use this pattern:

```text
YYYY-MM-DD-type-primary_label
```

Examples:

```text
2026-07-09-physical-katy_manor
2026-08-02-digital-map_tool
2026-08-14-notes-reading_list
2026-09-01-photos-workshop
2026-09-12-ephemera-links
```

Rules:

- Date is the intended publish date.
- `type` is lowercase and must match one of the allowed top-level content types.
- `primary_label` should be short, lowercase, and use underscores between words.
- Prefer stable project or series labels over one-off descriptions.

## Top-level content types

Allowed `type` values:

- `physical`: physical projects, places, builds, repairs, materials, objects
- `digital`: apps, tools, prototypes, software experiments, data projects
- `notes`: essays, decision logs, research notes, explanations, process writing
- `photos`: photo-forward posts, galleries, visual studies
- `ephemera`: links, scraps, small observations, short-lived items

These map to the public site labels:

- `Physical`
- `Digital`
- `Notes`
- `Photos`
- `Ephemera`

## Required files

Every post folder must include:

```text
post.md
```

The post folder can include additional subfolders as needed:

```text
images/
video/
audio/
files/
references/
```

These subfolders are optional. Only add them when the post needs them.

## Required front matter

Each `post.md` starts with YAML front matter:

```markdown
---
title: "Post title"
date: "2026-07-09"
type: "physical"
primary_label: "Katy Manor"
labels:
  - "Katy Manor"
status: "draft"
summary: "One or two sentences describing the post."
---
```

Required fields:

- `title`
- `date`
- `type`
- `primary_label`
- `labels`
- `status`
- `summary`

Allowed `status` values:

- `draft`
- `ready`
- `published`
- `archived`

## Optional front matter

Use these only when helpful:

```yaml
hero_image: "images/01-hero.webp"
updated: "2026-07-10"
location: "Public-safe location description"
canonical_url: "https://brianbishop.org/path"
related:
  - "2026-07-09-physical-katy_manor"
```

Do not include private addresses, precise location details, private contact details, or sensitive metadata.

## Media formats

Recommended image formats:

- `webp` for most web images
- `jpg` for photos when WebP is inconvenient
- `png` for screenshots, diagrams, transparency, or images with text

Recommended image sizes:

- Main post image: `1600px` on the long edge
- Inline image: `1200px` on the long edge
- Thumbnail/list image: `600-800px` on the long edge

Recommended video format:

- `mp4`, compressed for web

Keep original high-resolution media outside the public repository. Add public web exports to the repo.

Strip EXIF and private metadata before committing images or videos unless the metadata is intentionally public.

## Media naming

Use numbered, descriptive filenames:

```text
images/
  01-site-approach.webp
  02-foundation-layout.webp
  03-material-stack.webp
```

Use the numbers to communicate preferred order.

## Captions and references

For simple posts, put captions directly below the image reference:

```markdown
![Driveway approach](images/01-site-approach.webp)

Caption: First view of the site from the driveway.
```

For posts with many media assets, include a media section in `post.md`:

```markdown
## Media notes

- `images/01-site-approach.webp`
  - Alt: Driveway approach to the site.
  - Caption: First view of the site from the driveway.
  - Use: hero
- `images/02-foundation-layout.webp`
  - Alt: Foundation layout before the next pour.
  - Caption: Layout marks and forms before concrete work.
  - Use: inline
```

## Default published post structure

Published posts should use this general structure unless there is a reason to do something custom:

- Compact post title, not a landing-page-sized headline
- Comfortable left gutter on desktop
- Short narrative introduction
- Optional hero image when one image sets context for the post
- Thumbnail gallery for multiple images
- Click-to-enlarge behavior for gallery images
- Captions visible under thumbnails and repeated in the enlarged view

For photo-heavy posts, prefer smaller thumbnails on the page and a lightbox/enlarged view on click. This keeps the post readable while still letting the photos be inspected.

## Default image gallery and lightbox pattern

Posts with multiple images should use the shared gallery/lightbox framework by default.

Use this pattern when a post is primarily a photo album, photo log, build log, or any post where readers should browse images one at a time.

### Gallery behavior

The default image browsing behavior is:

- Thumbnail grid in the post body
- Visible caption below each thumbnail
- Click any thumbnail to open the image in a lightbox
- Caption repeated inside the lightbox, directly below the large image
- Previous and next controls below the image
- Current image counter, such as `2 / 19`
- Close button on the same control row
- Wraparound navigation at both ends
- Keyboard support for `ArrowLeft` and `ArrowRight`; native dialog close via `Escape`

### Gallery markup

Each gallery image should use a button with these attributes:

```html
<figure>
  <button
    class="gallery-thumb"
    type="button"
    data-lightbox-src="../../content/YYYY-MM-DD-type-label/images/01-example.webp"
    data-lightbox-caption="Short public caption for this image."
  >
    <img
      loading="lazy"
      src="../../content/YYYY-MM-DD-type-label/images/01-example.webp"
      alt="Specific alt text describing the image."
    >
  </button>
  <figcaption>Short public caption for this image.</figcaption>
</figure>
```

Rules:

- `data-lightbox-src` points to the full image to display in the lightbox.
- `data-lightbox-caption` is the source caption for that specific image.
- The visible `figcaption` should usually match `data-lightbox-caption`.
- The image `alt` text should describe the image for accessibility; it does not need to match the caption.
- Keep image order in source order. Numbered filenames should match that order.

### First gallery image

For the first visible gallery thumbnail, use eager loading and intrinsic dimensions:

```html
<link rel="preload" as="image" href="../../content/YYYY-MM-DD-type-label/images/01-example.webp" fetchpriority="high">
```

```html
<img
  loading="eager"
  fetchpriority="high"
  width="1600"
  height="1200"
  src="../../content/YYYY-MM-DD-type-label/images/01-example.webp"
  alt="Specific alt text describing the image."
>
```

Use the actual exported image dimensions for `width` and `height`. This keeps the first thumbnail stable while the page loads.

### Lightbox markup

Photo posts should include one shared lightbox dialog after the post content:

```html
<dialog class="lightbox" data-lightbox tabindex="-1">
  <div class="lightbox-frame">
    <img data-lightbox-image alt="">
  </div>
  <div class="lightbox-info">
    <p class="lightbox-caption" data-lightbox-caption-output></p>
  </div>
  <div class="lightbox-controls" aria-label="Photo navigation">
    <div class="lightbox-nav-group">
      <button class="lightbox-nav lightbox-prev" type="button" data-lightbox-prev aria-label="Previous image">‹</button>
      <p class="lightbox-count" data-lightbox-count></p>
      <button class="lightbox-nav lightbox-next" type="button" data-lightbox-next aria-label="Next image">›</button>
    </div>
    <button class="lightbox-close" type="button" data-lightbox-close>Close image</button>
  </div>
</dialog>
```

Important selector rule:

- Thumbnail buttons use `data-lightbox-caption` as source data.
- The lightbox output element uses `data-lightbox-caption-output`.
- Do not use `data-lightbox-caption` on the lightbox output element. The JavaScript depends on these being distinct so it does not accidentally overwrite a thumbnail.

### Hover behavior

Gallery thumbnails may change color, contrast, or saturation on hover, but should not shift position. Avoid hover transforms that move thumbnails up or down; the gallery should feel stable while browsing.

## Text modes

Use one of these modes when giving Codex content.

Exact text:

```markdown
<!-- MODE: exact -->

Use this paragraph exactly as written.
```

Draft from notes:

```markdown
<!-- MODE: draft-from-notes -->

- Main idea
- Important details
- Things to include
- Things not to overstate
```

Hybrid:

```markdown
<!-- MODE: preserve-quotes-draft-around -->

This sentence should stay exactly as written.

- Supporting points Codex can shape into prose
- Context to include
```

If no mode is specified, Codex should assume `draft-from-notes` and preserve any clearly marked exact text.

## Privacy checklist

Before committing content:

- Confirm all files are intended to be public.
- Strip private EXIF/location metadata.
- Remove private addresses, phone numbers, financial records, credentials, or personal documents.
- Keep unpublished private notes outside this repository.
- Review `git status` before committing.
