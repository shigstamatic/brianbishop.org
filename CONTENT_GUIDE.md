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

