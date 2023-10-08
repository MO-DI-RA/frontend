import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Home from "./page/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/Signup" Component={SignUp} />
                <Route path="/Home" Component={Home}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
