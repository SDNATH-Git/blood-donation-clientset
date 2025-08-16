# 🩸 BloodCare - Blood Donation Platform

**Live Site:** [https://blood-donation-e5b2a.web.app/](https://blood-donation-e5b2a.web.app/)

---

## 📋 Project Overview  
BloodCare is a comprehensive blood donation platform that connects donors with recipients efficiently. It offers role-based access control system, location-based donor search, and secure donation request management, delivering a seamless and responsive user experience.

---

## 📷 Screenshot  
![BloodCare Screenshot](/src/assets/bloodWeb.png)  
*(Add a clean screenshot of your app inside the `assets` folder to showcase the UI)*

---

## 🛠️ Main Technologies Used  
- React.js  
- Tailwind CSS  
- React Router  
- Framer Motion  
- Axios  
- React Toastify  
- Express.js  
- MongoDB  
- Stripe API  
- JWT Authentication  
- Firebase Auth  
- Firebase Hosting & Vercel Deployment  

---

## 🚩 Core Features  
- Secure user authentication with role-based access (admin, donor, volunteer)  
- Donor search by district, upazila, and blood group filters  
- Blood donation requests with hospital and date details  
- Stripe integration for fund donations (test mode)  
- Donors’ dashboard to view, update, and cancel requests  
- Admin dashboard with user management and data moderation  
- Role management to promote users (admin-only)  
- Interactive UI with animations and smooth transitions  
- JWT-protected API routes for enhanced security  
- Real-time donation status tracking (`pending`, `inprogress`, `done`)  

---

## 📦 Dependencies  
- react  
- react-router-dom  
- tailwindcss  
- framer-motion  
- axios  
- react-toastify  
- express  
- mongoose  
- jsonwebtoken  
- stripe  
- firebase  

---

## ⚙️ How to Run Locally  

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bloodcare.git

# 2. Install dependencies for client and server
cd bloodcare/client
npm install

cd ../server
npm install

# 3. Create `.env` files in both client and server directories
#    Add necessary environment variables like API keys and database URIs

# 4. Start the backend server
cd ../server
npm run dev

# 5. Start the frontend client
cd ../client
npm run dev
