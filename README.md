# ROSE — 3D Portfolio

A responsive, dark cinematic portfolio with:
- Interactive Three.js 3D centerpiece and particle field
- GSAP scroll reveals and motion
- Responsive mobile navigation
- Reduced-motion support
- Static hosting compatibility

## Preview locally

You need a local static server because `script.js` uses JavaScript modules.

### Option A: Python
```bash
python -m http.server 8000
```
Open `http://localhost:8000`.

### Option B: VS Code
Use the Live Server extension.

## Publish for free with Cloudflare Pages

1. Create a GitHub account and a new public repository named `rose-portfolio`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Sign in at https://dash.cloudflare.com/ and open **Workers & Pages**.
4. Choose **Create application → Pages → Connect to Git**.
5. Select the `rose-portfolio` repository.
6. For a plain static site, leave the build command empty and set the output directory to `/` if prompted. If the dashboard requires a build output directory, use the repository root (`/`).
7. Deploy. Cloudflare will assign a public `*.pages.dev` subdomain.

## Customize before publishing

- Replace `hello@rose.example` in `index.html` with a real contact email.
- Replace the project concept cards with real projects and links.
- Update the title and description in the `<head>`.
- The page uses Google Fonts and CDN-hosted Three.js/GSAP, so visitors need an internet connection for those assets.

## Domain note

Cloudflare Pages provides a free `pages.dev` subdomain. A custom registered domain such as `rose.com` normally requires purchasing/owning that domain and adding it to Cloudflare.
