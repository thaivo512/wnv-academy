# Dang nhap bang Google:

> METHOD: POST

> ENDPOINT: localhost:3000/api/auth/gg-oauth

> BODY: 
```json
{
    "gg_token": "google token"
}
```

> RESPONSE:

```json
{
    is_success: false,
    message: "Google token khong hop le"
}
```
```json
{
    is_success: false,
    message: "Email nay da bi chan!!!"
}
```

```json
{
    is_success: true,
    access_token : "accessToken",
    refresh_token: "refreshToken"
}
```

```json
{
    is_success: true,
    access_token : null,
    refresh_token: null
}
```

> Luu y: Neu **is_success: true** nhung  **access_token: null** thi tuc la lan dau user su dung dang nhap bang google. Can hien man hinh cho user nhap username, password roi request lai voi body
```json
{
    gg_token: "google token",
    username: "username",
    password: "password"
}
```