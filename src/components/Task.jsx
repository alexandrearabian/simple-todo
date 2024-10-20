import Checkbox from "./Checkbox";
import Trash from "./Trash";
import { db, auth } from "../firebase/FirebaseConfig.jsx";
import { updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";

export default function Task({ task, onTaskClick }) {

    const handleCheckTask = async (taskId) => {
        const user = auth.currentUser;
        let checked = false; // This will store the updated 'completed' status

        try {
            const taskRef = doc(db, "tasks", taskId);
            const taskSnapshot = await getDoc(taskRef);

            if (taskSnapshot.exists()) {
                const taskData = taskSnapshot.data();
                if (taskData.userId !== user.uid) {
                    console.error("Permission denied: You cannot modify this task.");
                    return;
                }

                if (taskData.completed) {

                    await updateDoc(taskRef, { completed: false });
                    checked = false;
                } else {

                    await updateDoc(taskRef, { completed: true });
                    checked = true;
                }
            } else {
                console.error("No task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }

        return checked;
    };

    const handleDeleteTask = async (taskId) => {
        const user = auth.currentUser;
        try {
            const taskRef = doc(db, "tasks", taskId);
            const taskSnapshot = await getDoc(taskRef);
            if (taskSnapshot.exists()) {
                const taskData = taskSnapshot.data();

                // Ensure the current user is the task owner
                if (taskData.userId !== user.uid) {
                    console.error("Permission denied: You cannot delete this task.");
                    return;
                }

                await deleteDoc(taskRef);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };


    return (
        <>
            {/*
                key={task.id} is redudant, as the key should be passed to the component at the highest
                possible level
             */}
            <li className={'task ' + (task.completed ? 'done' : '')} >
                <Checkbox onCheck={() => handleCheckTask(task.id)} />
                <span className="task-name" onClick={onTaskClick}>{task.name}</span>
                <Trash onDelete={() => handleDeleteTask(task.id)} />
            </li>
        </>
    )

}