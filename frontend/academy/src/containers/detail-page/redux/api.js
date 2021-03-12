import { exec } from '../../../redux-core/api';

export const requestGetCourseDetail = async (id) => {
    return exec({
        method: 'GET',
        path: `course-search/${id}`
    });
}



export const requestGetCourseSimilar = async (id) => {
    return exec({
        method: 'GET',
        path: `course-search/top5enrolSimilar/${id}`
    });
}


export const requestGetSlidePreview = async (id) => {
    return exec({
        method: 'GET',
        path: `slide/preview/${id}`
    });
}

export const requestGetLessonPreview = async (id) => {
    return exec({
        method: 'GET',
        path: `lesson/preview/${id}`
    });
}


export const requestGetFeedback = async (id) => {
    return exec({
        method: 'GET',
        path: `feedback/${id}`
    })
}



export const requestPostFeedback = async (body) => {
    return exec({ 
        method: 'POST',
        path: `feedback`, 
        body: body 
    });
}


export const requestRemoveWatchlist = async (id) => {
    return exec({ 
        method: 'DELETE',
        path: `watchlist/${id}`
    });
}



export const requestAddWatchlist = async (id) => {
    
    return exec({ 
        method: 'POST',
        path: 'watchlist', 
        body: { course_id: id } 
    })
}




export const requestEnrolCourse = async (id) => {
    return exec({ 
        method: 'POST',
        path: 'enrol', 
        body: { course_id: id } 
    })
}