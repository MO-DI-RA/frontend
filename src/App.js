import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Mypage from "./Mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/Signup" Component={SignUp} />
        <Route path="/Mypage" Component={Mypage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
