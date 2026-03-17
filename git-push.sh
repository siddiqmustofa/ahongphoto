#!/bin/bash

echo "🚀 GlowBox - Git Push to GitHub"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git not initialized. Run: git init"
    exit 1
fi

# Check for changes
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No changes to commit"
else
    echo "📝 Committing changes..."
    git add -A
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Get GitHub repository URL from user
if [ -z "$1" ]; then
    echo ""
    echo "Usage: ./git-push.sh <github-repo-url>"
    echo ""
    echo "Example:"
    echo "  ./git-push.sh https://github.com/username/glowbox.git"
    echo ""
    echo "Or set remote manually:"
    echo "  git remote add origin https://github.com/username/glowbox.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
    exit 1
fi

REPO_URL=$1

# Add remote if not exists
if ! git remote | grep -q 'origin'; then
    echo "Adding remote origin..."
    git remote add origin $REPO_URL
else
    echo "Remote origin already exists"
fi

# Set main branch
git branch -M main

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "Repository: $REPO_URL"
    echo ""
else
    echo ""
    echo "❌ Push failed. You may need to:"
    echo "  1. Create the repository on GitHub first"
    echo "  2. Authenticate with GitHub (use personal access token)"
    echo "  3. Check your internet connection"
    echo ""
    echo "Manual push command:"
    echo "  git push -u origin main"
fi
