# GitHub Pages Deployment Guide

This guide will help you deploy your AI Developer Portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
5. Make sure the repository is **public**
6. Don't initialize with README, .gitignore, or license (we already have these files)
7. Click "Create repository"

### 2. Upload Your Files

#### Option A: Using Git Command Line

```bash
# Navigate to your project folder
cd /path/to/your/portfolio

# Initialize Git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git push -u origin main
```

#### Option B: Using GitHub Web Interface

1. Go to your newly created repository
2. Click "uploading an existing file"
3. Drag and drop all your files (index.html, styles.css, script.js, README.md)
4. Add a commit message: "Initial portfolio commit"
5. Click "Commit changes"

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### 4. Access Your Website

- Your portfolio will be available at: `https://yourusername.github.io`
- It may take a few minutes for the site to be live
- You can check the deployment status in the "Actions" tab

## Customizing Your Portfolio

### Update Personal Information

1. **Contact Information**: Edit the contact section in `index.html`
2. **About Section**: Update the about text with your story
3. **Skills**: Modify the skills section with your actual skills
4. **Projects**: Replace placeholder projects with your real projects
5. **Social Links**: Update social media links

### Example Customizations

```html
<!-- Update contact information -->
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your.email@example.com</span>
</div>

<!-- Update social links -->
<a href="https://github.com/yourusername" class="social-link">
    <i class="fab fa-github"></i>
</a>
```

### Adding Your Photo

1. Add your photo to the project folder
2. Update the about section in `index.html`:

```html
<div class="about-image">
    <img src="your-photo.jpg" alt="Your Name" class="profile-photo">
</div>
```

3. Add CSS for the photo:

```css
.profile-photo {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}
```

## Updating Your Portfolio

To update your portfolio:

```bash
# Make your changes to the files
# Then commit and push

git add .
git commit -m "Update portfolio content"
git push origin main
```

Your changes will be automatically deployed to GitHub Pages.

## Troubleshooting

### Site Not Loading
- Check that your repository is public
- Verify the repository name is exactly `yourusername.github.io`
- Wait a few minutes for deployment to complete

### Changes Not Showing
- Clear your browser cache
- Check the GitHub Actions tab for deployment status
- Ensure all files are committed and pushed

### Custom Domain (Optional)
1. Add a `CNAME` file to your repository with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Best Practices

1. **Keep it Updated**: Regularly update your projects and skills
2. **Mobile First**: Test on different devices
3. **Performance**: Optimize images and minimize file sizes
4. **SEO**: Add meta descriptions and keywords
5. **Analytics**: Consider adding Google Analytics

## Support

If you encounter any issues:
- Check GitHub's documentation on Pages
- Look for error messages in the Actions tab
- Ensure all file paths are correct
- Verify HTML/CSS syntax

Your AI Developer Portfolio is now ready to showcase your skills to the world! 🚀
