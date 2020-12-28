# Them video bai giang cho khoa hoc:

> METHOD: POST

> ENDPOINT: localhost:3000/api/course/lesson

> HEADER: x-access-token (yeu cau role TEACHER)

> BODY: 
```json
{
    "course_id": 2,
    "lesson_name": "Chương 2. Các khái niệm cơ bản React",
    "file_name": "CacKhaiNiemCoBan.pdf",
    "file_url": "https://wnc-anc.com/1213inassassd"
}
```

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khoa hoc da hoan thanh khong the sua doi"
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