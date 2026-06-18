#!/usr/bin/env pwsh
Set-StrictMode -Version Latest

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Amandevss/HIREGENIE.git
git push -u origin main
