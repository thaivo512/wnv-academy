import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';

export const requestSearchCourse = async ({ q, category, page, size, sort, direct }) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + `course-search?q=${q}&sort=${sort}&direct=${direct}&categories=${category}&page=${page}&size=${size}`, requestOptions);

        return await response.json();
        
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}