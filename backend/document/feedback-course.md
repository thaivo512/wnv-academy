# Danh gia khoa hoc:

> METHOD: POST

> ENDPOINT: localhost:3000/api/feedback

> HEADER: x-access-token (yeu cau role STUDENT)

> BODY: 
```json
{
    "course_id": 2,
    "review": "Khoa hoc ngon lanh",
    "rate": 4
}
```

> RESPONSE:

```json
Khoa hoc k ton tai, Khoa hoc da bi go bo
{
    "is_success": false,
    "message": "Ban khong the danh gia khoa hoc nay"
}
```

```json
{
    "is_success": false,
    "message": "Ban chua dang ky khoa hoc nen khong the danh gia"
}
```

```json
{
    "is_success": true
}
```