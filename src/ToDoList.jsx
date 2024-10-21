import { useEffect, useState } from "react"
import { db, auth } from "./firebase/FirebaseConfig.jsx";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, orderBy, where, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import Task from "./components/Task.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskDetail from "./components/TaskDetail.jsx";

import BurgerMenu from "./components/BurgerMenu.jsx";


function ToDoList() {
  const [tasks, setTasks] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDetailVisible, setTaskDetailVisible] = useState(false);
  const [isTaskDetailClosing, setTaskDetailClosing] = useState(false);

  const handleSelectedTask = (task) => {
    // If there's already a task detail open, close it first before opening a new one
    if (isTaskDetailVisible || selectedTask) {
      setTaskDetailClosing(true); // Start closing animation for current detail
      setTimeout(() => {
        // Once the close animation finishes, update the selected task and show the new task detail
        setSelectedTask(task);
        setTaskDetailClosing(false); // Reset closing state
        setTaskDetailVisible(true); // Open the new TaskDetail
      }, 500); // Match the transition time (500ms)
    } else {
      // No task detail currently open, open directly
      setSelectedTask(task);
      setTaskDetailVisible(true);
    }
  };

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

  const handleCheckTask = async (taskId) => {
    const user = auth.currentUser;

    try {
      const taskRef = doc(db, "tasks", taskId);
      const taskSnapshot = await getDoc(taskRef);

      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.data();
        if (taskData.userId !== user.uid) {
          console.error("Permission denied: You cannot modify this task.");
          return;
        }

        const newStatus = !taskData.completed;

        // Update the task in Firestore
        await updateDoc(taskRef, { completed: newStatus });

        // Update the local tasks state (to update task list)
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: newStatus } : task
          )
        );

        // Also update the selectedTask if it's the one being viewed in TaskDetail
        if (selectedTask && selectedTask.id === taskId) {
          setSelectedTask((prevTask) => ({
            ...prevTask,
            completed: newStatus,
          }));
        }
      } else {
        console.error("No task found");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
        //    UPDATE currently selected app -> more data usage
        //
        //     if (selectedTask) {
        //     const updatedTask = tasksData.find((task) => task.id === selectedTask.id);
        //     if (updatedTask) {
        //       setSelectedTask(updatedTask);
        //     }
        //   }
        // });
      });

      return () => unsubscribe();
    }
  }, []);
  // }, [selectedTask]);

  return (
    <>
      <BurgerMenu handleLogout={handleLogout} />
      <h1>
        What do you want to <span style={{ color: 'var(--mainColor)' }}>achieve</span> today...✨
      </h1>
      <div className="todolist">
        <div className={`taskForm-and-tasks ${isTaskDetailVisible && !isTaskDetailClosing ? 'slide-left' : ''}`}>
          <TaskForm />
          <ul className="tasks">
            {tasks.map((task) => (
              <Task key={task.id}
                task={task}
                onTaskClick={() => handleSelectedTask(task)}
                handleCheckTask={handleCheckTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </div>
        <div className="details">

          {selectedTask && (
            <TaskDetail
              key={selectedTask.id}
              task={selectedTask}
              closeDetail={handleClose}
              isVisible={isTaskDetailVisible && !isTaskDetailClosing}
              handleCheckTask={handleCheckTask}
              handleDeleteTask={handleDeleteTask}

            />

          )}
        </div>
      </div>



    </>
  )
}

export default ToDoList;
