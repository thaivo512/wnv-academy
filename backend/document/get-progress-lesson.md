# Lay tien trinh bai hoc:

> METHOD: GET

> ENDPOINT: localhost:3000/api/course/progress/:lessonId

> HEADER: x-access-token (yeu cau role STUDENT)

> BODY:  NONE

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khong co du lieu"
}
```

```json
{
    "is_success": true,
    "data": {
        "user_id": 25,
        "lesson_id": 2,
        "progress_time": 70,
        "is_done": true
    }
}
```