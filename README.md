# Formula Brewing Demo Website

A modern, fast, and clean demo website for Formula Brewing with real-time Google Sheets integration for beer data.

## Features

- **Fast & Lightweight**: Pure HTML, CSS, and JavaScript - no framework overhead
- **Real-time Updates**: Pulls beer data from Google Sheets automatically
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Free Hosting**: Can be deployed on GitHub Pages, Netlify, or any static hosting
- **Auto-refresh**: Updates beer data every 5 minutes

## Quick Start

1. **Install dependencies** (optional - for development server):
   ```bash
   npm install
   ```

2. **Run locally**:
   ```bash
   npm run dev
   ```
   Or simply open `index.html` in your browser.

3. **Deploy**: Upload all files to any static hosting service.

## Google Sheets Integration

### Setup Instructions

1. **Create a Google Sheet** with the following columns:
   - Column A: Beer Name
   - Column B: Beer Type
   - Column C: ABV
   - Column D: IBU
   - Column E: Status (available/limited/out)
   - Column F: Description

2. **Get your Google Sheets ID**:
   - Open your Google Sheet
   - Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`

3. **Get a Google API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create credentials (API Key)
   - Restrict the API key to Google Sheets API only

4. **Configure the website**:
   - Open `script.js`
   - Replace `YOUR_GOOGLE_SHEETS_ID` (or `unknown`) with your actual sheet ID
   - Replace `YOUR_GOOGLE_API_KEY` (or `unknown`) with your API key

### Example Google Sheet Format

| Beer Name | Beer Type | ABV | IBU | Status | Description |
|-----------|-----------|-----|-----|--------|-------------|
| Formula IPA | India Pale Ale | 6.5% | 65 | available | A bold, hop-forward IPA with citrus and pine notes. |
| Golden Lager | Czech Pilsner | 4.8% | 35 | available | A crisp, clean lager with subtle hop character. |
| Stout Porter | Dark Ale | 5.2% | 28 | limited | Rich and roasty with notes of coffee and chocolate. |

## Customization

### Colors
The website uses a gold accent color (`#d4af37`). You can change this in `styles.css` by replacing all instances of this color.

### Images
Replace the placeholder images in the `assets/` folder:
- `logo.png` - Your brewery logo
- `hero-brewery.jpg` - Hero section background
- `about-brewery.jpg` - About section image

### Content
Edit the content in `index.html` to match your brewery's information:
- Update contact information
- Modify the about section text
- Change social media links

## Deployment Options

### GitHub Pages (Free)
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify (Free)
1. Drag and drop your project folder to [netlify.com](https://netlify.com)
2. Your site will be live instantly
3. Get a custom domain or use the provided Netlify URL

### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## Performance Features

- **Static Generation**: No server-side processing
- **Minimal Dependencies**: Only uses live-server for development
- **Optimized Images**: Use WebP format for better performance
- **Lazy Loading**: Images load as needed
- **Caching**: Browser caching for static assets

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use and modify as needed.

## Support

For questions about the Google Sheets integration or deployment, check the documentation above or contact the developer. 