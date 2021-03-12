import { toast } from 'react-toastify';
import { exec } from '../../redux-core/api';

export const registerApi = async (params) => {
    var info = await exec({
        method: 'POST',
        path: `auth/sign-up`,
        body: {
            name: params.fullname,
            username: params.username,
            email: params.email,
            password: params.password
        }
    });
    if (info == null) return;
    if (!info.is_success) {
        toast.error(info.message);
        return null;
    }
    return info;
}

export const loginApi = async (params) => {
    var info = await exec({
        method: 'POST',
        path: `auth/sign-in`,
        body: {
            username: params.username,
            password: params.password
        }
    });
    if (info == null || !info.is_success) {
        toast.error("Username or Password are wrong.");
        return null;
    }
    return info;
}

export const requestOptToEmailApi = async (params) => {
    var info = await exec({
        method: 'POST',
        path: `user/request-otp`,
        body: {
            email: params
        }
    });
    if (info == null) return;
    if (!info.is_success) {
        toast.error(info.message);
        return null;
    }
    return info;
}

export const verifyYourEmailApi = async (params) => {
    var info = await exec({
        method: 'POST',
        path: `user/verify-email`,
        body: {
            email: params.email,
            otp_code: params.opt
        }
    });
    if (info == null) return;
    if (!info.is_success) {
        toast.error(info.message);
        return null;
    }
    return info;
}

export const loginWithGoogle = async (params) => {
    var info = await exec({
        method: 'POST',
        path: `auth/gg-oauth`,
        body: {
            gg_token: params,
        }
    });
    if (info == null) return;
    return info;
}
