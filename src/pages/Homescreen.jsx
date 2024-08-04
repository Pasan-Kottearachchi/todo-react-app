import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Table, Button, Menu, Dropdown, Input, Tooltip} from 'antd';
import {
    MoreOutlined,
    CheckCircleOutlined,
    SearchOutlined,
    CheckCircleFilled,
    InfoCircleOutlined
} from '@ant-design/icons';
import {addTask, deleteTask, fetchTaskList, updateTask, updateTaskStatus} from "../store/routines";
import TaskNameCell from "../components/TaskNameCell";
import AddTaskForm from "../components/AddTaskForm";
import {formatDateTime} from "../utils/commonUtils";

const HomeScreen = () => {
    const tasks = useSelector((state) => state.tasks.taskList || []);
    const isTasksFetching = useSelector((state) => state.tasks.isTasksFetching);
    const [searchText, setSearchText] = useState(null);
    const [sortedTasks, setSortedTasks] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    const handleToggleStatus = (taskId, status) => {
        const _status = status === 'completed' ? 'in_progress' : 'completed';
        dispatch(updateTaskStatus({ status: _status, taskId }));
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTask({ taskId }));
    };

    useEffect(() => {
        dispatch(fetchTaskList({ search: searchText }));
    }, [dispatch, searchText]);

    useEffect(() => {
    //     sort tasks by status, completed once should be at the bottom
        const sorted = [...tasks].sort((a, b) => {
            if (a.status === 'completed') return 1;
            if (b.status === 'completed') return -1;
            return 0;
        });
        setSortedTasks(sorted);
    }, [tasks]);

    const handleUpdateTaskName = (taskId, name) => {
        dispatch(updateTask({ name, taskId }));
    };

    const callBackFnOnTaskChange = () => {
        dispatch(fetchTaskList({ search: searchText }));
    }

    const handleAddTask = (name) => {
        dispatch(addTask({ name, callbackFn: callBackFnOnTaskChange }));
        setIsModalVisible(false);
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const menu = (task) => (
        <Menu  className="task-menu">
            <Menu.Item key="complete"  className="task-menu-item" onClick={() => handleToggleStatus(task.id)}>
                {task.status === 'completed' ? 'Mark as In Progress' : 'Mark as Complete'}
            </Menu.Item>
            <Menu.Item key="delete"  className="task-menu-item" onClick={() => handleDelete(task.id)}>
                Delete
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: '',
            width: '5rem',
            dataIndex: 'status',
            render: (_, task) => (
                <>
                    {task.status === 'completed' ? (
                <CheckCircleFilled
                    style={{ fontSize: '18px', cursor: 'pointer', color: 'green' }}
                    onClick={() => handleToggleStatus(task.id, task.status)}
                    className={task.status === 'completed' ? 'completed' : 'in-progress'}
                />
                    ) : (
                <CheckCircleOutlined
                    style={{ fontSize: '18px', cursor: 'pointer' }}
                    onClick={() => handleToggleStatus(task.id, task.status)}
                    className={task.status === 'completed' ? 'completed' : 'in-progress'}
                />)}
                </>
            )
        },
        {
            title: (
                <div className="column-header-container">
                    <div className="column-header">Task Name</div>
                    <Tooltip title="Double click on task name to edit" placement="topLeft">
                        <InfoCircleOutlined style={{marginLeft: '8px', fontSize: '16px', color: 'grey'}}/>
                    </Tooltip>
                </div>
            ),
            dataIndex: 'name',
            render: (_, task) => (
                <TaskNameCell
                    task={task}
                    onUpdate={handleUpdateTaskName}
                />
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (createdAt) => formatDateTime(createdAt),
        },
        {
            title: 'Modified At',
            dataIndex: 'modifiedAt',
            render: (modifiedAt) => formatDateTime(modifiedAt),
        },
        {
            title: '',
            width: '5rem',
            dataIndex: 'actions',
            render: (_, task) => (
                <Dropdown overlay={menu(task)} trigger={['click']}>
                    <MoreOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                </Dropdown>
            ),
        },
    ];

    return (
        <div className="home-screen">
            <header className="header">
                <h1>Todo Application</h1>
                <Button type="primary" className="add-task-button" onClick={handleOpenModal}>
                    Add Task
                </Button>
            </header>

            <Input
                placeholder="Search tasks..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
            />

            <main className="task-list-container">
                <Table
                    loading={isTasksFetching}
                    dataSource={sortedTasks}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ y: '50vh' }}
                    className="task-table"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    dynamicHeight
                />
            </main>
            <AddTaskForm
                visible={isModalVisible}
                onAddTask={handleAddTask}
                onCancel={handleCloseModal}
            />
        </div>
    );
};

export default HomeScreen;
