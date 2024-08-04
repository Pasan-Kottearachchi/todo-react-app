import {
    all,
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {addTask, deleteTask, fetchTaskList, updateTask, updateTaskStatus} from "../routines";
import {request} from "../../utils/RestClient";

const BE_URL = 'http://localhost:8848/todo-list-api';
export function* fetchTaskListSaga({ payload }) {
    console.log('fetchTaskListSaga', payload);
    const search = payload?.search;
    try {
        let searchString = '';
        if (search) {
            searchString = `?search=${encodeURIComponent(search)}`;
        }
        const response = yield call(
            request,
            `${BE_URL}/tasks${searchString}`
        );
        yield put(fetchTaskList.success(response.data));
    } catch (error) {
        yield put(fetchTaskList.failure({ error }));
    }
}

export function* addTaskSaga({ payload }) {
    console.log('addTaskSaga', payload);
    const { name, callbackFn } = payload;
    try {
        const response = yield call(
            request,
            `${BE_URL}/tasks`,
            {
                method: 'POST',
                payload: { name }
            }
        );
        yield put(addTask.success(response));
        if (callbackFn) {
            callbackFn();
        } else {
            yield put(fetchTaskList.trigger());
        }
    } catch (error) {
        yield put(addTask.failure(error));
    }
}

export function* updateTaskSaga({ payload }) {
    const { name, taskId, callbackFn } = payload;
    try {
        const response = yield call(
            request,
            `${BE_URL}/tasks/${taskId}`,
            {
                method: 'PUT',
                payload: { name }
            }
        );
        yield put(updateTask.success(response));
        if (callbackFn) {
            callbackFn();
        } else {
            yield put(fetchTaskList.trigger());
        }
    } catch (error) {
        yield put(updateTask.failure(error));
    }
}

export function* updateTaskStatusSaga({ payload }) {
    const { status, taskId, callbackFn } = payload;
    try {
        const response = yield call(
            request,
            `${BE_URL}/tasks/${taskId}/status`,
            {
                method: 'PUT',
                payload: { status }
            }
        );
        yield put(updateTaskStatus.success(response));
        if (callbackFn) {
            callbackFn();
        } else {
            yield put(fetchTaskList.trigger());
        }
    } catch (error) {
        yield put(updateTaskStatus.failure(error));
    }
}

export function* deleteTaskSaga({ payload }) {
    const { taskId, callbackFn } = payload;
    try {
        const response = yield call(
            request,
            `${BE_URL}/tasks/${taskId}`,
            {
                method: 'DELETE',
            }
        );
        yield put(deleteTask.success(response));
        if (callbackFn) {
            callbackFn();
        } else {
            yield put(fetchTaskList.trigger());
        }
    } catch (error) {
        yield put(deleteTask.failure(error));
    }
}


export default function* root() {
    yield all([
        takeLatest(fetchTaskList.TRIGGER, fetchTaskListSaga),
        takeLatest(addTask.TRIGGER, addTaskSaga),
        takeLatest(updateTask.TRIGGER, updateTaskSaga),
        takeLatest(updateTaskStatus.TRIGGER, updateTaskStatusSaga),
        takeLatest(deleteTask.TRIGGER, deleteTaskSaga),
    ]);
    }