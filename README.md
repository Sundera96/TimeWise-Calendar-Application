# TimeWise

![TimeWise Logo](https://github.com/Sundera96/TimeWise-Frontend/blob/d7c84f7828508d4baaccacdff09177aada81da30/Screenshot%20from%202024-05-10%2021-02-34.png)

TimeWise is a modern calendar application designed for seamless event management and scheduling. Built using Spring Boot for the backend and React for the frontend, TimeWise provides a user-friendly interface and robust functionality, deployed on Google Cloud for scalability and reliability.

## Features

- **Event Management**: Create, view, update, and delete events.
- **User Authentication**: Secure login and registration using JWT.
- **Responsive UI**

## Architecture

TimeWise consists of three main backend services, and a frontend:

### Backend Services

1. **Event Service**
   - **Purpose**: Manages events including creation, updating, and deletion.
   - **Tech**: Spring Boot, REST APIs, PostgreSQL.
   - **Deployment**: Docker, Google Cloud.

2. **Security Service**
   - **Purpose**: Handles user authentication and authorization.
   - **Tech**: Spring Security, JWT, PostgreSQL.
   - **Deployment**: Docker, Google Cloud.

3. **Gateway Service**
   - **Purpose**: Routes requests to the appropriate services.
   - **Tech**: Spring Cloud Gateway.
   - **Deployment**: Docker, Google Cloud.

### Frontend

- **Tech**: React, Vite.
- **Deployment**: Docker, Google Cloud.

## Screenshots

### Month View

![Main Interface](https://github.com/Sundera96/TimeWise-Frontend/blob/d7c84f7828508d4baaccacdff09177aada81da30/Screenshot%20from%202024-05-10%2021-02-34.png)

### Week View

![Event Creation](https://github.com/Sundera96/TimeWise-Frontend/blob/f2c512519863820411ebb81041e838060991729f/Screenshot%20from%202024-05-10%2021-03-31.png)

## Technologies Used

### Backend

- **Spring Boot**: Java-based framework for creating RESTful services.
- **Spring Security**: For authentication and authorization.
- **Spring Cloud Gateway**: For routing and load balancing.
- **JWT**: For secure token-based authentication.
- **Docker**: For containerization.

### Frontend

- **React**: For building the user interface.
- **Vite**: For frontend tooling and build.

### Deployment

- **Google Cloud**: For hosting both backend and frontend services.
