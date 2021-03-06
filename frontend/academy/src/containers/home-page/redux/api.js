import { exec } from '../../../redux-core/api';


export const requestGetTop10CourseView = async () => {
    const courses = await exec({
        method: 'GET',
        path: 'course-search/top10view'
    })
    
    if (courses == null) return;
    return courses.data;
}


export const requestGetTop10CourseNew = async () => {
    const courses = await exec({
        method: 'GET',
        path: 'course-search/top10new'
    })
    
    if (courses == null) return;
    return courses.data;
}


export const requestGetTopCategoryWeek = async () => {
    return exec({
        method: 'GET',
        path: 'category/agg/topEnrollWeek'
    })
}


export const requestGetTopCourseWeek = async () => {
    const courses = await exec({
        method: 'GET',
        path: 'course-search/top3enrollweek'
    })
    
    if (courses == null) return;
    return courses.data;
}