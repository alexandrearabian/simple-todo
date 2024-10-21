import { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/FirebaseConfig.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function TaskForm() {
    const [taskName, setTaskName] = useState("");

    const handleAddTask = async (e) => {

        e.preventDefault(); // Prevent page refresh on form submit
        const user = auth.currentUser;
        if (taskName.trim() === "") {
            console.error("Task name is empty");
            return;  // Avoid adding an empty task
        }

        try {
            const taskData = {
                name: taskName, // Ensure taskName is properly defined
                completed: false, // Default to incomplete
                createdAt: new Date(), // Set a valid date object
                userId: user.uid,
            };

            // console.log("Task Data being sent to Firestore:", taskData); // For debugging

            // Add the task to the "tasks" collection in Firestore
            await addDoc(collection(db, "tasks"), taskData);

            // Clear the task name input field
            setTaskName("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "space-evenly"
        }}>

            <form onSubmit={handleAddTask}>
                <input
                    className="task-form"
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="+ Add task..."
                    required />
            </form>
            <button onClick={handleAddTask} className='add-task'>

                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}