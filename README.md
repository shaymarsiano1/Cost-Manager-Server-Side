# 🧾 Cost Manager API

This is a server-side application for managing cost/expense entries. It uses Node.js, Express.js, and MongoDB Atlas for backend and data storage.

---

## 🚀 Getting Started

### 📦 Prerequisites
- [Node.js](https://nodejs.org/) installed
- A MongoDB Atlas account (or local MongoDB)

---

### 🧰 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and fill it based on the example below:

```env
MONGODB_URI="mongodb+srv://YOUR_CLUSTER0_USERNAME:YOUR_CLUSTER0_PASSWORD@cluster0.o6k8tbi.mongodb.net/cost_manager?retryWrites=true&w=majority&appName=Cluster0"
```

---

### ▶️ Run the server

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port you define).

---

## 🧪 Running Tests

To run the test suite (if tests are defined in the `tests/` folder):

```bash
npm test
```

---

## 🗂 Project Structure

```
.
├── index.js             # Main entry point
├── routes/              # Express routes
├── models/              # Mongoose models
├── tests/               # Test files
├── .env.example         # Example environment config
├── package.json
└── README.md
```

