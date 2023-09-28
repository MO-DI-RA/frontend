import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/Signup" Component={SignUp} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
