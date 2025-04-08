# Enterprise Features for Car Marketplace

As a GitHub Enterprise free trial user under Horizon Films, you have access to enhanced features that can improve your Car Marketplace application deployment. This document outlines Enterprise-specific features you can leverage.

## Private Repository GitHub Pages

Unlike standard GitHub accounts where public repositories are required for GitHub Pages, your Enterprise account allows deploying GitHub Pages from private repositories.

### Benefits:
- Keep your source code private
- Still deliver a public website
- Control who can contribute to the codebase

## Enhanced Security Features

Enterprise accounts provide advanced security features:

1. **Code scanning alerts**: Automatically detect vulnerabilities in your code
2. **Secret scanning**: Get notified if credentials or tokens are accidentally committed
3. **Dependency review**: Check for vulnerable dependencies during PR review

## Implementing Enterprise SSO (if configured)

If Horizon Films has configured SAML SSO:

1. You'll need to authenticate through your company's identity provider
2. Personal access tokens will need SSO authorization
3. Access to repositories will be managed centrally

## Enterprise Deployment Options

With Enterprise, you have access to:

1. **GitHub Actions with higher minutes quota**: More build minutes for complex CI/CD
2. **Environment protection rules**: Add approval workflows before deploying
3. **Advanced audit logs**: Track who makes changes to deployment settings

## Post-Trial Planning

To maintain your GitHub Pages deployment after your Enterprise trial ends:

1. **Option 1**: Upgrade to GitHub Enterprise (talk to your account manager)
2. **Option 2**: Move to GitHub Teams plan ($4/user/month)
3. **Option 3**: Make repository public and use standard GitHub Pages

## Recommendations for Horizon Films

Based on Enterprise features:

1. Set up branch protection rules on main branch
2. Configure required reviews before merging
3. Use environment protection for production deployments
4. Set up custom domain with HTTPS enforcement

Remember to document these Enterprise-specific configurations for your team members at Horizon Films.
