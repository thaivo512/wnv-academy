# Dang nhap:

> METHOD: POST

> ENDPOINT: localhost:3000/api/auth/sign-in

> BODY: 
```json
{ 
    "username": "hxo83042",
    "password": "hxo83042"
}
```

> RESPONSE:

```json
{
    is_success: false,
    message: "Username hoac password khong dung"
}
```

```json
{
    is_success: true,
    access_token : "accessToken",
    refresh_token: "refreshToken"
}
```