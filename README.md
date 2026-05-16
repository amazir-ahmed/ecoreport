# 🌿 EcoReport — Community Environmental Issue Tracker

> **IT2234 Web Services and Technology | ICA-03 | Level 2 IT**

---

## 📌 Problem Description

Citizens across Sri Lanka and globally have no centralized, easy-to-use platform to report local environmental issues such as illegal waste dumping, water pollution, deforestation, or air quality problems. As a result, local authorities remain unaware of ground-level environmental damage until it becomes severe.

## 💡 Proposed Solution

**EcoReport** is a full-stack web application that allows community members to submit, browse, and track environmental issue reports in their area. Each report includes a category, severity level, location, and status — enabling both citizens and authorities to stay informed and take action.

---

## ✨ Features

- 📝 Submit environmental issue reports with detailed information
- 📋 Browse all community reports with real-time filtering
- ✏️ Update report details and change resolution status
- 🗑️ Delete resolved or duplicate reports
- 🔍 Filter reports by Status, Category, and Severity
- 📊 Live stats dashboard (total, pending, resolved, critical)
- 🌐 RESTful API with proper validation and error handling
- ⚛️ React frontend with clean, responsive UI

---

## 🛠️ Technologies Used

| Layer      | Technology             |
|------------|------------------------|
| Runtime    | Node.js v18+           |
| Framework  | Express.js v4          |
| Database   | MongoDB + Mongoose     |
| Frontend   | React.js v18           |
| HTTP Client| Axios                  |
| API Testing| Postman                |
| Version Control | GitHub            |

---

## 📁 Project Structure

```
ecoreport/
├── backend/
│   ├── models/
│   │   ├── Report.js          # Report schema
│   │   └── Category.js        # Category schema
│   ├── routes/
│   │   ├── reports.js         # Report routes
│   │   └── categories.js      # Category routes
│   ├── controllers/
│   │   ├── reportController.js
│   │   └── categoryController.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ReportList.js
    │   │   └── ReportForm.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

---

## 🔌 API Endpoints

### Reports

| Method   | Endpoint             | Description                        |
|----------|----------------------|------------------------------------|
| `GET`    | `/api/reports`       | Get all reports (supports filters) |
| `GET`    | `/api/reports/:id`   | Get a single report by ID          |
| `POST`   | `/api/reports`       | Create a new report                |
| `PUT`    | `/api/reports/:id`   | Update an existing report          |
| `DELETE` | `/api/reports/:id`   | Delete a report                    |

**Query Parameters for GET /api/reports:**
- `?status=Pending`
- `?category=Water Pollution`
- `?severity=High`

### Categories

| Method   | Endpoint               | Description           |
|----------|------------------------|-----------------------|
| `GET`    | `/api/categories`      | Get all categories    |
| `GET`    | `/api/categories/:id`  | Get category by ID    |
| `POST`   | `/api/categories`      | Create a category     |
| `PUT`    | `/api/categories/:id`  | Update a category     |
| `DELETE` | `/api/categories/:id`  | Delete a category     |

---

## 📨 API Example Requests

### Create a Report
```http
POST /api/reports
Content-Type: application/json

{
  "title": "Illegal waste dumping near Negombo Lagoon",
  "description": "Large amounts of plastic waste and construction debris dumped along the lagoon bank.",
  "category": "Illegal Dumping",
  "location": "Negombo, Western Province",
  "severity": "High",
  "reportedBy": "Kamal Perera"
}
```

### Update Report Status
```http
PUT /api/reports/<id>
Content-Type: application/json

{
  "status": "Under Review"
}
```

### Filter Reports
```http
GET /api/reports?status=Pending&severity=Critical
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ecoreport.git
cd ecoreport
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MONGO_URI
```

### 3. Run Backend
```bash
npm run dev
# Server starts at http://localhost:5000
```

### 4. Setup & Run Frontend
```bash
cd ../frontend
npm install
npm start
# React app opens at http://localhost:3000
```

---

## 🚀 How to Run the Project

1. Start MongoDB (if local): `mongod`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Visit: [http://localhost:3000](http://localhost:3000)
5. API base URL: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🧪 Testing with Postman

Import the provided `EcoReport.postman_collection.json` file into Postman to test all endpoints. All 10 endpoints are pre-configured with sample request bodies.

---

## 👨‍💻 Author

- **Name:** [Your Name]
- **Student ID:** [Your ID]
- **Module:** IT2234 — Web Services and Technology

---

*Built with 🌱 for a cleaner environment.*
