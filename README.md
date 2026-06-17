# Zerofootprint

ZeroFootprint is a full-stack web application that helps users calculate, visualize, and track their carbon footprint based on everyday activities.


---

## 🚀 Features

* Carbon footprint calculation based on:

  * Car usage
  * Food consumption
  * Energy consumption

* Interactive dashboard including:

  * Total carbon footprint
  * Comparison with previous calculations
  * Environmental impact level (Low, Medium, High)
  * Personalized sustainability recommendations
  * Carbon footprint distribution chart
  * History of previous calculations

* Responsive design for mobile devices

* Data persistence using MySQL

---

## 🛠️ Technologies

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Maven
* MySQL

### Frontend

* React
* Axios
* Recharts
* CSS

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/paula-gi/ZeroFootprint.git
```

### 2. Configure the database

Create a MySQL database:

```sql
CREATE DATABASE zerofootprint;
```

Then configure your database credentials in:

```text
backend/src/main/resources/application.properties
```

---

### 3. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

---

### 4. Run the frontend

```bash
cd frontend
npm install
npm start
```

The application will be available at:

```text
http://localhost:3000
```

