# Tao linh vuc con

> METHOD: POST

> ENDPOINT: {{wnc}}/api/category/:id

> HEADER: x-access-token (yeu cau role ADMIN)

> BODY: 
```json
{
    "name": "Thiết kế"
}
```

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Ten linh vuc nay da ton tai"
}
```
```json
{
    "is_success": false,
    "message": "Linh vuc goc khong tim thay"
}
```
```json
{
    "is_success": false,
    "message": "Linh vuc goc khong hop le"
}
```

```json
{
    "is_success": true,
    "id": "category_id",
    "name": "category_name"
}
```