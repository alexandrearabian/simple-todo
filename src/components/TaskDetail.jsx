import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig.jsx";

export default function TaskDetail({ task, closeDetail }) {

    const createdAt = task.createdAt ? task.createdAt.toDate().toLocaleDateString() : 'No date available';
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task.name);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleInput = (e) => {
        setTaskName(e.target.value);
    };

    const handleSave = () => {
        if (!taskName.trim()) {
            alert("Task name cannot be empty!");
            return;
        }

        const taskDocRef = doc(db, 'tasks', task.id);

        updateDoc(taskDocRef, { name: taskName })
            .then(() => {
                console.log("Task name updated successfully!");
                setEditMode(false);
            })
            .catch((error) => {
                console.error("Error updating task name: ", error);
            });
    };

    return (
        <div className="task-detail">
            {!editMode && (
                <h2 onClick={handleEdit}>{taskName}</h2>
            )}

            {editMode && (
                <h2>

                    <textarea
                        value={taskName}
                        onChange={handleInput}
                        onBlur={handleSave}
                        autoFocus
                        style={{
                            textAlign: 'inherit',
                            fontSize: 'inherit',
                            fontWeight: 'inherit',
                            lineHeight: 'inherit',
                            border: 'none',
                            backgroundColor: 'transparent',
                            resize: 'none',
                            outline: 'none',
                            overflow: 'hidden',
                            padding: '0'
                        }}
                    />
                </h2>
            )}

            <button style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
            }}
                className='close'
                onClick={closeDetail}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <p style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
            }}>{createdAt}</p>
            <p style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
            }}><strong>Status: </strong>{task.completed ? 'Completed ✅' : 'Pending ⌛️'}</p>

        </div>
    );
}
