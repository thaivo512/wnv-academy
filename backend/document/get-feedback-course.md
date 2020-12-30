# Lay danh gia khoa hoc:

> METHOD: GET

> ENDPOINT: localhost:3000/api/course/feedback/:courseId

> HEADER: x-access-token

> BODY: NONE 

> RESPONSE:

```json
{
    "is_success": true,
    "data": [
        {
            "user_id": 25,
            "course_id": 2,
            "review": "Khoa hoc ngon lanh",
            "rate": 4,
            "last_update": "1609329141384"
        }
    ]
}
```