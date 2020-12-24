# Xem chi tiet linh vuc

> METHOD: GET

> ENDPOINT: {{wnc}}/api/category/:id

> HEADER: x-access-token

> BODY: NONE

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khong tim thay linh vuc yeu cau"
}
```

```json
{
    "is_success": true,
    "id": 7,
    "name": "Thiết kế",
    "parent_id": null,
    "sub_categorys": [
        {
            "id": 11,
            "name": "Thiết kế web"
        },
        {
            "id": 12,
            "name": "Thiết kế game"
        },
        {
            "id": 13,
            "name": "Thiết kế đồ họa 3D"
        }
    ]
}
```