# Product Management API
- This is a RESTful API for managing products, developed using Node.js and Express. It allows you to perform CRUD operations on products, authenticate users with JWT, and includes features like pagination, sorting and file uploads.

## Installation
1. Ensure you have Node.js and npm on your system:
```bash
node -v
npm -v
```
2. Clone this repository to your local machine:
```bash
git clone https://github.com/Deivison-Costa/Technical-Challenge.git
```
3. Navigate to the project directory in your terminal:
```bash
cd Technical-Challenge/api-produto
```
4. Run the following command to install dependencies:
```bash
npm install
```

## Usage
1. Start the server by running the following command:
```bash
npm start
```
- or (to load the automated tests):
```bash
npm test
```
- Note: Configure nodemon in `package.json` to start the application from app.js with `"start": "nodemon app.js"` and supertest with `"test": "jest" ` to run automated tests.

2. The server will be running at http://localhost:3000 by default.

## Manual Testing
1. Register a new user:
```bash
curl -X POST -H "Content-Type: application/json" -d "{"username":"your_username","password":"your_password"}" http://localhost:3000/auth/register
```
2. Login with the registered user:
```bash
curl -X POST -H "Content-Type: application/json" -d "{"username":"your_username","password":"your_password"}" http://localhost:3000/auth/login
```
3. Use the obtained JWT token to access protected endpoints:
```json
{"token": "YourTokenJWT"}
```
4. List products with pagination:
```bash
curl -X GET -H "Authorization: YourTokenJWT "http://localhost:3000/products?page=1&limit=10&sortBy=name&sortOrder=asc""
```
5. Create a new product:
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: YourTokenJWT" -d "{"name":"Product Name","description":"Product Description","price":19.99}" http://localhost:3000/products
```
6. Update an existing product:
```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: YourTokenJWT" -d "{"name":"New Product Name","description":"New Product Description","price":29.99}" http://localhost:3000/products/PRODUCT_ID
```
7. Delete an existing product:
```bash
curl -X DELETE -H "Authorization: YourTokenJWT" http://localhost:3000/products/PRODUCT_ID
```
## Note
- Create an `.env` at the root of the project containing the `PORT`, `MONGODB_URI` and `JWT_SECRET` declarations.
- Ensure to replace "your_username", "your_password", "YourTokenJWT", and "PRODUCT_ID" with appropriate values.
- Modify the base URL or port number if your server is running on a different address.
