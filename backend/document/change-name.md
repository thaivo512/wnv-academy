# Thay doi ten:

> METHOD: PUT

> ENDPOINT: localhost:3000/api/user/change-name

> HEADER: x-access-token

> BODY: 
```json
{
    "name": "Hxo De Cuoly"
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