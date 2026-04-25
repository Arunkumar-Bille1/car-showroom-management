# 🚗 LUXEDRIVE - Premium Car Showroom Management System

LUXEDRIVE is a modern, full-stack web application designed for managing a premium car showroom. It features a sleek, glassmorphic UI, a robust Flask backend, and a lightweight SQLite database for zero-configuration setup.

## 🚀 Key Features

### User Portal:
- **Browse Collection**: View premium cars with dynamic search and brand filtering.
- **Booking Flow**: Multi-step booking process with an elegant UI.
- **My Garage (Bookings)**: View booked cars and easily **cancel bookings** if needed.
- **Dynamic Payment**: 
  - Simulated payment gateway supporting Card, UPI, and Cash.
  - Dedicated UPI instructions mapping to `8074975446@axl`.
- **Feedback**: Submit and read customer reviews.
- **Security**: Secure Login/Register with SHA-256 password hashing.

### Admin Portal:
- **Inventory Management**: Add new vehicles or remove sold ones.
- **Booking Tracker**: View all bookings, including canceled ones.
- **Payment Logs**: Monitor all successful transactions.
- **Feedback Dashboard**: Read all customer feedback.

### UI/UX Design:
- High-end **Glassmorphism** styling with gold accents.
- Smooth page transitions and micro-interactions powered by **Framer Motion**.
- Fully responsive layout for all devices.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Axios, React Router DOM, Framer Motion, React Icons.
- **Backend**: Python Flask, Flask-SQLAlchemy, Flask-CORS.
- **Database**: SQLite (Zero config required!)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Arunkumar-Bille1/car-showroom-management.git
cd car-showroom-management
```

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Initialize the database with sample data (Creates `car_showroom.db`):
   ```bash
   python init_db.py
   ```
4. Run the Flask server:
   ```bash
   python app.py
   ```
   *The backend API will run on `http://localhost:5001`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🔑 Default Login Credentials

Use these credentials to explore the system out of the box:

- **Admin Account**: 
  - Username: `admin`
  - Password: `admin`
- **Demo User Account**: 
  - Username: `user1`
  - Password: `user123`

---

## 📁 Project Structure

```text
/final car
├── /backend
│   ├── app.py           # Core Flask API & Routes
│   ├── models.py        # SQLAlchemy Database Models
│   ├── init_db.py       # Script to auto-populate SQLite DB
│   ├── requirements.txt # Python dependencies
│   └── car_showroom.db  # SQLite Database (Auto-generated)
├── /frontend
│   ├── /src
│   │   ├── /components  # Shared UI components (Navbar)
│   │   ├── /pages       # All pages (Home, Admin, Garage, etc.)
│   │   ├── App.jsx      # React Router configuration
│   │   └── index.css    # Premium Glassmorphism Design System
│   └── index.html       # Vite entry point
└── README.md
```
