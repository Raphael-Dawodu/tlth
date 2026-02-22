# Learning Tree House

Small Node/Express static site serving `public/`.

Quick start

```bash
npm install
npm start
```

What I added (SEO & performance):
- Title, meta description, canonical, Open Graph & Twitter tags
- JSON-LD structured data
- `robots.txt` and `sitemap.xml`
- Gzip compression and static asset caching in `server.js`

To push to GitHub

1. Initialize local git and commit:

```bash
git init
git add .
git commit -m "Initial commit: site + SEO improvements"
```

2a. If you already created an empty GitHub repo, add remote and push:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

2b. If you want me to create the remote repo for you, provide a GitHub personal access token (repo scope) and the desired repo name, and I can create it and push (you can also run the commands yourself if preferred).
