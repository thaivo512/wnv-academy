# Lay video bai giang:

> METHOD: GET

> ENDPOINT: localhost:3000/api/lesson/:course_id/:lesson_id

> HEADER: x-access-token

> PATH VARIABLE: course_id, lesson_id

> BODY: None

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Ban khong co quyen de xem"
}
```

```json
{
    "is_success": false,
    "message": "Ban can dang ky khoa hoc de xem"
}
```

```json
{
    "is_success": true,
    "id": 1,
    "course_id": 2,
    "lesson_name": "Chương 2. Các khái niệm cơ bản React",
    "file_name": "CacKhaiNiemCoBan.pdf",
    "file_url": "https://wnc-anc.com/1213inassassd"
}
```
