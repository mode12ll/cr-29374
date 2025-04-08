# GitHub Pages Setup Instructions

Follow these exact steps to push your car marketplace to GitHub Pages:

## One-time Setup

Run these commands in your terminal (Command Prompt, PowerShell, or Git Bash):

```bash
# 1. Navigate to your project directory
cd c:\Users\chill987\Desktop\car-marketplace

# 2. Initialize Git repository if not already done
git init

# 3. Add your GitHub repository as remote
git remote add origin https://github.com/mode12ll/cr-29374.git

# 4. Configure your identity (replace with your actual email and name)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# 5. Create and switch to main branch
git checkout -b main

# 6. Stage all files
git add .

# 7. Commit your files
git commit -m "Initial commit of Car Marketplace"

# 8. Push to GitHub
git push -u origin main
```

## After Pushing to GitHub

1. Go to your repository on GitHub: https://github.com/mode12ll/cr-29374
2. Click **Settings**
3. In the left sidebar, click **Pages**
4. Under **Source**, select either:
   - **Deploy from a branch** - Select "main" and "/ (root)"
   - **GitHub Actions** - The workflow is already in your repository

5. Wait a few minutes for the site to deploy
6. Your site will be live at: https://mode12ll.github.io/cr-29374/

## Making Updates

To update your website after making changes:

```bash
# 1. Stage your changes
git add .

# 2. Commit your changes
git commit -m "Description of your changes"

# 3. Push to GitHub
git push
```

The GitHub Actions workflow will automatically deploy your updates.
