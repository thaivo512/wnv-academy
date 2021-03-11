export const REQUEST_API_GET_ALL_USERS = "REQUEST_API_GET_ALL_USERS";
export const RECEIVE_API_GET_ALL_USERS = "RECEIVE_API_GET_ALL_USERS";

export const requestApiGetAllUser = () => ({ type: REQUEST_API_GET_ALL_USERS });
export const receiveApiGetAllUser = allUsers => ({ type: RECEIVE_API_GET_ALL_USERS, allUsers });

export const REQUEST_API_DELETE_USER = "REQUEST_API_DELETE_USER";
export const RECEIVE_API_DELETE_USER = "RECEIVE_API_DELETE_USER";

export const requestApiDeleteUser = payload => ({ type: REQUEST_API_DELETE_USER, payload });
export const receiveApiDeleteUser = result => ({ type: RECEIVE_API_DELETE_USER, result });

export const REQUEST_API_ADD_TEACHER = "REQUEST_API_ADD_TEACHER";
export const requestApiAddTeacher = teacher => ({ type: REQUEST_API_ADD_TEACHER, teacher });

export const REQUEST_API_GET_ALL_COURSES_ADMIN = "REQUEST_API_GET_ALL_COURSES_ADMIN";
export const RECEIVE_API_GET_ALL_COURSES_ADMIN = "RECEIVE_API_GET_ALL_COURSES_ADMIN";

export const requestApiGetAllCoursesAdmin = () => ({ type: REQUEST_API_GET_ALL_COURSES_ADMIN });
export const receiveApiGetAllCoursesAdmin = allCourses => ({ type: RECEIVE_API_GET_ALL_COURSES_ADMIN, allCourses });

export const REQUEST_API_POST_ADD_CATEGORY = "REQUEST_API_POST_ADD_CATEGORY";
export const requestApiPostAddCategory = (name) => ({ type: REQUEST_API_POST_ADD_CATEGORY, name });

export const REQUEST_API_DELETE_CATEGORY = "REQUEST_API_DELETE_CATEGORY";
export const requestApiDeleteategory = (id) => ({ type: REQUEST_API_DELETE_CATEGORY, id });

export const REQUEST_API_PUT_CATEGORY = "REQUEST_API_PUT_CATEGORY";
export const requestApiPutCategory = (category) => ({ type: REQUEST_API_PUT_CATEGORY, category });

export const REQUEST_API_ADD_SUB_CATEGORY = "REQUEST_API_ADD_SUB_CATEGORY";
export const requestApiAddSubCategory = (sub) => ({ type: REQUEST_API_ADD_SUB_CATEGORY, sub });
