# Xac thuc email bang OTP:

> METHOD: POST

> ENDPOINT: localhost:3000/api/user/verify-email

> HEADER: x-access-token

> BODY: 
```json
{
    "otp_code": "441016"
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
    message: "OTP code khong hop le"
}
```


```json
{
    is_success: true,
    access_token: "accessToken",
    refresh_token: "refreshToken"
}
```