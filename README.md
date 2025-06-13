# Food Ordering App 🍽️

A modern full-stack Food Ordering application built with **Next.js (TypeScript)** for the frontend and **Node.js + Express.js** for the backend. This app supports a seamless food ordering experience with robust authentication, route protection, payment integration, and a smooth UI using TailwindCSS and Framer Motion.

---

## 🔧 Tech Stack

### Frontend:

* **Next.js (v15.3.3)** + **TypeScript**
* **React 19**
* **Tailwind CSS**
* **Framer Motion** (animations)
* **Zustand** (state management)
* **Axios** (HTTP requests)
* **SweetAlert2** (alert popups)
* **React Hot Toast** (notifications)
* **Lucide React** (icons)

### Backend:

* **Node.js + Express.js (v5.1.0)**
* **MongoDB + Mongoose**
* **JWT Authentication & Authorization**
* **Helmet** (security middleware)
* **CORS**
* **Express Validator**
* **Multer** (file uploads)
* **Stripe API** (payments)
* **bcryptjs** (password hashing)

---

## 📁 Folder Structure

```
food_ordering_app_
├── client/       # Next.js frontend
└── server/       # Node.js backend
```

---

## 🚀 Features

### ✅ Authentication & Authorization

* Register/Login (with hashed passwords)
* Protected routes using JWT (server + client)
* Admin/User roles with authorization middleware
* Secure cookies using `httpOnly`

### 🛡️ Security

* HTTP headers secured using **Helmet**
* Input validation using **express-validator**
* CORS enabled with whitelist setup

### 🍔 Core Features

* Browse Menu Items
* Add to Cart
* Place Orders
* Pay with Stripe
* Admin Panel for managing items/users
* Upload profile images with **Multer**
* Upload item images with local server path
* Smooth animations with **framer-motion**

### 📦 State Management

* Global state with **Zustand**
* Auth and cart management from a centralized store

### 💡 UX Enhancements

* Alerts via **SweetAlert2** and **react-hot-toast**
* Animated transitions via **framer-motion**
* Clean and responsive UI via **TailwindCSS**
* Loading states and error handling

---

## ⚙️ Environment Variables

### Backend (`server/.env`):

```env
JWT_SECRET_KEY=your_jwt_secret
PORT=5080
URL_Mongo=your_mongo_uri
NODE_ENV=development
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
PROFILE_IMAGE_PATH=http://localhost:5080/uploads/users/
```

### Frontend (`client/.env`):

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:5080
NEXT_PUBLIC_ITEM_IMAGES_SERVER_URL=http://localhost:5080/uploads/items/
```

---

## 🧪 Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 💰 Payments

* Integrated Stripe for secure and testable payments
* Orders are placed and processed upon successful payment

---

## 📷 Image Uploads

* Profile and item images stored locally under `/uploads`
* Served via public URLs using Express static middleware

---

## 🔐 Protected Routes

* Client-side redirection for unauthenticated users
* Backend route guards using JWT
* Middleware checks for user role and permissions

---

## 🙌 Contribution

Feel free to fork and submit PRs. This app is a solid foundation for a real-world food ordering system and can be extended with features like real-time order status, email notifications, and more.

---

## 👨‍💻 Author

**Mohamed Osama**
GitHub: [@mohamed-osamaaa](https://github.com/mohamed-osamaaa)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🎥 Demo Videos

Watch key features in action:


https://github.com/user-attachments/assets/311ea8a6-56b7-4035-bcda-2977b96ce73a





https://github.com/user-attachments/assets/68ad4493-cafb-4d95-b5a1-b76b7d0ad1af




https://github.com/user-attachments/assets/f216623f-d2ae-44d4-8d17-2e6bde84e4b9



---

## 🚀 Live Deployment

Experience the app live:

* [Live Site on Vercel](https://your-vercel-deployment.vercel.app)
