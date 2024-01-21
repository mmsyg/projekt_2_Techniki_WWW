# Contact Management Application

This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a simple and intuitive interface for users to manage their personal contacts.

## Features

- **User Authentication**: Secure login and signup functionality with JWT (JSON Web Token) for handling user sessions.
- **Contact Management**: Users can add, view, update, and delete personal contacts. Each contact includes details like name, phone number, email, and address.
- **Search Functionality**: Easily search for contacts using attributes like name, phone number, or address.
- **Responsive Design**: The application is designed to be responsive and user-friendly, ensuring a great experience on both desktop and mobile devices.

## Technologies

- **Frontend**: The user interface is built using React.js. It provides a dynamic and interactive experience and uses React Router for navigation.
- **Backend**: The server-side logic is implemented in Node.js with Express.js framework, handling RESTful API requests and responses.
- **Database**: MongoDB is used for storing and retrieving data. Mongoose ODM (Object Data Modeling) is utilized to manage relationships between data and translate between objects in code and MongoDB documents.
- **Authentication**: JWT is used for securing APIs and managing user sessions.
- **Environment Variables**: Environment variables are used to manage sensitive data and configurations.

## Getting Started

To run this application locally, you'll need to have Node.js and MongoDB installed. Clone the repository, install dependencies, and set up your environment variables as per the instructions below.

```bash

# Navigate to the project directory
cd projekt_2_Techniki_WWW

# Install dependencies
cd server 

npm install

#Start Server
npm run dev

# Add a .env file in the root directory (i send it in email)

# Start the application
cd ..

cd client

npm install

npm start
