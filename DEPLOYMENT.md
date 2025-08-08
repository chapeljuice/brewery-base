# Formula Brewing Website - Deployment Guide

## Quick Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it `formula-brewing-website`
   - Make it public
   - Don't initialize with README

2. **Upload your files**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/formula-brewing-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click "Save"

4. **Your site will be live at**: `https://YOUR_USERNAME.github.io/formula-brewing-website`

### Option 2: Netlify (Free)

1. **Go to [netlify.com](https://netlify.com)**
2. **Drag and drop your project folder** to the deploy area
3. **Your site is live instantly** with a Netlify URL
4. **Optional**: Add a custom domain

### Option 3: Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live

## Google Sheets Setup

### Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Formula Brewing - Beer Data"
4. Import the `google-sheets-template.csv` file or copy the data manually

### Step 2: Get the Sheet ID

1. Look at your Google Sheet URL
2. Copy the ID: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
3. Save this ID for the next step

### Step 3: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
5. **Important**: Restrict the API key:
   - Click on the API key you just created
   - Under "Application restrictions" select "HTTP referrers"
   - Add your website domain
   - Under "API restrictions" select "Restrict key"
   - Select "Google Sheets API"
   - Click "Save"

### Step 4: Configure the Website

1. Open `script.js` in your project
2. Find these lines at the top:
   ```javascript
   const GOOGLE_SHEETS_ID = 'YOUR_GOOGLE_SHEETS_ID';
   const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
   ```
3. Replace with your actual values.

### Step 5: Test the Integration

1. Update your Google Sheet with new beer data
2. Refresh your website
3. The new data should appear automatically

## Customization

### Update Contact Information

Edit `index.html` and replace the placeholder contact info:

```html
<p><strong>Address:</strong> 123 Brewery Street, City, State 12345</p>
<p><strong>Phone:</strong> (555) 123-4567</p>
<p><strong>Email:</strong> info@formulabrewing.com</p>
```

### Add Your Images

1. Replace the placeholder images in the `assets/` folder:
   - `logo.png` - Your brewery logo
   - `hero-brewery.jpg` - Hero section image
   - `about-brewery.jpg` - About section image

### Change Colors

Edit `styles.css` and replace the gold color (`#d4af37`) with your brand colors.

## Troubleshooting

### Google Sheets Not Loading

1. Check that your API key is correct
2. Ensure Google Sheets API is enabled
3. Verify the sheet ID is correct
4. Check browser console for errors

### Images Not Showing

1. Make sure image files are in the `assets/` folder
2. Check file names match exactly (case-sensitive)
3. Verify image files are not corrupted

### Website Not Loading

1. Check that all files are uploaded
2. Verify `index.html` is in the root directory
3. Check for JavaScript errors in browser console

## Performance Tips

1. **Optimize images** before uploading
2. **Use WebP format** for better compression
3. **Minimize file sizes** for faster loading
4. **Test on mobile devices** to ensure responsiveness

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all setup steps were completed correctly
3. Test with the demo data first before connecting Google Sheets 