# Lay tat ca tai lieu mon hoc duoc phep xem preview:

> METHOD: GET

> ENDPOINT: localhost:3000/api/course/slide/:course_id/:slide_id

> HEADER: x-access-token

> PATH VARIABLE: course_id, slide_id

> BODY: None

> RESPONSE:

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
            "is_allow_preview": true
        }
    ]
}
```
