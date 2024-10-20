import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig.jsx";
import Trash from './Trash.jsx';
import Checkbox from './Checkbox.jsx';

export default function TaskDetail({ task, closeDetail, isVisible, handleDeleteTask, handleCheckTask }) {
    const createdAt = task.createdAt ? task.createdAt.toDate().toLocaleDateString() : 'No date available';
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const [isMounted, setIsMounted] = useState(false);
    const taskDetailRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => setIsMounted(true), 50); // Delay to ensure mount
        } else {
            setIsMounted(false);
        }
    }, [isVisible]);

    // Handle outside click with prioritization
    useEffect(() => {
        const handleClickOutside = (event) => {
            // List of classes/data attributes that should prevent closing the detail view
            const prioritySelectors = ['.checkbox', '.trash', '.li.task'];

            // Check if the click was outside the TaskDetail but not on priority elements
            if (
                taskDetailRef.current &&
                !taskDetailRef.current.contains(event.target) &&
                !prioritySelectors.some(selector => event.target.closest(selector))
            ) {
                closeDetail(); // Close if clicked outside without priority action
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDetail]);

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
        <div ref={taskDetailRef} className={`task-detail ${isMounted ? 'show' : ''}`}>
            {!editMode && (
                <h2 onClick={handleEdit} style={{
                    position: 'relative',
                    top: '-15px'
                }}>{taskName}</h2>
            )}

            {editMode && (
                <h2 style={{
                    position: 'relative',
                    top: '-15px'
                }}>
                    <textarea
                        value={taskName}
                        onChange={handleInput}
                        onBlur={handleSave}
                        autoFocus
                        ref={(textarea) => {
                            if (textarea) {
                                textarea.selectionStart = textarea.selectionEnd = taskName.length;
                            }
                        }}
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
                            padding: '0',
                            width: '100%',
                        }}
                    />
                </h2>
            )}

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '35px',
            }}>
                <FontAwesomeIcon icon={faXmark} onClick={closeDetail} style={{ fontSize: '2.5rem' }} />
            </div>
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
            }}>

                <Trash onDelete={() => handleDeleteTask(task.id)} size='2rem' className="trash" />
            </div>
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
            }}
                className={'task ' + (task.completed ? 'done' : '')}
            >

                <Checkbox onCheck={() => handleCheckTask(task.id)} status={task.completed} size='2rem' className="checkbox" />
            </div>

        </div>
    );
}
