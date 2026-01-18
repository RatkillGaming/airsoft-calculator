# 🚀 Setting Up This Project on GitHub

Follow these steps to upload your project to GitHub:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Name it: `airsoft-calculator` (or your preferred name)
5. Add a description: "My first Playwright project - Airsoft Calculator with E2E testing"
6. Choose **Public** (so others can see your work!)
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click **"Create repository"**

## Step 2: Initialize Git (if not already done)

Open your terminal in the project directory and run:

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
```

## Step 3: Add All Files

```bash
# Add all files to git
git add .

# Check what will be committed
git status
```

## Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Airsoft Calculator with Playwright tests"
```

## Step 5: Connect to GitHub

```bash
# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/airsoft-calculator.git

# Verify it was added
git remote -v
```

## Step 6: Push to GitHub

```bash
# Push to GitHub (first time)
git branch -M main
git push -u origin main
```

## Step 7: Update README

After pushing, update the clone URL in README.md:

1. Go to your repository on GitHub
2. Click the green **"Code"** button
3. Copy the HTTPS URL
4. Update line 20 in README.md with your actual repository URL

## Step 8: Add Topics/Tags

On your GitHub repository page:

1. Click the gear icon ⚙️ next to "About"
2. Add topics: `playwright`, `nextjs`, `typescript`, `testing`, `e2e-testing`, `airsoft`, `learning-project`

## Step 9: Add a Description

In the "About" section, add:
```
A modern Next.js app with comprehensive Playwright E2E tests. My first Playwright project!
```

## Step 10: Enable GitHub Actions (Optional)

The project includes a GitHub Actions workflow for CI/CD:

1. Go to **Actions** tab in your repository
2. The workflow will run automatically on push
3. You can see test results in the Actions tab

## 🎉 You're Done!

Your project is now on GitHub! Share it with:

- Friends learning Playwright
- Potential employers
- The Playwright community

## Next Steps

- Add screenshots to README.md
- Write a blog post about your experience
- Share on Twitter/LinkedIn
- Contribute to other Playwright projects!

## Troubleshooting

### If you get "repository not found":
- Check that you've added the correct remote URL
- Make sure the repository exists on GitHub
- Verify your GitHub credentials

### If you get authentication errors:
```bash
# Use GitHub CLI or set up SSH keys
# Or use Personal Access Token
```

### To update your repository later:
```bash
git add .
git commit -m "Your commit message"
git push
```

---

**Happy coding! 🚀**
