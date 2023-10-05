import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

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
