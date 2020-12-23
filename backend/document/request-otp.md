# Yeu cau gui ma OTP ve email:

> METHOD: POST

> ENDPOINT: localhost:3000/api/user/request-otp

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
OTP da gui ve email user
{
    is_success: true
}
```