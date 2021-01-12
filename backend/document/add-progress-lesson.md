# Cap nhat tien trinh hoc:

> METHOD: POST

> ENDPOINT: localhost:3000/api/progress

> HEADER: x-access-token (yeu cau role STUDENT)

> BODY: 
```json
{
    "lesson_id": 2,
    "progress_time": 70,
    "is_done": true
}
```

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khong tim thay bai hoc yeu cau"
}
```

```json
{
    "is_success": true
}
```