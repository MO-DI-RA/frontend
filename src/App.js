import "./App.css";
// import { actionCreators } from "./redux/user";
import React, { useEffect } from "react";
// import { getCookie } from "./config/cookie";
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
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  // //쿠키에 저장된 액세스 토큰이 존재할 때만 서버에 검증 요청
  //  if(getCookie("is_login")){
  //    dispatch(actionCreators.loginCheckDB());
  //  }
  // }, []);

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
