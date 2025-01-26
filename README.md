# Portfolio Tracker

The **Portfolio Tracker** is a full-stack web application designed to help users track and manage their stock portfolio. This project includes a React frontend, a Spring Boot backend, and a MySQL database. Users can add, view, edit, and delete stock records within their portfolio.

## Features

- **Add Stock:** Add new stocks to the portfolio with details like stock ticker, quantity, and buy price.
- **Edit Stock:** Modify stock details such as the quantity or buy price.
- **Delete Stock:** Remove stocks from the portfolio.
- **View Portfolio:** Display all stocks in the portfolio with details like stock name, ticker, quantity, and buy price.

## Tech Stack

### Frontend:
- **React:** A JavaScript library for building user interfaces.
- **Material-UI:** A popular React UI framework for responsive design and modern components.
- **Axios:** A promise-based HTTP client for making API requests.
- **React Router:** For routing between different pages in the app.

### Backend:
- **Spring Boot:** A Java-based framework used to create stand-alone, production-grade Spring-based applications.
- **Spring Data JPA:** Simplifies database interactions and provides a repository-based approach for persistence.
- **MySQL:** A relational database to store the stock data.

### Database:
- **MySQL:** Used to store stock details (e.g., stock name, ticker, quantity, and buy price).

## Assumptions and Limitations

- **MySQL Database:** You must have MySQL installed locally to run the backend.
- **Schema Creation:** The backend application will automatically create the necessary tables in the database upon startup. However, you need to ensure that the `portfolio_tracker` schema exists in your database.
- **No Authentication:** This application does not include any authentication or user management features. Anyone with access to the application can manage stocks.
- **Development Mode:** The frontend is intended to run in development mode with a hot-reloading server. It will not be optimized for production by default.

## Project Setup and Running Locally

### 1. Clone the Repository

Start by cloning the GitHub repository to your local machine:

```bash
git clone https://github.com/your-username/portfolio-tracker.git
```

Navigate to the project folder:

```bash
cd portfolio-tracker
```

### 2. Backend (Spring Boot)

#### Prerequisites:
- **JDK 11 or higher:** Ensure you have JDK installed on your machine.
- **MySQL:** Make sure MySQL is installed and running locally.

#### a. Create MySQL Database

You need to create the `portfolio_tracker` database in MySQL. Use the following SQL command to create the schema:

```sql
CREATE DATABASE portfolio_tracker;
```

#### b. Configure Database Connection

In the `backend/src/main/resources/application.properties` file, configure the database connection settings. Update the database URL, username, and password as necessary:

```properties
# Spring Datasource Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_tracker
spring.datasource.username=username
spring.datasource.password=user-password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update  # Automatically updates the schema
spring.jpa.show-sql=true  # Show SQL queries in the console
spring.jpa.properties.hibernate.format_sql=true  # Format SQL queries for readability

# Server Configuration (Optional)
server.port=8081  # Configure the backend server to run on port 8081
```

#### c. Run the Backend Application

Open a terminal and navigate to the `backend` directory of the project. Build and run the Spring Boot application:

```bash
mvn clean install  # Build the project
mvn spring-boot:run  # Run the application
```

The Spring Boot backend will now be running on `http://localhost:8081`.

### 3. Frontend (React)

#### Prerequisites:
- **Node.js and npm:** Make sure Node.js and npm (or yarn) are installed on your machine.

#### a. Install Frontend Dependencies

Navigate to the `frontend` directory and install the required dependencies:

```bash
cd frontend
npm install  # Install all frontend dependencies
```

#### b. Run the Frontend Application

To start the React development server, run:

```bash
npm start
```

The React frontend will now be running on `http://localhost:3000`.

### 4. Accessing the Application

Open your web browser and visit `http://localhost:3000` to access the frontend. The frontend will communicate with the backend API running at `http://localhost:8081`.

## Database Schema

The backend uses JPA (Java Persistence API) to automatically create the necessary database tables. Below is the schema for the `Stock` table based on the application’s JPA entity:

```sql
CREATE TABLE Stock (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for the stock
  ticker VARCHAR(255),                  -- Stock ticker symbol (e.g., AAPL)
  name VARCHAR(255),                    -- Stock name (e.g., Apple Inc.)
  quantity INT,                         -- Number of shares
  buy_price DOUBLE                      -- Price at which the stock was bought
);
```

When the Spring Boot app starts, the `Stock` table will be created automatically if it does not exist. If the database already has the table, no changes will occur.

## API Endpoints

The backend exposes the following RESTful API endpoints:

### 1. GET /stocks
Retrieve all stocks in the portfolio.

**Response:**

```json
[
  {
    "id": 1,
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "quantity": 10,
    "buyPrice": 150.00
  },
  {
    "id": 2,
    "ticker": "GOOGL",
    "name": "Alphabet Inc.",
    "quantity": 5,
    "buyPrice": 2700.00
  }
]
```

### 2. POST /stocks
Add a new stock to the portfolio.

**Request Body:**

```json
{
  "ticker": "AMZN",
  "name": "Amazon.com, Inc.",
  "quantity": 3,
  "buyPrice": 3400.00
}
```

**Response:**

```json
{
  "id": 3,
  "ticker": "AMZN",
  "name": "Amazon.com, Inc.",
  "quantity": 3,
  "buyPrice": 3400.00
}
```

### 3. PUT /stocks/{id}
Update an existing stock's details in the portfolio.

**Request Body:**

```json
{
  "ticker": "AMZN",
  "name": "Amazon.com, Inc.",
  "quantity": 5,
  "buyPrice": 3350.00
}
```

### 4. DELETE /stocks/{id}
Delete a stock from the portfolio.

**Response:**

```json
{
  "message": "Stock with ID 3 has been deleted."
}
```

## Directory Structure

```plaintext
portfolio-tracker/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── portfolio/
│   │   │   ├── resources/
│   │   │   │   └── application.properties
│   │   │   └── Stock.java  # JPA Entity for Stock
│   │   └── pom.xml  # Backend Maven dependencies and configuration
│   └── target/  # Compiled backend files
├── frontend/
│   ├── public/  # Static files for React
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js  # Main React component
│   │   └── index.js  # React entry point
│   └── package.json  # Frontend dependencies and scripts
├── README.md  # This file
└── .gitignore  # Git ignore file
```

## Additional Notes

- **Frontend:** The React application uses Material-UI components for a sleek, modern user interface.
- **Backend:** The Spring Boot application exposes a simple RESTful API to manage stock records.
- **Deployment:** To deploy the application, ensure you configure production settings for both the backend and frontend (e.g., using environment variables for sensitive information like database credentials).

## Troubleshooting

### 1. Spring Boot Application Not Starting
- Check that your MySQL service is running.
- Ensure that the database `portfolio_tracker` exists. You can create it manually using the provided SQL command.

### 2. Frontend Not Connecting to Backend
- Ensure that the backend is running on `http://localhost:8081`.
- Verify that the backend API endpoints are correct and match the frontend's Axios requests.
