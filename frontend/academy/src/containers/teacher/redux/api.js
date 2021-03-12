import { API_URL } from '../../../authenicate/constants';
import { toast } from 'react-toastify';
import { exec } from '../../../redux-core/api';

export const requestGetAllCourses = async () => {
    var courses = await exec({
        method: 'GET',
        path: `course`
    });
    if (courses == null) return;
    return courses.data;
}

export const requestGetSlidesByCourseID = async (payload) => {
    var result = await exec({
        method: 'GET',
        path: `slide/` + payload.id,
    });
    if (result == null) return;
    return result.slides;
}

export const requestGetLessonsByCourseID = async (payload) => {
    var result = await exec({
        method: 'GET',
        path: `lesson/` + payload.id,
    });
    if (result == null) return;
    return result.lessons;
}

export const requestGetFeedbacksByCourseID = async (payload) => {
    var result = await exec({
        method: 'GET',
        path: `feedback/` + payload.id,
    });
    if (result == null) return;
    return result.data;
}

export const requestGetAllCategories = async () => {
    var result = await exec({
        method: 'GET',
        path: `category`
    });
    if (result == null) return;
    return result;
}

export const requestPostAddCourse = async (payload) => {
    var course = payload.course;
    var result = await exec({
        method: 'POST',
        path: `course`,
        body: {
            name: course.courseName,
            image_avatar: course.avatar,
            short_description: course.shortDetail,
            detail_description: course.detail,
            price: parseInt(course.price),
            price_promote: parseInt(course.price - (course.price * (course.promoteRate / 100))),
            category_id: course.category
        }
    });
    if (result == null && result.is_fail) return;
    toast.success("Add successed.");
    return result;
}

export const requestPostUpdateCourse = async (payload) => {
    var course = payload.course;
    var result = await exec({
        method: 'PUT',
        path: `course/` + course.id,
        body: {
            name: course.courseName,
            image_avatar: course.avatar,
            short_description: course.shortDetail,
            detail_description: course.detail,
            price: parseInt(course.price),
            price_promote: course.pricePromote,
            category_id: course.category
        }
    });
    if (result == null && result.is_success == false) return;
    toast.success("Update successed.");
    return result;
}

export const requesPublishCourse = async (payload) => {
    var course = payload.course;
    var result = await exec({
        method: 'PUT',
        path: `course/` + course.id + '/publish',
    });
    if (result == null && result.is_success == false) return;
    toast.success("Publish successed.");
    return result;
}

export const requestDeleteSlide = async (payload) => {
    var slide = payload.slide;
    var result = await exec({
        method: 'DELETE',
        path: 'slide/' + slide.course_id + '/' + slide.id,
    });
    if (result == null && result.is_success == false) return;
    toast.success("Delete successed.");
    return result;
}

export const requestDeleteLesson = async (payload) => {
    var lesson = payload.lesson;
    var result = await exec({
        method: 'DELETE',
        path: 'lesson/' + lesson.course_id + '/' + lesson.id,
    });
    if (result == null && result.is_success == false) return;
    toast.success("Delete successed.");
    return result;
}

export const requestPostAddSlide = async (payload) => {
    var slide = payload.slide;
    var result = await exec({
        method: 'POST',
        path: 'slide',
        body: {
            slide_name: slide.slide_name,
            file_name: slide.file_name,
            file_url: slide.file_url,
            is_allow_preview: slide.is_allow_preview,
            course_id: slide.course_id
        }
    });
    if (result == null && result.is_success == false) return;
    toast.success("Add successed.");
    return result;
}

export const requestPostAddLesson = async (payload) => {
    var lesson = payload.lesson;
    var result = await exec({
        method: 'POST',
        path: 'lesson',
        body: {
            course_id: lesson.course_id,
            lesson_name: lesson.lesson_name,
            file_name: lesson.file_name,
            file_url: lesson.file_url,
        }
    });
    if (result == null && result.is_success == false) return;
    toast.success("Add successed.");
    return result;
}

export const requestPostUploadFile = async (payload) => {
    var data = new FormData();
    data.append("file", payload.file);
    var result = await exec({
        method: 'POST',
        path: 'storage',
        body: data
    });
    if (result.is_success) {
        return {
            url: API_URL + "storage/" + result.data.uri,
            file_name: result.data.name,
            is_success: true
        };
    }
    return;
}
