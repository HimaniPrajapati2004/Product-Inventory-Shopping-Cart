# Product Inventory & Shopping Cart 🛒📦

A modern, responsive, and beginner-friendly eCommerce web application built with **React.js**, **React Router v6**, **React Context API**, and **Vite**.

---

## 🌟 Key Features

- **Product Inventory Display:** Showcase of electronics, furniture, and stationery with detailed product cards and high-resolution SVG artwork.
- **Instant Search:** Real-time, case-insensitive product search by name with one-click clear button.
- **Category Filter:** Dynamic dropdown filter supporting `All`, `Electronics`, `Furniture`, and `Stationery`.
- **Performance Optimized with `useMemo`:** Memoized product filtering combining search and category selections.
- **Product Details Pages (`/products/:id`):** Dynamic routing using `useParams`, breadcrumbs, inventory availability, and rich descriptions.
- **Interactive Shopping Cart (`/cart`):**
  - Add items to cart with live navbar counter updates.
  - Increment / decrement item quantities with stock-bound validation (cannot exceed warehouse stock or drop below 1).
  - Remove items from cart.
  - Subtotal per product and dynamic grand total formatted in Indian Rupees (**₹ / INR**).
- **Sticky Cart Summary Bar:** Live summary bar on the Products catalog with quick checkout action.
- **Simulated Checkout:** Interactive order confirmation modal with generated order ID, item breakdown, and cart clearing.
- **Modern Responsive Design:** Custom Vanilla CSS design with clean light-gray background, navy typography, blue primary buttons, green stock indicators, and mobile-friendly layouts.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Functional Components, Hooks)
- **Routing:** React Router DOM v6 (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useParams`, `useNavigate`)
- **State Management:** React Context API (`CartContext`)
- **Build Tool:** Vite
- **Styling:** Vanilla CSS3 (Custom Design System in `src/styles/App.css`)

---

## 📁 Project Structure

```
Product Inventory & Shopping Cart/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── .gitignore
├── public/
│   └── images/
│       ├── laptop.svg
│       ├── mouse.svg
│       ├── chair.svg
│       └── notebook.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── products.js
    ├── context/
    │   └── CartContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProductCard.jsx
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── CartItem.jsx
    │   ├── CartSummary.jsx
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   ├── ProductDetails.jsx
    │   └── Cart.jsx
    │   └── NotFound.jsx
    └── styles/
        └── App.css
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/HimaniPrajapati2004/Product-Inventory-Shopping-Cart.git
cd Product-Inventory-Shopping-Cart
```

### 2. Install dependencies
```bash
npm install
npm install react-router-dom
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
Open [http://localhost:5173/](http://localhost:5173/) to explore the application.

---

## 📜 Available Scripts

- `npm run dev`: Runs the application in development mode with HMR.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Locally previews the production build.
