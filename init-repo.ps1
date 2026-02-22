# Run this script after installing Git locally
# Usage: open PowerShell in the project folder and run `./init-repo.ps1`

git init
git add .
git commit -m "Initial commit: site + SEO improvements"
git branch -M main

# If you already created a remote GitHub repo, uncomment and update the line below:
# git remote add origin https://github.com/<your-username>/<repo-name>.git
# git push -u origin main
