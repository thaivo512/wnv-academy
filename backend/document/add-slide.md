# Them tai lieu khoa hoc:

> METHOD: POST

> ENDPOINT: localhost:3000/api/slide

> HEADER: x-access-token (yeu cau role TEACHER)

> BODY: 
```json
{
    "course_id": 2,
    "slide_name": "Chương 1. Nhập môn React",
    "file_name": "NhapMonReact.pdf",
    "file_url": "https://wnc-anc.com/inassassd",
    "is_allow_preview": false
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
    "slide_name": "Chương 1. Nhập môn React",
    "file_name": "NhapMonReact.pdf",
    "file_url": "https://wnc-anc.com/inassassd",
    "is_allow_preview": false
}
```