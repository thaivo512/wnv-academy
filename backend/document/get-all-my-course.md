# Lay thong tin cua user theo ID:

> METHOD: GET

> ENDPOINT: localhost:3000/api/course/

> HEADER: x-access-token (yeu cau role TEACHER)

> PATH VARIABLE: id

> BODY: None

> RESPONSE:
 


```json
{
    is_success: true,
    data: [
	  {
	    "id": 2,
	    "name": "Khoa hoc Reactjs 2",
	    "image_avatar": "https://images2",
	    "short_description": "Day la mo ta ngan gon 2",
	    "detail_description": "Day la mo ta cu the 2",
	    "price": 350002,
	    "price_promote": 350002,
	    "last_update": 1609053572166,
	    "status": "PUBLIC",
	    "view_count": 3,
	    "category_id": 8,
	    "teacher_id": 24,
	    "search_term": "khoa hoc reactjs 2",
	    "total_enrol": 1,
	    "total_feedback": 1,
	    "avg_feedback": 4,
	    "category": {
	      "id": 8,
	      "name": "Lập trình web"
	    },
	    "teacher": {
	      "id": 24,
	      "name": "Ikc Cuoly"
	    }
	  },
	  {
	    "id": 1,
	    "name": "Khoa hoc Angular",
	    "image_avatar": "https://images2",
	    "short_description": "Day la mo ta ngan gon 2",
	    "detail_description": "Day la mo ta cu the 2",
	    "price": 350002,
	    "price_promote": 350002,
	    "last_update": 1609053572166,
	    "status": "PUBLIC",
	    "view_count": 3,
	    "category_id": 8,
	    "teacher_id": 24,
	    "search_term": "khoa hoc angular",
	    "total_enrol": 0,
	    "total_feedback": 0,
	    "avg_feedback": null,
	    "category": {
	      "id": 8,
	      "name": "Lập trình web"
	    },
	    "teacher": {
	      "id": 24,
	      "name": "Ikc Cuoly"
	    }
	  }
	]
}
```
