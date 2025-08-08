# Hiding API Keys - Security Options

You're absolutely right to be concerned about exposing API keys in client-side code. Here are your options from most to least secure:

## 🔒 **Option 1: Server-Side Proxy (Most Secure)**

### What it does:
- Moves API keys to server-side configuration
- Client calls your server, server calls Google Sheets
- API keys never exposed to browsers

### Implementation:
1. **Copy `config.example.js` to `config.js`** and add your credentials:
   ```javascript
   module.exports = {
       GOOGLE_SHEETS_ID: 'placeholder',
       GOOGLE_API_KEY: 'placeholder',
       PORT: 3001
   };
   ```

2. **Install server dependencies**:
   ```bash
   npm install express cors
   ```

3. **Replace `script.js` with `script-secure.js`** in your HTML:
   ```html
   <script src="script-secure.js"></script>
   ```

4. **Run the secure server**:
   ```bash
   npm run server
   ```

5. **Add `config.js` to `.gitignore`** to keep credentials private

### Deployment:
- **Heroku/Railway/Vercel**: Use environment variables
- **VPS**: Store config.js on server only
- **Static hosting**: Can't use this option

---

## 🌐 **Option 2: Google Apps Script (Recommended)**

### What it does:
- Creates a public API endpoint via Google Apps Script
- No API key needed - uses Google's built-in authentication
- Free and easy to set up

### Implementation:
1. **Go to [script.google.com](https://script.google.com)**
2. **Create a new project**
3. **Paste this code**:
   ```javascript
   function doGet() {
     const SHEET_ID = '1lgwXXlpKP65epKMg1w6BtOPZ3JDdbqfffoS0sE24IqE';
     const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
     const data = sheet.getDataRange().getValues();
     
     // Skip header row
     const beers = data.slice(1).map(row => ({
       name: row[0] || '',
       type: row[1] || '',
       abv: row[2] || '',
       ibu: row[3] || '',
       status: row[4] || 'available',
       description: row[5] || ''
     }));
     
     return ContentService
       .createTextOutput(JSON.stringify(beers))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. **Deploy as web app**:
   - Click "Deploy" > "New deployment"
   - Type: "Web app"
   - Execute as: "Me"
   - Access: "Anyone"
   - Click "Deploy"

5. **Update your JavaScript** to use the Apps Script URL:
   ```javascript
   const APPS_SCRIPT_URL = 'your_apps_script_url_here';
   
   async function loadFromAppsScript() {
       const response = await fetch(APPS_SCRIPT_URL);
       return await response.json();
   }
   ```

### Benefits:
- ✅ No API keys exposed
- ✅ No server needed
- ✅ Works with static hosting
- ✅ Free and reliable

---

## 🔐 **Option 3: API Key Restrictions (Partial Security)**

### What it does:
- Restricts API key usage to specific domains
- Reduces risk but key is still visible

### Implementation:
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Navigate to APIs & Services > Credentials**
3. **Click on your API key**
4. **Under "Application restrictions"**:
   - Select "HTTP referrers (web sites)"
   - Add your domain: `yourdomain.com/*`
   - Add localhost for testing: `localhost:3000/*`

### Benefits:
- ✅ Key only works on your domain
- ✅ No code changes needed
- ❌ Key still visible in source code

---

## 📱 **Option 4: Environment Variables (Build-Time)**

### What it does:
- Injects API keys at build time
- Requires a build process

### Implementation:
1. **Use a build tool like Vite or Webpack**
2. **Store keys in environment variables**
3. **Replace keys during build**

### Example with Vite:
```javascript
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
```

### Benefits:
- ✅ Keys not in source code
- ❌ Still visible in built files
- ❌ Requires build process

---

## 🆓 **Option 5: Public Google Sheet + CSV Export**

### What it does:
- Makes sheet public and exports as CSV
- No API key needed at all

### Implementation:
1. **Make your Google Sheet public**
2. **Use the CSV export URL**:
   ```javascript
   const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
   ```
3. **Parse CSV in JavaScript** (requires CSV parsing library)

### Benefits:
- ✅ No API key needed
- ✅ Works everywhere
- ❌ CSV parsing is more complex

---

## 🎯 **Recommendation**

For your use case, I recommend **Option 2 (Google Apps Script)**:

1. **Easy to set up** - No server required
2. **Completely secure** - No API keys exposed
3. **Free** - Uses Google's infrastructure
4. **Reliable** - Google's 99.9% uptime
5. **Works with static hosting** - GitHub Pages, Netlify, etc.

Would you like me to help you implement the Google Apps Script solution?

---

## 🚨 **Security Checklist**

- [ ] Remove API keys from client-side code
- [ ] Add sensitive files to `.gitignore`
- [ ] Use HTTPS in production
- [ ] Restrict API keys to specific domains
- [ ] Monitor API usage for unusual activity
- [ ] Consider rate limiting if using server option

---

## 📞 **Need Help?**

Choose the option that best fits your deployment strategy:
- **Static hosting only**: Use Google Apps Script
- **Have a server**: Use server-side proxy
- **Quick fix**: Use API key restrictions + domain limits 