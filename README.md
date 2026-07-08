# brianbishop.org

Static personal site for `brianbishop.org`: a public home for projects, apps, essays, photos, and experiments.

## Preview locally

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Publish

This site is plain HTML, CSS, JavaScript, and image assets, so it can be hosted by GitHub Pages, Netlify, Cloudflare Pages, Vercel, or any static web host.

For a custom domain, point the host at `brianbishop.org` and update DNS wherever the domain is registered. The exact DNS records depend on the host you choose.

### GitHub Pages plan

Recommended repository:

- Owner: `shigstamatic`
- Repository: `brianbishop.org`
- Visibility: public
- Pages source: deploy from the `main` branch
- Custom domain: `brianbishop.org`

This repository includes a `CNAME` file so GitHub Pages knows the site should publish at `brianbishop.org`.

## Public repo safety

If this site is hosted for free through GitHub Pages, assume the repository and its full commit history are public. Treat every committed file as something visitors, search engines, and future collaborators may be able to inspect.

Do not commit:

- API keys, access tokens, passwords, or private credentials
- `.env` files or local configuration containing secrets
- Private notes, source material, unpublished drafts, or personal documents
- Photos that still contain private EXIF metadata, precise location data, or other hidden metadata
- Private contact details, addresses, financial information, or sensitive personal records
- Generated exports, temporary files, caches, or local editor/system files

Before publishing or adding a new batch of content:

- Review `git status` before committing.
- Check new files for private information and accidental metadata.
- Keep drafts and private working notes outside this repository until they are ready to publish.
- Use `.gitignore` for local files that should never be tracked.
- If sensitive information is ever committed, assume it was exposed. Remove it, rotate any affected secret, and clean history only if necessary.
