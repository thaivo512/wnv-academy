# Cap nhat linh vuc

> METHOD: PUT

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
    "is_success": true
}
```