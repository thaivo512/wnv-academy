# Tao linh vuc goc

> METHOD: POST

> ENDPOINT: {{wnc}}/api/category

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
    "is_success": true,
    "id": "category_id",
    "name": "category_name"
}
```