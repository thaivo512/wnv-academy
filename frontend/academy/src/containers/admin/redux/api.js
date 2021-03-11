import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';
import { exec } from '../../../redux-core/api';

export const requestPostAddUser = async (payload) => {
    var info = payload.teacher;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        body: JSON.stringify({
            name: info.name,
            username: info.username,
            email: info.username,
            password: info.password
        }),
        method: 'POST',
    };
    try {
        const response = await fetch(API_URL + 'user/teachers', requestOptions);
        var info = await response.json();
        if (info == null) return;
        return info;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetAllUsers = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'user', requestOptions);
        var info = await response.json();
        if (info == null) return;
        return info;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestGetAllCourses = async () => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'course-search/?q=&sort=view_count&direct=asc', requestOptions);
        var info = await response.json();
        if (info == null) return;
        return info.data;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestDeleteUser = async (params) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        method: 'DELETE',

    };
    try {
        const response = await fetch(API_URL + 'user/' + params.payload.id, requestOptions);
        var info = await response.json();
        if (info == null) return;
        if (!info.is_success) {
            toast.error(info.message);
            return null;
        }
        return info;
    } catch (e) {
        toast.error(e);
        return { isFail: true };
    }
}

export const requestPostAddCategory = async (payload) => {
    return exec({
        method: 'POST',
        path: `category`,
        body: {
            name: payload.name.name
        }
    });
}

export const requestPostUpdateCategory = async (payload) => {
    console.log(payload)
    return exec({
        method: 'PUT',
        path: `category/` + payload.category.id,
        body: {
            name: payload.category.name
        }
    });
}

export const requestDeleteCategory = async (payload) => {
    return exec({
        method: 'DELETE',
        path: `category/` + payload.id,
    });
}
