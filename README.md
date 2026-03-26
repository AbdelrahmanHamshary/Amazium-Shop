# Amazium Shop Project 
### A sleek, e-commerce experience inspired by Amazium Shop.

Built by **Abdelrahman Hamshary**, Amazium Shop is a lightweight web application that demonstrates full-stack integration using MongoDB Atlas, Express, React, and Node.js. It features a responsive UI, real-time data fetching, and a modern aesthetic.

---

##  Technologies Used

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, CSS3 (Flexbox/Grid) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Tooling** | Git, VS Code, NPM |

---

##  Features

- **Dynamic Product Catalog:** Fetches real-time product data (images, descriptions, prices) from MongoDB.
- **Responsive Design:** Optimized for seamless viewing on mobile, tablet, and desktop.
- **Interactive UI:** Modern card layouts with smooth CSS hover animations.


---

##  Getting Started

### Prerequisites
- Node.js installed on your machine.
- A MongoDB Atlas account and cluster.

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure Environment Variables
# Create a .env file in the /backend folder and add:
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Start the server
node server.js
```
*The server will run on http://localhost:5000*

### 2. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Launch the development server
npm run dev
```
*The UI will run on http://localhost:5173*

---

## 📂 Project Structure
```text
Amazium Shop/
├── backend/
│   ├── models/        # Database schemas
│   ├── routes/        # API endpoints
│   └── server.js      # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI elements
│   │   └── App.js      # Main logic
│   └── public/
└── README.md
```

---

##  Notes
- **Security:** Ensure your `.env` file is included in your `.gitignore` to prevent leaking MongoDB credentials.
- **Extensibility:** You can easily add more products via the MongoDB Atlas GUI or by creating a POST route.

---

##  Author
**Abdelrahman Hamshary**
- [GitHub](https://github.com/AbdelrahmanHamshary)

