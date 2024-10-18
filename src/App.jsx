import { useEffect, useState } from "react"
import { db } from "/Users/alex/Documents/MisProyectos/simple-todo/database/FirebaseConfig.jsx";
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";


function App() {
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectedTask = (task) => {
    setSelectedTask(task);
  }

  const handleClose = () => {
    setSelectedTask(null);
  }

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, [])

  return (
    <>
      <h1>
        Welcome to your simple <span style={{ color: 'var(--mainColor)' }}>to-do </span>list!
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

export default App
