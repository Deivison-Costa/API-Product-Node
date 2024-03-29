# Product Management API
- This is a RESTful API for managing products, developed using Node.js and Express. It allows you to perform CRUD operations on products, authenticate users with JWT, and includes features like pagination, caching, sorting and file uploads.

## Note 1
- Create an `.env` at the root of the project containing the `PORT`, `MONGODB_URI` and `JWT_SECRET` declarations.

## Installation
### Ensure you have Node.js and npm on your system:
```bash
node -v
npm -v
```
### Clone this repository to your local machine:
```bash
git clone https://github.com/Deivison-Costa/Technical-Challenge.git
```
### Navigate to the project directory in your terminal:
```bash
cd Technical-Challenge/api-produto
```
### Run the following command to install dependencies:
```bash
npm install
```

## Usage
- Configure nodemon in `package.json` to start the application from app.js with `"start": "nodemon app.js"` and supertest with `"test": "jest" ` to run automated tests.
- The server will be running at http://localhost:3000 by default.
### Start the server by running the following command:
```bash
npm start
```
or (to load the automated tests):
```bash
npm test
```
- Without caching, executing the 6 test cases took 2,888 s:

![ExecTests](https://github.com/Deivison-Costa/Technical-Challenge/blob/main/ExecTests.png?raw=true)

- With cache, executing the 6 test cases took 2,549 s (339 ms faster):

![ExecTestsCaching](https://github.com/Deivison-Costa/Technical-Challenge/blob/main/ExecTestsCaching.png?raw=true)

- In addition to these automated tests, 5 others were later implemented to validate the challenge's requirements.

## Manual Testing (with cURL)
### Register a new user:
```bash
curl -X POST -H "Content-Type: application/json" -d "{"username":"your_username","password":"your_password"}" http://localhost:3000/auth/register
```
### Login with the registered user:
```bash
curl -X POST -H "Content-Type: application/json" -d "{"username":"your_username","password":"your_password"}" http://localhost:3000/auth/login
```
### Use the obtained JWT token to access protected endpoints:
```json
{"token": "YourTokenJWT"}
```
### List products with pagination:
```bash
curl -X GET -H "Authorization: YourTokenJWT "http://localhost:3000/products?page=1&limit=10&sortBy=name&sortOrder=asc""
```
### Create a new product:
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: YourTokenJWT" -d "{"name":"Product Name","description":"Product Description","price":19.99}" http://localhost:3000/products
```
### Update an existing product:
```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: YourTokenJWT" -d "{"name":"New Product Name","description":"New Product Description","price":29.99}" http://localhost:3000/products/PRODUCT_ID
```
### Delete an existing product:
```bash
curl -X DELETE -H "Authorization: YourTokenJWT" http://localhost:3000/products/PRODUCT_ID
```

## Note 2
- Ensure to replace "your_username", "your_password", "YourTokenJWT", and "PRODUCT_ID" with appropriate values.
- Modify the base URL or port number if your server is running on a different address.

## Dependencies

### Here are the dependencies used in the project:

- **bcryptjs**: A library for hashing and salting user passwords.
- **body-parser**: Middleware for parsing incoming request bodies in Express.js.
- **dotenv**: Loads environment variables from a .env file into process.env.
- **express**: Web framework for Node.js, used for building APIs and web applications.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT) used for user authentication.
- **mongoose**: An object modeling tool for MongoDB, used for interacting with MongoDB databases.
- **multer**: Middleware for handling multipart/form-data, primarily used for uploading files.
- **node-cache**: A caching library for Node.js applications.

### And here are the development dependencies:

- **jest**: A JavaScript testing framework.
- **nodemon**: Automatically restarts the server when changes are detected in the codebase during development.
- **supertest**: Library for testing HTTP servers, particularly useful for testing Express.js applications.
