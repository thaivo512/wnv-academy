import { exec } from '../../../redux-core/api';


export const requestGetInfo = async () => {
    return exec({
        method: 'GET',
        path: `user/me`
    })
}


export const requestChangeName = async (name) => {
    return exec({
        method: 'PUT',
        path: `user/change-name`,
        body: { name }
    })
}