import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';

export const requestGetAllCourses = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'course', requestOptions);
        var courses = await response.json();
        if (courses == null) return;
        return courses.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetSlidesByCourseID = async (payload) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'slide/' + payload.id, requestOptions);
        var result = await response.json();
        if (result == null) return;
        return result.slides;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetLessonsByCourseID = async (payload) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'lesson/' + payload.id, requestOptions);
        var result = await response.json();
        if (result == null) return;
        return result.lessons;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetFeedbacksByCourseID = async (payload) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'feedback/' + payload.id, requestOptions);
        var result = await response.json();
        if (result == null) return;
        return result.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetAllCategories = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'category', requestOptions);
        var result = await response.json();
        if (result == null) return;
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostAddCourse = async (payload) => {
    var course = payload.course;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        body: JSON.stringify({
            name: course.courseName,
            image_avatar: course.avatar,
            short_description: course.shortDetail,
            detail_description: course.detail,
            price: parseInt(course.price),
            price_promote: parseInt(course.price - (course.price * (course.promoteRate / 100))),
            category_id: course.category
        }),
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'course', requestOptions);
        var result = await response.json();
        if (result == null && result.is_fail) return;
        toast.success("Add successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostUpdateCourse = async (payload) => {
    var course = payload.course;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        body: JSON.stringify({
            name: course.courseName,
            image_avatar: course.avatar,
            short_description: course.shortDetail,
            detail_description: course.detail,
            price: parseInt(course.price),
            price_promote: course.pricePromote,
            category_id: course.category
        }),
        method: 'PUT',
    };
    try {
        const response = await fetch(API_URL + 'course/' + course.id, requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Update successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requesPublishCourse = async (payload) => {
    var course = payload.course;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        method: 'PUT',
    };
    try {
        const response = await fetch(API_URL + 'course/' + course.id + '/publish', requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Publish successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestDeleteSlide = async (payload) => {
    var slide = payload.slide;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        method: 'DELETE',
    };
    try {
        console.log('slide/' + slide.course_id + '/' + slide.id);
        const response = await fetch(API_URL + 'slide/' + slide.course_id + '/' + slide.id, requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Delete successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestDeleteLesson = async (payload) => {
    var lesson = payload.lesson;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        method: 'DELETE',
    };
    try {
        const response = await fetch(API_URL + 'lesson/' + lesson.course_id + '/' + lesson.id, requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Delete successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostAddSlide = async (payload) => {
    var slide = payload.slide;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        body: JSON.stringify({
            slide_name: slide.slide_name,
            file_name: slide.file_name,
            file_url: slide.file_url,
            is_allow_preview: slide.is_allow_preview,
            course_id: slide.course_id
        }),
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'slide', requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Add successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostAddLesson = async (payload) => {
    var lesson = payload.lesson;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
        },
        body: JSON.stringify({
            course_id: lesson.course_id,
            lesson_name: lesson.lesson_name,
            file_name: lesson.file_name,
            file_url: lesson.file_url,
        }),
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'lesson', requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        toast.success("Add successed.");
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostUploadFile = async (payload) => {
    var data = new FormData();
    data.append("file", payload.file);
    const requestOptions = {
        headers: {
            'x-access-token': localStorage.getItem('access_token'),
        },
        body: data,
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'storage', requestOptions);
        var result = await response.json();
        if (result == null && result.is_success == false) return;
        if (result.is_success) {
            console.log(result)
            return {
                url: API_URL + "storage/" + result.data.uri,
                file_name: result.data.name,
                is_success: true
            };
        }
        return;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}
