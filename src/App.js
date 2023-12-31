import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./redux/AuthContext";

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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/mypage" Component={Mypage} />
          <Route path="/home" Component={Home} />
          <Route path="/AddGroup" Component={AddGroup} />
          <Route path="/AddGroup/:id" Component={AddGroup} />
          <Route path="/user/kakao/callback/" Component={Redirect} />
          <Route path="/addqna" Component={AddQnA} />
          <Route path="/mypost" Component={MyPost} />
          <Route path="/grouppage/:id" Component={GroupPage} />
          <Route path="/qnapage/:id" Component={QnAPage} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
