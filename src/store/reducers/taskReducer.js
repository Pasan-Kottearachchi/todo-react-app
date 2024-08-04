import {addTask, deleteTask, fetchTaskList, updateTask, updateTaskStatus} from "../routines";

const initialState = {
    taskList: [],
    selectedTask: null,

    isTasksFetching: false,
    fetchingTasksSuccess: false,

    isTaskAdding: false,
    addingTaskSuccess: false,

    isTaskUpdating: false,
    updatingTaskSuccess: false,

    isTaskDeleting: false,
    deletingTaskSuccess: false,

    isTaskStatusUpdating: false,
    updatingTaskStatusSuccess: false,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchTaskList.TRIGGER: {
            return {
                ...state,
                isTasksFetching: true,
            }
        }
        case fetchTaskList.SUCCESS: {
            return {
                ...state,
                isTasksFetching: false,
                fetchingTasksSuccess: true,
                taskList: action.payload,
            }
        }
        case fetchTaskList.FAILURE: {
            return {
                ...state,
                isTasksFetching: false,
                fetchingTasksSuccess: false,
            }
        }

        case addTask.TRIGGER: {
            return {
                ...state,
                isTaskAdding: true,
            }
        }
        case addTask.SUCCESS: {
            return {
                ...state,
                isTaskAdding: false,
                addingTaskSuccess: true,
                taskList: [...state.taskList, action.payload],
            }
        }
        case addTask.FAILURE: {
            return {
                ...state,
                isTaskAdding: false,
                addingTaskSuccess: false,
            }
        }

        case updateTask.TRIGGER: {
            const { name, taskId } = action.payload;
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === taskId);
            const selectedTask = currentTaskList.find((task) => task.id === taskId);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = {
                    ...selectedTask,
                    name,
                };

                return {
                    ...state,
                    selectedTask,
                    isTaskUpdating: true,
                    taskList: currentTaskList,
                }
            }

            return {
                ...state,
                isTaskUpdating: true,
            }
        }
        case updateTask.SUCCESS: {
            const updatedTask = { ...action.payload };
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === updatedTask.id);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = updatedTask;

                return {
                    ...state,
                    isTaskUpdating: false,
                    updatingTaskSuccess: true,
                    taskList: currentTaskList,
                    selectedTask: null,

                }
            }
            return {
                ...state,
                isTaskUpdating: false,
                updatingTaskSuccess: true,
            }
        }
        case updateTask.FAILURE: {
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === state.selectedTask.id);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = state.selectedTask;

                return {
                    ...state,
                    isTaskUpdating: false,
                    updatingTaskSuccess: false,
                    taskList: currentTaskList,
                    selectedTask: null,
                }
            }
            return {
                ...state,
                isTaskUpdating: false,
                updatingTaskSuccess: false,
            }
        }

        case updateTaskStatus.TRIGGER: {
            const { status, taskId } = action.payload;
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === taskId);
            const selectedTask = currentTaskList.find((task) => task.id === taskId);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = {
                    ...selectedTask,
                    status,
                };

                return {
                    ...state,
                    selectedTask,
                    isTaskStatusUpdating: true,
                    taskList: currentTaskList,
                }
            }

            return {
                ...state,
                isTaskStatusUpdating: true,
            }
        }
        case updateTaskStatus.SUCCESS: {
            const updatedTask = { ...action.payload };
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === updatedTask.id);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = updatedTask;

                return {
                    ...state,
                    isTaskStatusUpdating: false,
                    updatingTaskStatusSuccess: true,
                    taskList: currentTaskList,
                    selectedTask: null,
                }
            }
            return {
                ...state,
                isTaskStatusUpdating: false,
                updatingTaskStatusSuccess: true,
            }
        }
        case updateTaskStatus.FAILURE: {
            const currentTaskList = [ ...state.taskList ];
            const selectedTaskIndex = currentTaskList.findIndex((task) => task.id === state.selectedTask.id);

            if (selectedTaskIndex !== -1) {
                currentTaskList[selectedTaskIndex] = state.selectedTask;

                return {
                    ...state,
                    isTaskStatusUpdating: false,
                    updatingTaskStatusSuccess: false,
                    taskList: currentTaskList,
                    selectedTask: null,
                }
            }
            return {
                ...state,
                isTaskStatusUpdating: false,
                updatingTaskStatusSuccess: false,
            }
        }

        case deleteTask.TRIGGER: {
            return {
                ...state,
                isTaskDeleting: true,
            }
        }
        case deleteTask.SUCCESS: {
            return {
                ...state,
                isTaskDeleting: false,
                deletingTaskSuccess: true,
                taskList: state.taskList.filter((task) => task.id !== action.payload),
            }
        }
        case deleteTask.FAILURE: {
            return {
                ...state,
                isTaskDeleting: false,
                deletingTaskSuccess: false,
            }
        }

        default:
            return state;
    }
};

export default taskReducer;
