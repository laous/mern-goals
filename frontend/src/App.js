import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>

    </BrowserRouter>
  );
}

export default App;
