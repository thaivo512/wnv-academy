export const REQUEST_API_GET_COURSE_LEARNING = "REQUEST_API_GET_COURSE_LEARNING";
export const RECEIVE_API_GET_COURSE_LEARNING = "RECEIVE_API_GET_COURSE_LEARNING";

export const requestApiGetCourseLearning = id => ({ type: REQUEST_API_GET_COURSE_LEARNING, id });
export const receiveApiGetCourseLearning = data => ({ type: RECEIVE_API_GET_COURSE_LEARNING, data });

export const REQUEST_API_GET_SLIDE_LEARNING = "REQUEST_API_GET_SLIDE_LEARNING";
export const RECEIVE_API_GET_SLIDE_LEARNING = "RECEIVE_API_GET_SLIDE_LEARNING";

export const requestApiGetSlideLearning = id => ({ type: REQUEST_API_GET_SLIDE_LEARNING, id });
export const receiveApiGetSlideLearning = data => ({ type: RECEIVE_API_GET_SLIDE_LEARNING, data });


export const REQUEST_API_GET_LESSON_LEARNING = "REQUEST_API_GET_LESSON_LEARNING";
export const RECEIVE_API_GET_LESSON_LEARNING = "RECEIVE_API_GET_LESSON_LEARNING";

export const requestApiGetLessonLearning = id => ({ type: REQUEST_API_GET_LESSON_LEARNING, id });
export const receiveApiGetLessonLearning = data => ({ type: RECEIVE_API_GET_LESSON_LEARNING, data });



export const REQUEST_API_MARK_DONE_LESSON = "REQUEST_API_MARK_DONE_LESSON";
export const RECEIVE_API_MARK_DONE_LESSON = "RECEIVE_API_MARK_DONE_LESSON";

export const requestApiMarkDoneLesson = id => ({ type: REQUEST_API_MARK_DONE_LESSON, id });
export const receiveApiMarkDoneLesson = data => ({ type: RECEIVE_API_MARK_DONE_LESSON, data });


export const REQUEST_API_TRACKING_LESSON = "REQUEST_API_TRACKING_LESSON";
export const requestApiTrackingLesson = body => ({ type: REQUEST_API_TRACKING_LESSON, body });