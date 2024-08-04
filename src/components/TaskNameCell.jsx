import React, { useState } from 'react';
import { Input, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

const TaskNameCell = ({ task, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(task.name);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = () => {
        if (editedName?.trim() !== task.name?.trim()) {
            onUpdate(task.id, editedName);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedName(task.name);
        setIsEditing(false);
    };

    return (
        <div onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <Space>
                    <Input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={{ width: 'auto' }}
                    />
                    <CheckOutlined
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={handleConfirmEdit}
                    />
                    <CloseOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={handleCancelEdit}
                    />
                </Space>
            ) : (
                <Text title={task.name}>{task.name}</Text>
            )}
        </div>
    );
};

export default TaskNameCell;
