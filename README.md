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

####  Captain

## `/captains/register` Endpoint 

### Description

Registers a new captain with vehicle details for the ride-sharing service.

### HTTP Method

`POST`

### Request Body

The request must be sent in JSON format and should include the following fields:

- `fullName` (object):
    - `firstName` (String, Required): Captain's first name (minimum 3 characters)
    - `lastName` (String, Required): Captain's last name (minimum 3 characters)
- `email` (String, Required): Captain's email address (must be a valid email format)
- `password` (String, Required): Captain's password (minimum 5 characters)
- `vehicle` (object):
    - `color` (String, Required): Vehicle color (minimum 3 characters)
    - `plate` (String, Required): Vehicle plate number (minimum 3 characters)
    - `capacity` (Number, Required): Vehicle passenger capacity (minimum 1)
    - `vehicleType` (String, Required): Type of vehicle (must be one of: 'motorcycle', 'car', 'auto')

### Examples Response

#### Successful Registration (Status Code: 201)

 `captain` (object):
    - `id` (Integer,Required): Unique identifier for the user
    - `fullName` (object):
        - `firstName` (String): User's first name
        - `lastName`  (String): User's last name
    - `email`  (String): User's email address
    - `password` (String): User's password hash (optional)
    - `vehicle` (object):
        - `color` (String): User's vehicle color
        - `plate` (String): User's vehicle plate number
        - `capacity` (Number): User's vehicle passenger capacity
        - `vehicleType` (String): User's vehicle vehicle type



## `/captains/login` Endpoint

### Description

Authenticates a captain and provides a JWT token for subsequent API calls.

### HTTP Method

`POST`

### Request Body

The request must be sent in JSON format and should include the following fields:

- `email` (String, Required): Captain's registered email address
- `password` (String, Required): Captain's password (minimum 5 characters)

### Examples Response

#### Successful Login (Status Code: 200)

 `captain` (object):
    - `id` (Integer,Required): Unique identifier for the user
    - `fullName` (object):
        - `firstName` (String): User's first name
        - `lastName`  (String): User's last name
    - `email`  (String): User's email address
    - `password` (String): User's password hash (optional)
    - `vehicle` (object):
        - `color` (String): User's vehicle color
        - `plate` (String): User's vehicle plate number
        - `capacity` (Number): User's vehicle passenger capacity
        - `vehicleType` (String): User's vehicle vehicle type
- `token` (String): JWT Token



#### Error Responses

- **400 Bad Request**: Validation errors in the request body
- **401 Unauthorized**: Invalid email or password
- **500 Internal Server Error**: Server-side errors


## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires either:
- JWT token in cookies as 'token'
- JWT token in Authorization header: `Authorization: Bearer <token>`

### Examples Response

#### Successful Response (Status Code: 201)

Returns the captain object containing:
- `id` (Integer): Unique identifier for the captain
- `fullName` (object):
    - `firstName` (String): Captain's first name
    - `lastName` (String): Captain's last name
- `email` (String): Captain's email address
- `status` (String): Captain's current status ('active' or 'inactive')
- `vehicle` (object):
    - `color` (String): Vehicle color
    - `plate` (String): Vehicle plate number
    - `capacity` (Number): Vehicle passenger capacity
    - `vehicleType` (String): Type of vehicle
- `location` (object, optional):
    - `lat` (Number): Latitude coordinate
    - `lng` (Number): Longitude coordinate


## `/captains/logout` Endpoint

### Description

Logs out the currently authenticated captain by invalidating their JWT token.

### HTTP Method

`GET`

### Authentication

Requires either:
- JWT token in cookies as 'token'
- JWT token in Authorization header: `Authorization: Bearer <token>`

### Examples Response

#### Successful Logout (Status Code: 201)
- `message` (String): 'Logged out successfully'



#### Error Responses

- **401 Unauthorized**: Invalid or missing token
- **500 Internal Server Error**: Server-side errors
