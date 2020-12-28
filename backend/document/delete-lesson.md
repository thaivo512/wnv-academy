# Xoa video bai giang:

> METHOD: DELETE

> ENDPOINT: localhost:3000/api/course/lesson/:course_id/:lesson_id

> HEADER: x-access-token (yeu cau role TEACHER)

> PATH VARIABLE: course_id, lesson_id

> BODY: None

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khoa hoc da hoan thanh khong the sua doi"
}
```

```json
{
    "is_success": false,
    "message": "Co loi xay ra. Thu lai sau"
}
```


```json
{
    "is_success": true
}
```