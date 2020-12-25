# Yeu cau gui ma OTP ve email:

> METHOD: POST

> ENDPOINT: localhost:3000/api/user/request-otp

> HEADER: None

> BODY: 
```json
{
    "email": "asdasd@gmail.com"
}
```

> RESPONSE:

```json
Email chua duoc dang ky
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