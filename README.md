# NGO Donation Management System (Backend)

## 📌 Project Overview
This project is a backend-driven NGO Donation Management System designed to handle user registrations and donation workflows in a transparent and reliable manner.

The system ensures that:
- User data is stored independently of donation completion
- Donations can succeed, fail, or remain pending
- Administrators have full visibility into registrations and donation records

The application uses a REST API architecture and integrates a payment gateway in sandbox mode for simulating real-world payment scenarios.

---

## 🎯 Objectives
- Allow users to register and login securely
- Enable users to donate any amount optionally
- Track donation attempts and payment status accurately
- Provide administrators with dashboards to monitor users and donations
- Ensure ethical handling of payment data

---

## 🏗️ System Architecture
The system follows a layered backend architecture:
---

## 🧩 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Gateway:** Razorpay (Sandbox Mode)
- **Testing Tool:** Postman

---

## 🗄️ Database Schema

### User
- name
- email
- password (hashed)
- role (user / admin)
- createdAt

### Donation
- user (reference to User)
- amount
- status (PENDING / SUCCESS / FAILED)
- razorpayOrderId
- createdAt
- updatedAt

---

## 🔐 Authentication & Authorization
- Single login and registration system for all users
- Role-based access control
- Admin privileges assigned through role field
- Protected routes using JWT middleware

---

## 💳 Donation & Payment Flow
1. User registers or logs in
2. User initiates donation
3. Donation record is created with status `PENDING`
4. Razorpay order is generated (sandbox)
5. Payment result is simulated
6. Donation status updated to:
   - SUCCESS
   - FAILED
   - PENDING

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Donation (User)
- `POST /api/donation/create`
- `POST /api/donation/create-order`
- `GET /api/donation/my`

### Donation (Admin)
- `GET /api/donation/all`
- `GET /api/donation/summary`
- `PUT /api/donation/update-status`

---

## 🧪 Payment Simulation
- Razorpay sandbox mode is used
- Success, failure, and pending scenarios can be simulated
- Manual status update supported if sandbox simulation is unavailable

---

## 📦 Environment Variables
Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
Project Structure
backend/
├── models/
├── routes/
├── middleware/
├── server.js
├── .env
└── package.json
