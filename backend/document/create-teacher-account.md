# Tao tai khoan TEACHER:

> METHOD: POST

> ENDPOINT: localhost:3000/api/user/teachers

> HEADER: x-access-token (yeu cau role ADMIN)

> BODY: 
```json
{
    "name": "Hxo Cuoly",
    "username": "hxo83042",
    "email": "hxo83042@cuoly.com",
    "password": "hxo83042"
}
```

> RESPONSE:

```json
{
    is_success: false,
    message: "Email da duoc dang ky!!!"
}
```

```json
{
    is_success: false,
    message: "Username da duoc dang ky!!!"
}
```

```json
{
    is_success: true,
    id: "id",
    username: "username",
    name: "name",
    email: "email",
    role: "role"
}
```