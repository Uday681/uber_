# uber_
## BACKEND API Documentation

## `/user/register` EndPoint 

##  Description

Registers a new user with the specified email address and password for the  specified account 

### HTTP Method

`POST`

### Request Body

The request must be sent in JSON format and should include the following fields:

- `fullName` (object):
    - `firstName` (String,Required): User's first name (minimum 3 characters)
    - `lastName`  (String,Required): User's last name (minimum 3 characters)
- `email`  (String,Required): User's email address (must be a valid email format)
- `password` (String,Required): User's password (minimum 5 characters)

### Examples Response

#### Successful Registration (Status Code: 201)

- `user` :
    - `id` (Integer,Required): Unique identifier for the user
    - `fullName` (object):
        - `firstName` (String): User's first name(minimum 3 characters)
        - `lastName`  (String): User's last name(minimum 3 characters)
    - `email`  (String): User's email address (must be a valid email format)
    - `password` (String): User's password (minimum 5 characters)
- `token` (String): JWT Token



## `/user/login` EndPoint

### Description

Authenticates a user and provides a JWT token for subsequent API calls.

### HTTP Method

`POST`

### Request Body

The request must be sent in JSON format and should include the following fields:

- `email` (String,Required): User's registered email address
- `password` (String,Required): User's password (minimum 5 characters)

### Examples Response
#### Successful Login (Status Code: 200)

- `user` (object):
    - `id` (Integer,Required): Unique identifier for the user
    - `fullName` (object):
        - `firstName` (String): User's first name
        - `lastName`  (String): User's last name
    - `email`  (String): User's email address
    - `password` (String): User's password hash (optional)
- `token` (String): JWT Token




## `/user/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`
            ### or
Automatically taken cookies from the server
`Cookie: token=<token>`

### Examples Response

#### Successful Response (Status Code: 201)

Returns the user object containing:
- `id` (Integer): Unique identifier for the user
- `fullName` (object):
    - `firstName` (String): User's first name
    - `lastName` (String): User's last name
- `email` (String): User's email address



## `/user/logout` Endpoint

### Description

Logs out the currently authenticated user by invalidating their JWT token.

### HTTP Method

`GET`

### Authentication

Requires either:
- JWT token in cookies as 'token'
- JWT token in Authorization header: `Authorization: Bearer <token>`

### Examples Response

#### Successful Logout (Status Code: 201)
- `message`: `success message`