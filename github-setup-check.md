# GitHub Enterprise Free Trial Setup Verification

As you're using a GitHub Enterprise free trial account under Horizon Films, here are some specific things to check:

## 1. Verify Enterprise Account Access

1. Log in to GitHub and click on your profile picture in the top right
2. Check if you see "Your enterprises" in the dropdown menu
3. Verify that "Horizon Films" appears in your enterprise list

## 2. Confirm Repository Visibility Settings

With GitHub Enterprise, you have more flexibility with private repositories:

1. Go to your car-marketplace repository
2. Click on "Settings"
3. Under "General" tab, scroll to "Danger Zone"
4. Verify that your repository is set to **Private** (with Enterprise, you can use GitHub Pages with private repos)

## 3. Check GitHub Pages Configuration

1. While in repository Settings, go to "Pages" in the left sidebar
2. Confirm your source is set to "Deploy from a branch" (main branch, root folder)
3. If you don't see your site deployed, switch to "GitHub Actions" deployment method
4. Choose the "Static HTML" workflow template

## 4. Check Enterprise-Specific Features

With your Enterprise trial, you have access to:
- Advanced security features
- More Actions minutes
- Environment protection rules
- SAML SSO (if configured by an admin)

## 5. Enterprise Billing Verification

Check when your free trial ends:
1. Go to your Enterprise account dashboard
2. Click on "Settings" 
3. Go to "Billing and plans"
4. Note the trial end date to ensure your hosting isn't interrupted

## 6. Custom Domain Setup (Enterprise Feature)

Enterprise accounts have better support for custom domains:
1. In Pages settings, look for "Custom domain" section
2. You can add your own domain instead of using yourusername.github.io

Remember that after your Enterprise free trial ends, you may need to adjust your repository visibility settings to maintain GitHub Pages access unless you upgrade to a paid plan.
