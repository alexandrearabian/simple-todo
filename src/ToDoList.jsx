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

  const handleSelectedTask = (task) => {
    setSelectedTask(task);
  }

  const handleClose = () => {
    setSelectedTask(null);
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
      <BurgerMenu handleLogout={handleLogout}/>
      <h1>
        What do you want to <span style={{ color: 'var(--mainColor)' }}>achieve</span> today...✨
      </h1>
      <div className="todolist">
        <div >
          <TaskForm />
          <ul className="tasks">
            {tasks.map((task) => (
              <Task key={task.id} task={task} onTaskClick={() => handleSelectedTask(task)} />
            ))}
          </ul>
        </div>
        {selectedTask && (
          <TaskDetail key={selectedTask.id} task={selectedTask} closeDetail={handleClose} />

        )}
      </div>



    </>
  )
}

export default ToDoList;
