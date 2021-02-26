import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';

export const requestGetTop10CourseView = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'course-search/top10view', requestOptions);
        var courses = await response.json();
        if (courses == null) return;
        return courses.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}


export const requestGetTop10CourseNew = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'course-search/top10new', requestOptions);
        var courses = await response.json();
        if (courses == null) return;
        return courses.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}


export const requestGetTopCategoryWeek = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'category/agg/topEnrollWeek', requestOptions);
        var categories = await response.json();
        
        return categories;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}


export const requestGetTopCourseWeek = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'course-search/top3enrollweek', requestOptions);
        var courses = await response.json();
        
        if (courses == null) return;
        return courses.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}