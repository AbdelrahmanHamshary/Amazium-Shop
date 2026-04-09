@import "tailwindcss";

@theme {
  --color-amazon: #131921;
  --color-amazon-light: #232f3e;
  --color-amazon-orange: #febd69;
  --color-amazon-yellow: #f0c14b;
  --color-amazon-blue: #007185;
  --color-amazon-hover: #c7511f;
  --color-amazon-green: #067d62;
  --color-amazon-star: #ffa41c;
  --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

body {
  background: #e3e6e6;
  min-height: 100vh;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-cart {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out both;
}

.animate-slide-down {
  animation: slideDown 0.3s ease-out both;
}

.animate-pulse-cart {
  animation: pulse-cart 0.3s ease-in-out;
}

.product-card {
  transition: all 0.2s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.btn-amazon {
  background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
  border: 1px solid #a88734;
  border-radius: 3px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}
.btn-amazon:hover {
  background: linear-gradient(to bottom, #f5d78e, #eeb933);
}

.btn-orange {
  background: linear-gradient(to bottom, #ffac4f, #ff8f00);
  border: 1px solid #c77600;
  color: white;
  border-radius: 20px;
  padding: 8px 24px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.15s;
}
.btn-orange:hover {
  background: linear-gradient(to bottom, #ff9f35, #e67e00);
  transform: scale(1.02);
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,113,133,0.3);
  border-color: #007185;
}
