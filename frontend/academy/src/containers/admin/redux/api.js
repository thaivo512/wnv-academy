import { exec } from '../../../redux-core/api';

export const requestPostAddUser = async (payload) => {
    var info = await exec({
        method: 'POST',
        path: `user/teachers`,
        body: {
            name: info.name,
            username: info.username,
            email: info.username,
            password: info.password
        }
    });
    if (info == null) return;
    return info;
}

export const requestGetAllUsers = async () => {
    var info = await exec({
        method: 'GET',
        path: `user`,
    });
    if (info == null) return;
    return info;
}

export const requestGetAllCourses = async () => {
    var info = await exec({
        method: 'GET',
        path: `course-search/?q=&sort=view_count&direct=asc`,
    });
    if (info == null) return;
    return info.data;
}

export const requestDeleteUser = async (params) => {
    return exec({
        method: 'DELETE',
        path: `user/` + params.payload.id,
    });
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

export const requestPostAddSubCategory = async (payload) => {
    return exec({
        method: 'POST',
        path: `category/` + payload.sub.id,
        body: {
            name: payload.sub.name
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
