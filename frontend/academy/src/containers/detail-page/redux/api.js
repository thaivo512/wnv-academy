import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';

export const requestGetCourseDetail = async (id) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + `course-search/${id}`, requestOptions);

        const rs = await response.json();
        
        return rs;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}



export const requestGetCourseSimilar = async (id) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + `course-search/top5enrolSimilar/${id}`, requestOptions);

        const rs = await response.json();
        
        return rs;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}