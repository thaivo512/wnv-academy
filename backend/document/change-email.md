# Thay doi email:

> METHOD: PUT

> ENDPOINT: localhost:3000/api/user/change-email

> HEADER: x-access-token

> BODY: 
```json
{
    "email": "Hxo De Cuoly"
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
    is_success: true,
    access_token: "accessToken"
}
```

> Luu y: Can hien man hinh cho user xac thuc OTP verify-email.md can phai call api request-otp.md