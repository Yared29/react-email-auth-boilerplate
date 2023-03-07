# React-email-auth-boilerplate

The React email auth boilerplate project provides a starting point for building secure web applications that require user authentication. It includes functionality for email verification, and user registration.

## Functionalities

The project includes the following functionalities:

- Registration for users
- Email verification
- Error checking for forms
- Server-side form error handling
- Storage of user data in local storage
- Checking for private routes
- Checking for public routes

## Environment Variables

To run this project, you will need to add the following environment variables in server directory to your .env file

```bash
    PORT = "Server Running PORT"
    MONGO_URI = "MongoDB URL (local or from mongo atlas)"
    JWT_SECRET = "Secret for JWT token"
    NODEMAILER_SECRET = "Secret for Nodemailer"
    NODEMAILER_NAME = "Email title"
    NODEMAILER_EMAIL = "Your organization email"
    NODEMAILER_PASS = "Your organization email password"
    CLIENT_URL = "Your react client URL"
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Yared29/react-email-auth-boilerplate.git
```

Go to the project directory

```bash
  cd react-email-auth-boilerplate
```

Go to the client directory install dependencies

```bash
  cd client && npm install
```

In a diffrent terminal go to the server directory install dependencies

```bash
  cd server && npm install
```

In the server directory to start the server

```bash
  npm run server
```

In the client directory to start the client

```bash
  npm run dev
```

## Tech Stack Client

**Framework:** React

**Build Tool:** Vite

**Form Library:** Formik

**Form Validation:** Yup

**API Request:** Axios

## Tech Stack Server

**Runtime Env:** NodeJS

**Database:** MongoDB

**Encryption:** Bcryptjs

**Send Emails:** Nodemailer

**RESTful APIs Build:** Express

## Screenshots

|                                                                                                                  |                                                                                                                              |                                                                                   |
| :--------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
|         <img width="1604" alt="Registration Page" src="screenshots\Register-page.png"> Registration Page         |                       <img width="1604" alt="Login Pgae" src="screenshots\Login-page.png"> Login Page                        |  <img width="1604" alt="Form Error" src="screenshots\Form-error.png"> Form Error  |
| <img width="1604" alt="Verification Email Sent" src="screenshots\Verification-sent.png"> Verification Email Sent |                   <img width="1604" alt="Not Activated" src="screenshots\Not-activated.png"> Not Activated                   | <img width="1604" alt="Gmail" src="screenshots\Gmail.png"> Gmail activation email |
|       <img width="1604" alt="Account Activated" src="screenshots\Account-activated.png"> Account Activated       | <img width="1604" alt="Account already activated" src="screenshots\Account-already-activated.png"> Account ALready Activated |        <img width="1604" alt="Home" src="screenshots\Home.png"> Home Page         |
