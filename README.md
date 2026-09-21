# New Generation

A full-stack web application built with a separate frontend and backend architecture. The project includes user-facing pages, an administrative dashboard, authentication middleware, and backend functionality for managing application data.

## Features

- Responsive frontend interface
- User-facing website pages
- Administrative dashboard
- Admin management functionality
- Artist management functionality
- Subscriber management functionality
- Contact page
- Authentication middleware
- Backend API architecture
- Database integration
- Organized controller, route, model, and service structure
- Responsive styling
- Bootstrap integration
- Image and asset management

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend

- Node.js
- Express.js
- JavaScript
- REST API architecture

### Backend Architecture

- Controllers
- Middleware
- Models
- Routes
- Services
- Database configuration

### Tools

- Git
- GitHub
- npm
- VS Code

## Project Structure

```text
new-generation/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── artistController.js
│   │   │   └── subscribersController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   │
│   ├── createAdmin.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── frontend/
    ├── css/
    │   ├── bootstrap.css
    │   └── bootstrap.min.css
    │
    ├── images/
    │
    ├── README.md
    ├── admin.css
    ├── admin.html
    ├── admin.js
    ├── config.js
    ├── contact.html
    ├── dashboard.css
    ├── dashboard.html
    ├── dashboard.js
    ├── index.html
    ├── script.js
    └── styles.css

Backend Architecture

The backend follows a modular structure to separate different responsibilities within the application.

Controllers

Controllers handle application logic for different areas of the system, including:

Administration
Artists
Subscribers
Middleware

Authentication middleware is used to handle protected backend functionality and requests.

Models

The models layer is used to define and manage application data structures.

Routes

Routes organize the API endpoints and connect incoming requests to the appropriate controllers.

Services

The services layer separates reusable application logic from the route and controller layers.

Database

The project includes a dedicated database configuration module located in:

backend/src/config/db.js
Frontend

The frontend contains the public-facing website and administrative interfaces.

Public Interface

The frontend includes pages such as:

Home page
Contact page
Administrative Interface

The project includes an administrative interface with:

Admin page
Dashboard
Dashboard styling
Dashboard JavaScript functionality
Purpose

The project was developed as a practical full-stack software development project to strengthen skills in frontend development, backend development, authentication, API architecture, database integration, and application organization.

Key Development Skills Demonstrated
Full-stack web development
Frontend development
Backend development
REST API development
Authentication middleware
Database integration
MVC-style project organization
Controller and service architecture
Route management
Administrative dashboard development
Responsive web design
Bootstrap
Git and GitHub
Project Status

This project was developed as part of practical software development training and continues to serve as a project for improving full-stack development skills.

Author

Jegbefume Joy Ndidi

Computer Science Student
Federal University of Petroleum Resources, Effurun

GitHub: https://github.com/justndidi

LinkedIn: https://www.linkedin.com/in/joy-jegbefume-96ba89391
