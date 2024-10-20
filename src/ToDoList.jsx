import { useEffect, useState } from "react"
import { db, auth } from "./firebase/FirebaseConfig.jsx";
import { signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, orderBy, where, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import Task from "./components/Task.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskDetail from "./components/TaskDetail.jsx";

import BurgerMenu from "./components/BurgerMenu.jsx";


function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailVisible, setTaskDetailVisible] = useState(false);
  const [isTaskDetailClosing, setTaskDetailClosing] = useState(false);

  const handleSelectedTask = (task) => {
    setSelectedTask(task);
    setTaskDetailVisible(true);
  }

  const handleClose = () => {
    setTaskDetailClosing(true); // Start the closing transition
    setTimeout(() => {
      setTaskDetailVisible(false); // Hide TaskDetail
      setTaskDetailClosing(false); // Reset closing state after transition ends
      setSelectedTask(null); // Remove TaskDetail after animation completes
    }, 500); // Match the duration of the transition
  }

  function handleLogout() {
    signOut(auth);
  }

  useEffect(() => {
    const user = auth.currentUser; // Get the current authenticated user

    if (user) {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", user.uid), // Fetch tasks only for the current user
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <>
      <div className="ball" />
      <BurgerMenu handleLogout={handleLogout} />
      <h1>
        What do you want to <span style={{ color: 'var(--mainColor)' }}>achieve</span> today...✨
      </h1>
      <div className="todolist">
        <div className={`taskForm-and-tasks ${isTaskDetailVisible && !isTaskDetailClosing ? 'slide-left' : ''}`}>
          <TaskForm />
          <ul className="tasks">
            {tasks.map((task) => (
              <Task key={task.id} task={task} onTaskClick={() => handleSelectedTask(task)} />
            ))}
          </ul>
        </div>
        <div className="details">

          {selectedTask && (
            <TaskDetail
              key={selectedTask.id}
              task={selectedTask}
              closeDetail={handleClose}
              isVisible={isTaskDetailVisible && !isTaskDetailClosing} />

          )}
        </div>
      </div>



    </>
  )
}

export default ToDoList;
