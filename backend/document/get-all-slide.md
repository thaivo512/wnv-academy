# Lay tat ca tai lieu khoa hoc:

> METHOD: GET

> ENDPOINT: localhost:3000/api/slide/:course_id

> HEADER: x-access-token

> PATH VARIABLE: course_id

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
    "slides": [
        {
            "id": 1,
            "course_id": 2,
            "slide_name": "Chương 1. Nhập môn React",
            "file_name": "NhapMonReact.pdf",
            "file_url": "https://wnc-anc.com/inassassd",
            "is_allow_preview": false
        }
    ]
}
```
