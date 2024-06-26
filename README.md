# Volcanoes RESTful API

## Overview

Volcanoes RESTful API is a robust service designed to manage and analyze data about volcanoes around the world. Developed using Node.js and Express.js, this API provides endpoints for accessing detailed volcano information, managing user profiles, and implementing custom functionalities such as user comments and ratings on volcanoes. The API ensures scalability and security by utilizing JWT for authentication and MySQL for data persistence.

## Features

- **Volcano Data Management**: Retrieve detailed information about volcanoes, including location, eruption history, and nearby population data.
- **User Profile Management**: Secure endpoints for user registration, login, profile retrieval, and profile updates.
- **Custom Functionality**: Extendable endpoints for additional features like commenting and rating volcanoes.
- **Swagger Documentation**: Interactive API documentation for easy exploration and testing of endpoints.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express.js**: Web framework for Node.js to build robust APIs.
- **MySQL**: Relational database management system for storing and querying data.
- **Knex.js**: SQL query builder for relational databases.
- **JSON Web Tokens (JWT)**: For secure authentication and authorization.
- **Swagger**: API documentation and testing tool.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Git for version control.
- Avana.io account for database hosting.
- MySQL Workbench or any other database management tool.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mahmood-Anaam/NodeJS-Express-Volcanoes-Restful-API.git
   cd NodeJS-Express-Volcanoes-Restful-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup MySQL database on Avana.io:**
   - Sign up for an account on Avana.io and create a new MySQL database instance.
   - Obtain the connection details (hostname, port, username, password) from your Avana.io dashboard.

4. **Connect to the Avana.io MySQL database using MySQL Workbench:**
   - Open MySQL Workbench and create a new connection using the details provided by Avana.io.
     - Hostname: `your_avana_io_host`
     - Port: `your_avana_io_port`
     - Username: `your_avana_io_username`
     - Password: `your_avana_io_password`
   - Test the connection to ensure it works.

5. **Import the SQL dump file:**
   - In MySQL Workbench, select your new connection and open it.
   - Go to `Server > Data Import`.
   - Select `Import from Self-Contained File` and choose the `dump.sql` file located in the project directory.
   - Choose the target schema (database) that you created on Avana.io.
   - Start the import process to create the necessary tables and populate them with data.

6. **Configure environment variables:**
   - Create a `.env` file in the root directory of your project and add the following:
     ```env
     DB_HOST=your_avana_io_host
     DB_USER=your_avana_io_username
     DB_PASS=your_avana_io_password
     DB_NAME=volcanoes
     JWT_SECRET=your_jwt_secret
     SERVER_PORT=3001
     MYSQL_PORT=your_avana_io_port
     ```
   - Replace `your_avana_io_host`, `your_avana_io_username`, `your_avana_io_password`, `your_jwt_secret`, and `your_avana_io_port` with the actual values provided by Avana.io.

7. **Run the application:**
   ```bash
   npm start
   ```

## API Endpoints

### Data Endpoints
- `GET /countries`: Returns a list of all countries that are associated with one or more volcanoes, ordered alphabetically.
- `GET /volcanoes`: Returns a list of volcanoes that are associated with the queried country. The country query parameter is required. The list can optionally be filtered by using the populatedWithin query parameter. This will return a filtered list of volcanoes that have at least one person living within the provided radius.
- `GET /volcano/:id`: Returns an object containing data for the queried volcano. If a valid JWT token is sent in the header of the request, population data for 5km, 10km, 30km and 100km is also provided. To test this using Swagger, click the green 'Authorize' button at the top of this page to enter your JWT token. A JWT token can be obtained by logging in. The path parameter (id) is required.

### Authentication Endpoints

- `POST /user/register`: Register a new user.
- `POST /user/login`: Authenticate a user and return a JWT token.
- `GET /user/:email/profile`: Retrieve user profile by email.
- `PUT /user/:email/profile`: Update user profile by email.

### Comments Endpoints

- `GET /comments/:id`: Retrieve comments and average rating for a specific volcano.
- `POST /comments/:id`: Add a comment and rating for a specific volcano (requires authentication).

### Administration

- `GET /me`: Retrieve the developer's name and email.

## Documentation

Swagger documentation is available at the root URL of the API. Visit `https://volcanoes-restful-api.onrender.com/` to access the interactive API documentation and explore the available endpoints.

## Deployment

The application is deployed on Render and can be accessed at:
[https://nodejs-express-volcanoes-restful-api.onrender.com/](https://nodejs-express-volcanoes-restful-api.onrender.com/)

## Acknowledgements

The volcanoes dataset is provided by the Smithsonian Institution's Global Volcanism Program. Visit [volcano.si.edu](https://volcano.si.edu/) for more information.





