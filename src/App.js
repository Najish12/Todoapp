import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import CreateTask from './pages/CreateTask';
import Home from './pages/Home';
import Profile from './pages/Profile';
import TaskList from './pages/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './pages/PageNotFound';
import { TodoProvider } from './context/TodoContext';
import ProtectedRoute from './auth/ProtectedRoute';


function App(props) {
  return (
    <BrowserRouter>
    <TodoProvider>
    <Navigation />
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}></Route>
      <Route path='/' element={<Home/>}>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
      <Route path='/createtask' element={<CreateTask/>}></Route>
      <Route path='/task-list' element={<TaskList/>}></Route>
      <Route path='*' element={<PageNotFound/>}></Route>
      
    </Routes>
    </TodoProvider>
    </BrowserRouter>
  );
}

export default App;