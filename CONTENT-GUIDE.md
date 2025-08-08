# Formula Brewing - Content Management Guide

## 🎯 **Easy Content Updates - No Coding Required!**

The Formula Brewing website is designed to be **super easy** for non-technical users to update. Here are your options:

## 📊 **Option 1: Google Sheets (Recommended)**

### For Beer Data:
1. **Open your Google Sheet** (link provided in admin panel)
2. **Edit beer information** directly in the spreadsheet
3. **Save changes** - they appear on your website instantly!

### For Website Content:
1. **Use the Admin Panel** (`admin.html`)
2. **Fill out the forms** with your content
3. **Click "Save to Google Sheets"**
4. **Changes appear on your website automatically**

## 🖥️ **Option 2: Admin Panel (Easiest)**

### Access the Admin Panel:
1. Go to `yourwebsite.com/admin.html`
2. Use the tabbed interface to update different sections
3. Preview changes before saving
4. Export content as backup

### What You Can Update:
- ✅ **Hero Section**: Main headline, subtitle, button text
- ✅ **About Section**: Your brewery story and statistics
- ✅ **Contact Information**: Address, phone, email, hours
- ✅ **Beer Data**: All beer information through Google Sheets
- ✅ **Images**: Upload new photos to replace placeholders

## 📝 **Option 3: Simple Text Editing**

### For Quick Text Changes:
1. **Open `index.html`** in any text editor
2. **Find the text** you want to change
3. **Edit the text** between the HTML tags
4. **Save the file** and refresh your website

### Common Text Locations:
```html
<!-- Hero Section -->
<h1 class="hero-title">Formula Brewing</h1>
<p class="hero-subtitle">Crafting exceptional beers...</p>

<!-- About Section -->
<h2 class="section-title">About Formula Brewing</h2>
<p class="about-text">Your brewery story here...</p>

<!-- Contact Section -->
<p><strong>Address:</strong> Your address here</p>
<p><strong>Phone:</strong> Your phone number</p>
```

## 🖼️ **Updating Images**

### Required Images:
1. **`assets/logo.png`** - Your brewery logo
2. **`assets/hero-brewery.jpg`** - Hero section background
3. **`assets/about-brewery.jpg`** - About section image

### How to Replace Images:
1. **Prepare your images** with the correct names
2. **Upload them** to the `assets/` folder
3. **Replace the existing files**
4. **Refresh your website** to see changes

### Image Specifications:
- **Logo**: 200x80px, transparent background preferred
- **Hero Image**: 1200x800px, high quality
- **About Image**: 800x600px, team or facility photo

## 🎨 **Changing Colors**

### To Change the Gold Color:
1. **Open `styles.css`**
2. **Find `#d4af37`** (the gold color)
3. **Replace it** with your brand color
4. **Save and refresh**

### Example:
```css
/* Change this: */
color: #d4af37;

/* To this: */
color: #your-brand-color;
```

## 📱 **Mobile-Friendly Updates**

### Test Your Changes:
1. **Open your website** on your phone
2. **Check all sections** look good
3. **Test the beer list** loads properly
4. **Verify contact info** is correct

## 🔄 **Auto-Refresh Features**

### Beer Data:
- **Updates every 5 minutes** automatically
- **No manual refresh needed**
- **Real-time from Google Sheets**

### Website Content:
- **Instant updates** when saved
- **Preview before publishing**
- **Backup and restore options**

## 🆘 **Need Help?**

### Common Issues:
1. **Images not showing**: Check file names match exactly
2. **Beer data not loading**: Verify Google Sheets setup
3. **Changes not appearing**: Clear browser cache (Ctrl+F5)
4. **Admin panel not working**: Check file permissions

### Support Options:
- **Check the `DEPLOYMENT.md`** for setup instructions
- **Use the admin panel** for guided updates
- **Contact the developer** for technical support

## 💡 **Pro Tips**

### For Regular Updates:
1. **Bookmark the admin panel** for quick access
2. **Set up Google Sheets** for beer data management
3. **Use the preview feature** before publishing
4. **Export content** as backup regularly

### For Seasonal Changes:
1. **Update beer list** for new seasonal brews
2. **Change hero image** for different seasons
3. **Update hours** for holiday schedules
4. **Modify contact info** if needed

## 🎯 **Quick Start Checklist**

- [ ] **Set up Google Sheets** for beer data
- [ ] **Replace placeholder images** with your own
- [ ] **Update contact information** with real details
- [ ] **Customize hero section** with your branding
- [ ] **Add your brewery story** to the about section
- [ ] **Test on mobile devices** to ensure responsiveness
- [ ] **Bookmark the admin panel** for easy access

---

**Remember**: The website is designed to be **user-friendly** and **maintenance-free**. Once set up, you can update content without any technical knowledge! 