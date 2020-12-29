# Them khoa hoc vao danh sach yeu thich:

> METHOD: POST

> ENDPOINT: localhost:3000/api/course/watchlist

> HEADER: x-access-token (yeu cau role STUDENT)

> BODY: 
```json
{
    "course_id": 2
}
```

> RESPONSE:

```json
Khoa hoc k ton tai, Khoa hoc da bi go bo
{
    "is_success": false,
    "message": "Ban khong the luu khoa hoc nay"
}
```

```json
{
    "is_success": false,
    "message": "Ban da luu khoa hoc nay roi"
}
```

```json
{
    "is_success": true
}
```