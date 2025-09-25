# User Admin Portal Backend

Welcome to the user-admin-portal-backend repository—the core of an admin portal that manages users, categories, and products through a REST API. This project is built with Node.js, Express, and TypeScript, uses MongoDB via Mongoose for data storage, and secures endpoints with JSON Web Tokens (JWT).

# Overview

The API exposes CRUD (Create, Read, Update, Delete) operations for the system’s three main resources:

- Users — Registration, login, and profile management.

- Categories — Group products by type. The name is enforced as unique, and deleting categories that have associated products is prevented.

- Products — Include name, description, price, and a reference to a category. Products are returned with their category already populated.

Authentication is implemented with JWT. To access protected routes, send an Authorization: Bearer <token> header with the token returned by the login endpoint.

## Installation

- **Clone the repository**
```bash
git clone <URL>/user-admin-portal-backend.git
cd user-admin-portal-backend
```

- **Install dependencies**
```bash
npm install
```

- **Create a `.env` file**

Create a `.env` file at the project root with the required environment variables:
```bash
MONGO_URI=mongodb://localhost:27017/user-admin-portal-db
JWT_SECRET=yourSuperSecureSecret
```

If you use MongoDB Atlas, replace the local URI with your cluster connection string.

- **Development mode**

Run the API with auto-reload via `ts-node-dev`:
```bash
npm run dev
```

The server will start at `http://localhost:3000` and will print a message in the console if the MongoDB connection is successful.

## Main Endpoints

The table below summarizes the available endpoints. Descriptions are brief; details are provided in later sections. Any request with a body must include the header **Content-Type: application/json**.

| Method | Route                   | Purpose               | Auth |
| :----: | :---------------------- | :-------------------- | :--: |
| `POST` | `/api/users/register`   | Register user         |  No  |
| `POST` | `/api/users/login`      | Login (JWT)           |  No  |
| `GET`  | `/api/users`            | List users            | Yes  |
| `GET`  | `/api/users/:id`        | Get user by ID        | Yes  |
| `PUT`  | `/api/users/:id`        | Update user           | Yes  |
| `DELETE` | `/api/users/:id`      | Delete user           | Yes  |
| `POST` | `/api/categories`       | Create category       | Yes  |
| `GET`  | `/api/categories`       | List categories       |  No  |
| `GET`  | `/api/categories/:id`   | Get category by ID    |  No  |
| `PUT`  | `/api/categories/:id`   | Update category       | Yes  |
| `DELETE` | `/api/categories/:id` | Delete category       | Yes  |
| `POST` | `/api/products`         | Create product        | Yes  |
| `GET`  | `/api/products`         | List products         |  No  |
| `GET`  | `/api/products/:id`     | Get product by ID     |  No  |
| `PUT`  | `/api/products/:id`     | Update product        | Yes  |
| `DELETE` | `/api/products/:id`   | Delete product        | Yes  |

## Create Folder

**Overview**

Endpoints to **create** resources. All accept **JSON** and respond with the created object or a success message.  
**Required headers:**

- `Content-Type: application/json`
- `Authorization: Bearer` _(only for Category/Product; User register/login do not require a token)_

### ▸ Create User

- **POST** `{{BASE_URL}}/api/users/register`
- **Body (JSON):**
```json
{
  "name": "Gerardo",
  "username": "gera123",
  "email": "gera@test.mx",
  "password": "123456"
}
```

---

### ▸ Login User

- **POST** `{{BASE_URL}}/api/users/login`
- **Body (JSON):**
```json
{
  "email": "gera@test.mx",
  "password": "123456"
}
```

---

### ▸ Create Category

- **POST** `{{BASE_URL}}/api/categories`
- **Headers:** include `Authorization: Bearer`
- **Body (JSON):**
```json
{
  "name": "Electronics",
  "description": "Devices and gadgets"
}
```

---

### ▸ Create Product

- **POST** `{{BASE_URL}}/api/products`
- **Headers:** `Authorization: Bearer`
- **Body (JSON):**
```json
{
  "name": "iPhone",
  "description": "Smartphone",
  "price": 1200,
  "category": "<CATEGORY_ID>"
}
```
## Read Folder

**Overview**

Endpoints to **list** resources. They return arrays. The `users` response hides the password.

**Recommended headers:**

- `Authorization: Bearer` _(Users requires a token; Categories/Products can be public depending on your configuration)_

---

### ▸ Read User

- **GET** `{{BASE_URL}}/api/users`
- **Headers:** `Authorization: Bearer`

### ▸ Read Category

- **GET** `{{BASE_URL}}/api/categories`

### ▸ Read Product

- **GET** `{{BASE_URL}}/api/products`

## Update Folder

**Overview**

Endpoints to **partially update** (PUT) by `:id`. Send **only** the fields you want to modify. Users re-hash `password` if included.

---

### ▸ Update User

- **PUT** `{{BASE_URL}}/api/users/:id`
- **Sample body (JSON):**
```json
{
  "name": "Gera Updated",
  "username": "gera_pro",
  "email": "gera.pro@polyverso.mx",
  "password": "newPass123"
}
```

### ▸ Update Category

- **PUT** `{{BASE_URL}}/api/categories/:id`
- **Sample body (JSON):**
```json
{
  "name": "Electronics & Gadgets",
  "description": "Updated desc"
}
```

### ▸ Update Product

- **PUT** `{{BASE_URL}}/api/products/:id`
- **Sample body (JSON):**
```json
{
  "name": "iPhone 16 Pro",
  "price": 1299,
  "description": "Dark titanium",
  "category": "<CATEGORY_ID>"
}
```

## Delete Folder

**Overview**

Endpoints to **delete** by `:id`. They return **204 No Content** on success. Categories are not deleted if they are in use by products.

**Required headers:**

- `Authorization: Bearer`

---

### ▸ Delete User

- **DELETE** `{{BASE_URL}}/api/users/:id`

### ▸ Delete Category

- **DELETE** `{{BASE_URL}}/api/categories/:id`

### ▸ Delete Product

- **DELETE** `{{BASE_URL}}/api/products/:id`


## Get by ID Folder

**Overview**

Endpoints to **retrieve a specific resource** by `:id`.

**Headers:**

- `Authorization: Bearer` _(required for Users; others depend on your configuration)_

---

### ▸ Get User by ID

- **GET** `{{BASE_URL}}/api/users/:id`

### ▸ Get Category by ID

- **GET** `{{BASE_URL}}/api/categories/:id`

### ▸ Get Product by ID

- **GET** `{{BASE_URL}}/api/products/:id`

## Deployment

To deploy this project run

```bash
npm run deploy
```
