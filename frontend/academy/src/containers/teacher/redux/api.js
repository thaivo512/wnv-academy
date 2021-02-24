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
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token'),
            body: JSON.stringify({
                name: payload.courseName,
                image_avatar: payload.avatar,
                short_description: payload.shortDetail,
                detail_description: payload.detail,
                price: payload.price,
                category_id: payload.category

            })
        },
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'course', requestOptions);
        var result = await response.json();
        if (result == null) return;
        return result;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

