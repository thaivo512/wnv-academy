import { API_URL } from '../constants';
import { toast } from 'react-toastify';

export const registerApi = async (params) => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            name: params.fullname,
            username: params.username,
            email: params.email,
            password: params.password
        })
    };
    try {
        const response = await fetch(API_URL + 'auth/sign-up', requestOptions);
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

export const loginApi = async (params) => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify({
            username: params.username,
            password: params.password
        })
    };
    try {
        const response = await fetch(API_URL + 'auth/sign-in', requestOptions);
        var info = await response.json();
        if (info == null || !info.is_success) {
            toast.error("Username or Password are wrong.");
            return null;
        }
        return info;
    } catch (e) {
        toast.error("Login fail because: " + e)
        return { isFail: true };
    }
}

export const requestOptToEmailApi = async (params) => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            email: params,
        })
    };
    try {
        const response = await fetch(API_URL + 'user/request-otp', requestOptions);
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

export const verifyYourEmailApi = async (params) => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            email: params.email,
            otp_code: params.opt
        })
    };
    try {
        const response = await fetch(API_URL + 'user/verify-email', requestOptions);
        var info = await response.json();
        if (info == null) return;
        debugger;
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
