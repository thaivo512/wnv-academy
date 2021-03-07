import { API_URL } from '../authenicate/constants';
import { toast } from 'react-toastify';


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
        const response = await fetch(API_URL + path, requestOptions)
                        .then(response => {
                            if(response.status == 403) {
                                window.location = '/home-page';
                            }
                            if(response.status == 402) {
                                toast.error('Bạn chưa xác thực email');
                            }
                            if(response.status == 401)
                            {
                                localStorage.removeItem('is_success');
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                window.location = `/login`;
                            }
                            return response;
                        });

        return await response.json();
        
    } catch (e) {
        console.log(e);
    }
}