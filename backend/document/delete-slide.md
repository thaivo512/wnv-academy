# Xoa tai lieu mon hoc:

> METHOD: DELETE

> ENDPOINT: localhost:3000/api/course/slide/:course_id/:slide_id

> HEADER: x-access-token (yeu cau role TEACHER)

> PATH VARIABLE: course_id, slide_id

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