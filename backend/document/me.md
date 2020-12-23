# Lay thong tin cua chinh minh:

> METHOD: GET

> ENDPOINT: localhost:3000/api/user/me

> HEADER: x-access-token

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