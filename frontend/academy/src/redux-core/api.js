import { API_URL } from '../authenicate/constants';
import { toast } from 'react-toastify';

const redirectToLogin = () => {
    localStorage.removeItem('is_success');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location = `/login`;
}

const refresh = async() => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        body: JSON.stringify({
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token')
        }),
        method: 'POST',
    };

    const response = await fetch(API_URL + 'auth/refresh', requestOptions);
    const data = await response.json();

    if(data.is_success) {
        localStorage.setItem('access_token', data.access_token);
        return true;
    }
    else {
        redirectToLogin();
        return false;
    }
}

export const exec = async ({ method, path, body }) => {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('access_token')
        },
        body: JSON.stringify(body),
        method: method,
    };
    try {
        const response = await fetch(API_URL + path, requestOptions);
        console.log(response);
        if(response.status == 403) {
            window.location = '/home-page';
        }
        if(response.status == 402) {
            toast.error('Bạn chưa xác thực email');
        }
        if(response.status == 401)
        {
            const rs = await refresh();
            if(rs) return exec({ method, path, body });
            else redirectToLogin();
        }
        return await response.json();
        
    } catch (e) {
        console.log(e);
    }
}