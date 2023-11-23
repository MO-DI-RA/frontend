import "./App.css";
import { actionCreators } from "./redux/user";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Mypage from "./page/Mypage";
import Home from "./page/Home";
import AddQnA from "./page/QnA/AddQnA";
import MyPost from "./page/MyPost";
import GroupPage from "./page/Group/GroupPage";
import QnAPage from "./page/QnA/QnAPage";
import AddGroup from "./page/Group/AddGroup";
import Redirect from "./page/Redirect";
import { getCookie } from "./config/cookie";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  //로그인 유지
  useEffect(() => {
    if (getCookie("refresh-token")) {
      dispatch(actionCreators.loginCheckDB());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/Signup" Component={SignUp} />
        <Route path="/Mypage" Component={Mypage} />
        <Route path="/Home" Component={Home} />
        <Route path="/AddGroup" Component={AddGroup} />
        <Route path="/user/kakao/callback/" Component={Redirect} />
        <Route path="/AddQnA" Component={AddQnA} />
        <Route path="/MyPost" Component={MyPost} />
        <Route path="/GroupPage" Component={GroupPage} />
        <Route path="/QnAPage" Component={QnAPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
