import { exec } from '../../../redux-core/api';


export const requestSearchCourse = async ({ q, category, page, size, sort, direct }) => {
    return exec({
        method: 'GET',
        path: `course-search?q=${q}&sort=${sort}&direct=${direct}&categories=${category}&page=${page}&size=${size}`
    })
}