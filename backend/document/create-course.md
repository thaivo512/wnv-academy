# Them khoa hoc:

> METHOD: POST

> ENDPOINT: localhost:3000/api/course

> HEADER: x-access-token (yeu cau role TEACHER)

> BODY: 
```json
{
    "name": "Khoa hoc Reactjs",
    "image_avatar": "https://images",
    "short_description": "Day la mo ta ngan gon",
    "detail_description": "Day la mo ta cu the",
    "price": 350000,
    "price_promote": 350000,
    "category_id": 8
}
```

> RESPONSE:

```json
Co the user da bi xoa
{
    "is_success": false,
    "message": "Khong tim thay linh vuc yeu cau"
}
```

```json
{
    "is_success": false,
    "message": "Linh vuc yeu cau khong hop le"
}
```

```json
{
    "is_success": true,
    "id": 1,
    "name": "Khoa hoc Reactjs",
    "image_avatar": "https://images",
    "short_description": "Day la mo ta ngan gon",
    "detail_description": "Day la mo ta cu the",
    "price": 350000,
    "price_promote": 350000,
    "category_id": 8
}
```