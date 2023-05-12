import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import CreateTask from "./pages/CreateTask";
import TaskList from "./pages/TaskList";
import PageNotFound from "./pages/PageNotFound";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import { TodoProvider } from "./context/TodoContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
          <Route path="/create-task" element={<CreateTask />}></Route>
          <Route path="/task-list" element={<TaskList />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </TodoProvider>
    </BrowserRouter>
  );
}
export default App;
