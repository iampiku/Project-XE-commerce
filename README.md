# Project-XE-commerce
Final year Project an E-commerce Web application build on MERN stack.

## Run As In Dev Mode
```bash
yarn dev
```
## Start The Project
```bash
yarn start
```

# Backend API Docs

### To start the script
```bash
yarn dev:server
```

## Authentication API
- To Get all users (Developement Only)
```bash
GET /api/users HTTP/1.1
Host: localhost:5000
```

- Signup Auth
```bash
POST /api/auth/signup HTTP/1.1
Content-Type: application/json
Host: localhost:5000
Content-Length: 98

{
	"name": "Sudip Nath",
	"email": "c@c.com",
	"password": "1234",
	"username": "sounishnath003"
}
```

- Login User
```bash
POST /api/auth/login HTTP/1.1
Content-Type: application/json
Host: localhost:5000
Content-Length: 54

{
	"username": "sounishnath003",
	"password": "1234"
}
```

- Logout User Session
```bash
POST /api/auth/logout HTTP/1.1
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiOGE5ZDI1LTBiN2QtNGFkMi1hZDAxLWE2ZmYzOWU4MTliOCIsInVzZXJuYW1lIjoic291bmlzaG5hdGgwMDMiLCJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE2MTgzMDQxODZ9.PKWxt1BHXKzpt2FT1LsUyqbX5xvzfUDaPwEkUAEtoJM 
Host: localhost:5000
```

- Reset Password
```bash
POST /api/auth/reset-password HTTP/1.1
Content-Type: application/json
Host: localhost:5000
Content-Length: 54

{
	"username": "sounishnath003",
	"email": "a@a.com"
}
```

# Frontend