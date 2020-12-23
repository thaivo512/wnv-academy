# Lam moi token:

> METHOD: POST

> ENDPOINT: localhost:3000/api/auth/refresh

> BODY: 
```json
{
    "access_token": "accessToken",
    "refresh_token": "refreshToken"
}
```

> RESPONSE:

```json
{
    isSuccess: false,
    message: "Access token khong hop le."
}
```

```json
{
    isSuccess: false,
    message: "Refresh token khong hop le."
}
```

```json
{
    is_success: true,
    access_token : "accessToken"
}
```