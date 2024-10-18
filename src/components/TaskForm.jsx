import { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "/Users/alex/Documents/MisProyectos/simple-todo/database/FirebaseConfig.jsx";

export default function TaskForm() {
    const [taskName, setTaskName] = useState("");

    const handleAddTask = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit

        if (taskName.trim() === "") {
            console.error("Task name is empty");
            return;  // Avoid adding an empty task
        }

        try {
            const taskData = {
                name: taskName, // Ensure taskName is properly defined
                completed: false, // Default to incomplete
                createdAt: new Date(), // Set a valid date object
            };

            console.log("Task Data being sent to Firestore:", taskData); // For debugging

            // Add the task to the "tasks" collection in Firestore
            await addDoc(collection(db, "tasks"), taskData);

            // Clear the task name input field
            setTaskName("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={handleAddTask}>
            <input
                className="task-form"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="+ Add task..."
                required />
        </form>
    )
}