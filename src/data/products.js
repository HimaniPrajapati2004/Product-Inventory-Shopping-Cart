/**
 * Product Inventory Data & Utility Functions
 * Preloaded initial inventory for Product Inventory & Shopping Cart application.
 */

export const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 55000,
    quantity: 10,
    image: '/images/laptop.svg',
    description:
      'High-performance laptop featuring a vivid display, powerful processor, and all-day battery life for multitasking, software development, and entertainment.'
  },
  {
    id: 2,
    name: 'Mouse',
    category: 'Electronics',
    price: 800,
    quantity: 25,
    image: '/images/mouse.svg',
    description:
      'Ergonomic optical mouse offering precise tracking, silent responsive clicks, durable switches, and a comfortable sculpted grip for everyday productivity.'
  },
  {
    id: 3,
    name: 'Chair',
    category: 'Furniture',
    price: 4500,
    quantity: 12,
    image: '/images/chair.svg',
    description:
      'Ergonomic mesh office chair with adjustable lumbar support, breathable fabric, pneumatic height adjustment, and smooth 360-degree swivel casters.'
  },
  {
    id: 4,
    name: 'Notebook',
    category: 'Stationery',
    price: 100,
    quantity: 50,
    image: '/images/notebook.svg',
    description:
      'Premium hardcover ruled notebook with 200 pages of thick, acid-free bleed-resistant paper, perfect for journaling, lecture notes, and sketching.'
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Stationery'];

/**
 * Formats a numeric price into Indian Rupee (INR) representation.
 * Example: 55000 -> ₹55,000
 * @param {number} amount - The numeric price
 * @returns {string} Formatted INR currency string
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};
