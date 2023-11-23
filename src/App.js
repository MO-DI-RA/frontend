import "./App.css";
import { actionCreators } from "./redux/user";
import React, { useEffect, useState } from "react";
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

import Header from "./component/Header";
import Footer from "./component/Footer";

import { getCookie } from "./config/cookie";
import { useDispatch } from "react-redux";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

  const dispatch = useDispatch();
  //로그인 유지
  useEffect(() => {
    if (getCookie("refresh-token")) {
      dispatch(actionCreators.loginCheckDB());
    }
  }, [dispatch]);

  //로그인 상태 변경
  const changeLoggedIN = (value) => {
    setIsLoggedIn(value);
    dispatch(isLoggedIn);
  };

  return (
    <BrowserRouter>
        <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login} changeLoggedIN={changeLoggedIN}/>
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
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
