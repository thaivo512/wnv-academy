# Doi mat khau:

> METHOD: POST

> ENDPOINT: localhost:3000/api/user/reset-password

> HEADER: x-access-token

> BODY: 
```json
{
    "old_password": "hxo83042",
    "new_password": "hxo83042"
}
```

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
    is_success: false,
    message: "Mat khau cu khong dung"
}
```


```json
{
    is_success: true,
    access_token: "accessToken",
    refresh_token: "refreshToken"
}
```