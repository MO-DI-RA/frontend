import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Mypage from "./page/Mypage";
import Home from "./page/Home";
import AddQnA from "./page/QnA/AddQnA";
import MyPost from "./page/MyPost";
import GroupPage from "./page/Group/GroupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/Signup" Component={SignUp} />
        <Route path="/Mypage" Component={Mypage} />
        <Route path="/Home" Component={Home} />
        <Route path="/AddQnA" Component={AddQnA} />
        <Route path="/MyPost" Component={MyPost} />
        <Route path="/GroupPage" Component={GroupPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
