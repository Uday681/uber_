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