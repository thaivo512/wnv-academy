import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';

export const requestGetAllUsers = async () => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    };
    try {
        const response = await fetch(API_URL + 'user', requestOptions);
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
