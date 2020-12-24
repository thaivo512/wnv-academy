# Lay tat ca linh vuc

> METHOD: GET

> ENDPOINT: {{wnc}}/api/category

> HEADER: x-access-token

> BODY: NONE

> RESPONSE:

```json
[
    {
        "id": 6,
        "name": "Lập trình",
        "parent_id": null,
        "sub_categorys": [
            {
                "id": 8,
                "name": "Lập trình web"
            },
            {
                "id": 9,
                "name": "Lập trình di động"
            },
            {
                "id": 10,
                "name": "Lập trình game"
            }
        ]
    },
    {
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
]
```