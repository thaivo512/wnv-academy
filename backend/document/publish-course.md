# Publish khoa hoc cho phep moi nguoi dang ki:
> **Luu y:** *Sau khi publish khong the chinh sua*

> METHOD: PUT

> ENDPOINT: localhost:3000/api/course/:id/publish

> HEADER: x-access-token (yeu cau role TEACHER)

> BODY: NONE

> RESPONSE:

```json
{
    "is_success": false,
    "message": "Khoa hoc da hoan thanh khong the sua doi"
}
```

```json
{
    "is_success": true
}
```