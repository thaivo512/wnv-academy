# Lay tat ca user he thong:

> METHOD: GET

> ENDPOINT: localhost:3000/api/user

> HEADER: x-access-token (yeu cau role ADMIN)

> QUERY PARAMETER: 
```
+ is_active: true | false | null.
+ role: ADMIN | TEACHER | STUDENT | null.
```

> BODY: None

> RESPONSE:

```json
[
    {
        is_success: true,
        id: "id",
        username: "username",
        name: "name",
        email: "email",
        role: "role"
    }
]
```