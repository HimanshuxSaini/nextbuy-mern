# NextBuy - Personalization Guide

This guide will help you make the NextBuy eCommerce project completely your own.

## ✅ Already Done
- ✅ Renamed to "nextbuy-ecommerce"
- ✅ Updated README with local development URLs
- ✅ Removed old Render.com production URLs
- ✅ Fixed hardcoded reset password URLs to use environment variables

## 🔧 Customization Steps

### 1. **Update Author Information**
- [ ] Edit `package.json` → Change `"author": "Your Name"` to your actual name
- [ ] Update `README.md` → Add your GitHub username in clone instructions
- [ ] Add your email/portfolio links in README footer

### 2. **Customize Branding (Optional)**
Replace "NextBuy" with your own brand name:
- [ ] `frontend/src/components/Header.jsx` → Navbar brand text
- [ ] `frontend/src/components/Footer.jsx` → Footer text
- [ ] `frontend/public/index.html` → Browser title and favicon
- [ ] `backend/controllers/userController.js` → Email footer

### 3. **Setup Your GitHub Repository**
```bash
# Navigate to your project
cd c:\Users\himan\Downloads\MERN-eCommerce\MERN-eCommerce

# Remove original remote
git remote remove origin

# Add your new repository
git remote add origin https://github.com/YOUR-USERNAME/nextbuy-ecommerce.git
git branch -M main
git push -u origin main
```

### 4. **Update Environment Variables**
Create `.env` files in both root and backend folders:

**Root .env:**
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Backend .env:**
```
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/nextbuy
JWT_SECRET=81f36ce0bd64221241b3f6c3aed52d3490d4f5af8eaf9fd7e4dac1a172c76d98

# Email Configuration (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=465
EMAIL_USER=your-brevo-email@gmail.com
EMAIL_PASS=your-brevo-api-key
EMAIL_FROM=noreply@yourbrand.com

# Razorpay (if using payment)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### 5. **Prepare for Production Deployment**

#### Frontend → Netlify
1. Push your repository to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set build command: `npm run build --prefix frontend`
6. Set publish directory: `frontend/build`
7. Update `FRONTEND_URL` in backend to your Netlify URL

#### Backend → Render or Railway
1. Go to [render.com](https://render.com) or [railway.app](https://railway.app)
2. Create new Web Service from GitHub
3. Set environment variables from your `.env` file
4. Build command: `npm install`
5. Start command: `npm run server`
6. Note the deployed backend URL

#### Update FRONTEND_URL in Backend
After deploying frontend, update backend environment:
```
FRONTEND_URL=https://your-netlify-url.netlify.app
```

### 6. **Customize Database Name** (Optional)
Current: `mongodb://localhost:27017/nextbuy`

To change database name:
- Update `MONGO_URI` in `.env`
- Update connection string in `backend/config/db.js` if needed

### 7. **Add Your Own Features**
Now that it's personalized, you can:
- [ ] Add more payment gateways
- [ ] Implement shipping integrations
- [ ] Add email notifications
- [ ] Enhance UI/UX
- [ ] Add more admin features
- [ ] Implement analytics

### 8. **Security Checklist**
- [ ] Never commit `.env` files (already in .gitignore)
- [ ] Generate a new JWT_SECRET for production
- [ ] Use strong passwords for all services
- [ ] Enable 2FA on GitHub
- [ ] Regularly update dependencies: `npm audit`

### 9. **Documentation**
Update README with:
- [ ] Your project description
- [ ] Features specific to your implementation
- [ ] Setup instructions for your branding
- [ ] Deployment instructions
- [ ] Your personal contribution guidelines

## 📋 Current Configuration Summary

**Frontend:**
- React with Redux
- Bootstrap styling
- Running on localhost:3000

**Backend:**
- Express.js server
- MongoDB database
- JWT authentication with bcrypt hashing
- Email service via Brevo SMTP
- Running on localhost:5000

**Email Service:**
- Brevo SMTP (port 465 with SSL)
- Used for password resets and notifications

**Database:**
- MongoDB Community Server 8.2.3 (local)
- Location: C:\data\db

## 🚀 Next Steps

1. Update `package.json` with your name
2. Create your GitHub repository
3. Push the code
4. Deploy frontend to Netlify
5. Deploy backend to Render/Railway
6. Test the full application
7. Share with the world! 🎉

## 💡 Tips

- Keep `.env` files secure and never share credentials
- Use different credentials for development and production
- Regularly backup your MongoDB database
- Monitor your cloud service usage to avoid unexpected charges
- Keep dependencies updated for security patches

Happy building! 🚀
