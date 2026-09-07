<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=D4AF37&height=200&section=header&text=GHOST%20RIDER&fontSize=80&fontColor=000000&animation=fadeIn&fontAlignY=38&desc=LUXURY%20BIKES&descAlignY=60&descSize=25&descColor=000000" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=22&duration=3000&pause=1000&color=D4AF37&center=true&vCenter=true&multiline=true&width=600&height=80&lines=Premium+Motorcycle+Showcase+Platform;Built+With+React+%2B+TypeScript+%2B+Tailwind" alt="Typing SVG" />

<br/><br/>

[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer](https://img.shields.io/badge/Framer_Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)

<br/>

![GitHub stars](https://img.shields.io/github/stars/manojcodings/ghost-rider-luxury-bikes?style=social)
![GitHub forks](https://img.shields.io/github/forks/manojcodings/ghost-rider-luxury-bikes?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/manojcodings/ghost-rider-luxury-bikes?style=social)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manoj_Kumar-D4AF37?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manoj-kumar-684b133a6/)

</div>

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 🏍️ &nbsp;What Is Ghost Rider?

<img align="right" src="https://readme-typing-svg.demolab.com?font=Inter&size=14&duration=2000&pause=500&color=D4AF37&center=false&vCenter=true&multiline=true&width=300&height=100&lines=🏍️+Premium+Bike+Showcase;⚡+Cinematic+Animations;🔐+Admin+Dashboard;📱+Fully+Responsive" alt="" />

**Ghost Rider Luxury Bikes** is a high-performance motorcycle showcase platform designed for bike enthusiasts. It combines a stunning React frontend with a powerful Laravel backend to deliver a seamless, premium experience.

Whether you're browsing our **Racing Collection**, exploring **Luxury Showroom**, or booking a **Test Ride** — every interaction is crafted with precision.

<br clear="right"/>

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## ✨ &nbsp;Features

<table>
<tr>
<td width="50%">

### 🎨 Frontend
- ⚡ Cinematic scroll animations
- 🖱️ Mouse parallax on hero section
- 📱 Fully responsive (mobile first)
- 🌙 Premium black & gold dark theme
- 🔄 Smooth page transitions
- 💬 WhatsApp popup integration
- 🔝 Scroll to top button

</td>
<td width="50%">

### 🔧 Backend & Structure
- 🔐 Protected admin dashboard
- 🗺️ Multi-page React Router setup
- 🏍️ Dynamic bike data management
- 📊 Admin CRUD operations
- 🔑 JWT Authentication (Laravel)
- 🌐 REST API integration
- 📦 Modular component architecture

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 🗺️ &nbsp;Pages & Routes

```
🏠  /                →  Landing Page (Hero + Bikes + Collections + Contact)
🏍️  /bikes           →  Featured Bikes Showcase
🏁  /racing          →  Racing Collection
💎  /luxury          →  Luxury Showroom  
📦  /collections     →  All Collections
📞  /contact         →  Contact Page
👤  /about           →  About (Overview / Creator / Bikes)
🔑  /login           →  Admin Login
⚙️  /admin/dashboard →  Protected Admin Panel
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 🛠️ &nbsp;Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---:|
| ⚛️ UI Framework | React 18 | Component-based UI |
| 🔷 Language | TypeScript | Type-safe development |
| 🎨 Styling | Tailwind CSS | Utility-first CSS |
| ⚡ Build Tool | Vite | Fast dev & build |
| 🎬 Animations | Framer Motion | Cinematic transitions |
| 🗺️ Routing | React Router 6 | Multi-page navigation |
| 🔴 Backend | Laravel | REST API & Auth |
| 🗄️ Database | MySQL | Data persistence |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 📁 &nbsp;Project Structure

```bash
📦 ghost-rider-luxury-bikes
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 🏍️ Navbar.tsx          # Fixed nav with scroll + route support
 ┃ ┃ ┣ 🦸 Hero.tsx             # Parallax hero with mouse tracking
 ┃ ┃ ┣ ⭐ FeaturedBikes.tsx    # Featured bikes with 3D card tilt
 ┃ ┃ ┣ 🗂️ BikeCollections.tsx  # Collections grid
 ┃ ┃ ┣ 💎 BikeShowcase.tsx     # Luxury showcase
 ┃ ┃ ┣ 📞 Contact.tsx          # Contact form
 ┃ ┃ ┣ 📄 AboutPage.tsx        # About with nested routes
 ┃ ┃ ┣ 🏍️ BikesPage.tsx        # Dedicated bikes page
 ┃ ┃ ┣ 🏁 RacingPage.tsx       # Racing collection page
 ┃ ┃ ┣ 💎 LuxuryPage.tsx       # Luxury showroom page
 ┃ ┃ ┣ 📦 CollectionsPage.tsx  # All collections page
 ┃ ┃ ┗ 📞 ContactPage.tsx      # Dedicated contact page
 ┃ ┣ 📂 data
 ┃ ┃ ┗ 📊 bikesData.ts         # All bike data & nav config
 ┃ ┣ 📂 context
 ┃ ┃ ┗ 🔐 AuthContext.tsx      # Authentication state
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 🔑 Login.tsx            # Admin login page
 ┃ ┃ ┗ ⚙️ AdminDashboard.tsx   # Protected admin panel
 ┃ ┗ 📂 services
 ┃   ┗ 🌐 authService.ts       # API auth service
 ┣ 📄 tailwind.config.js
 ┣ 📄 vite.config.ts
 ┗ 📄 package.json
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## ⚙️ &nbsp;Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/manojcodings/ghost-rider-luxury-bikes.git

# 2️⃣ Navigate into project
cd ghost-rider-luxury-bikes

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm run dev

# 5️⃣ Open in browser
# 🌐 http://localhost:5173
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 🔐 &nbsp;Admin Access

```
🌐 Route    →  /login
✅ Success  →  /admin/dashboard
🛡️ Guard    →  ProtectedRoute (JWT via Laravel API)
```

> ⚠️ Never share your `.env` credentials publicly.

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 🚀 &nbsp;Deployment

<table>
<tr>
<td align="center" width="50%">

### Frontend
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/)

**Vercel** (Recommended)
```bash
npm run build
# Deploy dist/ folder
```

</td>
<td align="center" width="50%">

### Backend
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/)

**Railway / Render**
```bash
# Laravel API deployment
php artisan migrate
```

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

## 👨‍💻 &nbsp;Author

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Orbitron&size=18&duration=3000&pause=1000&color=D4AF37&center=true&vCenter=true&width=400&lines=Made+with+❤️+by+Manoj;Ghost+Rider+Luxury+Bikes" alt="" />

[![GitHub](https://img.shields.io/badge/GitHub-manojcodings-D4AF37?style=for-the-badge&logo=github&logoColor=white)](https://github.com/manojcodings)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manoj_Kumar-D4AF37?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manoj-kumar-684b133a6/)

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=D4AF37&height=3" width="100%"/>

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=D4AF37&height=120&section=footer&text=RIDE%20THE%20FUTURE&fontSize=30&fontColor=000000&animation=fadeIn" width="100%"/>

**⭐ Star this repo if you like it — it means a lot!**

</div>
