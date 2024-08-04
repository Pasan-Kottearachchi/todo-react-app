import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddTaskForm = ({ visible, onAddTask, onCancel }) => {
    const [form] = Form.useForm();

    const handleAddTask = () => {
        form
            .validateFields()
            .then((values) => {
                onAddTask(values.taskName);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            open={visible}
            title="Add New Task"
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => {
                        form.resetFields();
                        onCancel();
                    }}
                >
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleAddTask}>
                    Add Task
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ taskName: '' }}
            >
                <Form.Item
                    name="taskName"
                    label="Task Name"
                    rules={[
                        {
                            required: true,
                            message: "Task name can't be empty",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter task name"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTaskForm;
