export const REQUEST_API_GET_COURSE_DETAIL = "REQUEST_API_GET_COURSE_DETAIL";
export const RECEIVE_API_GET_COURSE_DETAIL = "RECEIVE_API_GET_COURSE_DETAIL";

export const requestApiGetCourseDetail = id => ({ type: REQUEST_API_GET_COURSE_DETAIL, id });
export const receiveApiGetCourseDetail = data => ({ type: RECEIVE_API_GET_COURSE_DETAIL, data });

export const REQUEST_API_GET_COURSE_SIMILAR = "REQUEST_API_GET_COURSE_SIMILAR";
export const RECEIVE_API_GET_COURSE_SIMILAR = "RECEIVE_API_GET_COURSE_SIMILAR";

export const requestApiGetCourseSimilar = id => ({ type: REQUEST_API_GET_COURSE_SIMILAR, id });
export const receiveApiGetCourseSimilar = data => ({ type: RECEIVE_API_GET_COURSE_SIMILAR, data });

export const REQUEST_API_GET_SLIDE_PREVIEW = "REQUEST_API_GET_SLIDE_PREVIEW";
export const RECEIVE_API_GET_SLIDE_PREVIEW = "RECEIVE_API_GET_SLIDE_PREVIEW";

export const requestApiGetSlidePreview = id => ({ type: REQUEST_API_GET_SLIDE_PREVIEW, id });
export const receiveApiGetSlidePreview = data => ({ type: RECEIVE_API_GET_SLIDE_PREVIEW, data });

export const REQUEST_API_GET_FEEDBACK = "REQUEST_API_GET_FEEDBACK";
export const RECEIVE_API_GET_FEEDBACK = "RECEIVE_API_GET_FEEDBACK";

export const requestApiGetFeedback = id => ({ type: REQUEST_API_GET_FEEDBACK, id });
export const receiveApiGetFeedback = data => ({ type: RECEIVE_API_GET_FEEDBACK, data });

export const REQUEST_API_POST_FEEDBACK = "REQUEST_API_POST_FEEDBACK";
export const RECEIVE_API_POST_FEEDBACK = "RECEIVE_API_POST_FEEDBACK";

export const requestApiPostFeedback = body => ({ type: REQUEST_API_POST_FEEDBACK, body });
export const receiveApiPostFeedback = data => ({ type: RECEIVE_API_POST_FEEDBACK, data });


export const REQUEST_API_REMOVE_WATCHLIST = "REQUEST_API_REMOVE_WATCHLIST";
export const RECEIVE_API_REMOVE_WATCHLIST = "RECEIVE_API_REMOVE_WATCHLIST";

export const requestApiRemoveWatchlist = id => ({ type: REQUEST_API_REMOVE_WATCHLIST, id });
export const receiveApiRemoveWatchlist = data => ({ type: RECEIVE_API_REMOVE_WATCHLIST, data });


export const REQUEST_API_ADD_WATCHLIST = "REQUEST_API_ADD_WATCHLIST";
export const RECEIVE_API_ADD_WATCHLIST = "RECEIVE_API_ADD_WATCHLIST";

export const requestApiAddWatchlist = id => ({ type: REQUEST_API_ADD_WATCHLIST, id });
export const receiveApiAddWatchlist = data => ({ type: RECEIVE_API_ADD_WATCHLIST, data });


export const REQUEST_API_ENROL_COURSE = "REQUEST_API_ENROL_COURSE";
export const RECEIVE_API_ENROL_COURSE = "RECEIVE_API_ENROL_COURSE";

export const requestApiEnrolCourse = id => ({ type: REQUEST_API_ENROL_COURSE, id });
export const receiveApiEnrolCourse = data => ({ type: RECEIVE_API_ENROL_COURSE, data });


export const REQUEST_API_GET_LESSON_PREVIEW = "REQUEST_API_GET_LESSON_PREVIEW";
export const RECEIVE_API_GET_LESSON_PREVIEW = "RECEIVE_API_GET_LESSON_PREVIEW";

export const requestApiGetLessonPreivew = id => ({ type: REQUEST_API_GET_LESSON_PREVIEW, id });
export const receiveApiGetLessonPreview = data => ({ type: RECEIVE_API_GET_LESSON_PREVIEW, data });