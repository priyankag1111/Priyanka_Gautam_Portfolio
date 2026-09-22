# Priyanka Gautam Portfolio

A static HTML, CSS, and JavaScript portfolio site. It is designed to deploy directly to GitHub Pages with no build step.

## Local preview

Run a local server from this folder:

```powershell
python -m http.server 4173
```

Open http://localhost:4173/index.html.

## Publish to GitHub Pages

1. Create an empty GitHub repository named `portfolio`.
2. Set the repository's Pages source to **GitHub Actions**.
3. Connect this folder to the repository and push the `main` branch:

```powershell
git init
git add .
git commit -m "Create portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

The workflow in `.github/workflows/deploy-pages.yml` publishes every future push to `main`. GitHub will show the live URL in the repository's **Actions** or **Settings > Pages** area.

## Content updates

- Add projects and journal entries in `js/data.js`.
- Update the personal introduction and experience in `index.html` and `about.html`.
- Replace the remote image URLs in `js/data.js` and the page files with your own hosted images when ready.
