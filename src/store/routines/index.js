import { createRoutine } from 'redux-saga-routines';

export const fetchTaskList = createRoutine('FETCH_TASK_LIST');
export const updateTask = createRoutine('UPDATE_TASK');
export const deleteTask = createRoutine('DELETE_TASK');
export const addTask = createRoutine('ADD_TASK');
export const updateTaskStatus = createRoutine('UPDATE_TASK_STATUS');
