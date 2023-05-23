# API Documentation

## User Registration

Registers a new user with the given email, password and roles.

- **Endpoint**: `POST /auth/register`

### Request

- **Headers**

  ```
  Content-Type: application/json
  ```

- **Body**

  ```
  {
      "email": "admin.test@mail.com",
      "password": "123456",
      "roles": ["Admin"]
  }
  ```

### Response

- **Status Codes**

  ```
  200 OK
  ```

  ```
  400 Bad Request
  ```

## User Login

Logs in an existing user with the given email and password.

- **Endpoint**: `POST /auth/login`

### Request

- **Headers**

  ```
  Content-Type: application/json
  ```

- **Body**

  ```
  {
      "email": "admin.test@mail.com",
      "password": "123456"
  }
  ```

### Response

- **Status Codes**

  ```
  200 OK
  ```

  ```
  400 Bad Request
  ```
