import { exec } from '../../../redux-core/api';

export const requestGetCourseEnroled = async () => {
    return exec({
        method: 'GET',
        path: `enrol`
    });
}
