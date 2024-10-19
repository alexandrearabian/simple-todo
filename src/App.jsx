// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ToDoList from './ToDoList'; // Import your main page component
import { auth } from '/Users/alex/Documents/MisProyectos/simple-todo/src/firebase/FirebaseConfig.jsx';
import Login from './components/Login';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the authenticated user
      } else {
        setUser(null);  // No user is logged in
      }
      setLoading(false); // Done checking authentication
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '150px', width: '110px' }} />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/todolist" /> : <Login />} />
        <Route path="/todolist" element={<ProtectedRoute user={user}><ToDoList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default App;
