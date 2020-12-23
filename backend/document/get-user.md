# Lay thong tin cua user theo ID:

> METHOD: GET

> ENDPOINT: localhost:3000/api/user/:id

> HEADER: x-access-token (yeu cau role ADMIN)

> PATH VARIABLE: id

> BODY: None

> RESPONSE:

```json
Co the user da bi xoa
{
    is_success: false,
    message: "Khong tim thay user"
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