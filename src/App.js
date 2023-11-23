import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Header/>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/Signup" Component={SignUp} />
          <Route path="/Mypage" Component={Mypage} />
          <Route path="/Home" Component={Home} />
          <Route path="/AddGroup" Component={AddGroup} />
          <Route path="/user/kakao/callback/" Component={Redirect} />
          <Route path="/AddQnA" Component={AddQnA} />
          <Route path="/MyPost" Component={MyPost} />
          <Route path="/GroupPage/:id" Component={GroupPage} />
          <Route path="/QnAPage" Component={QnAPage} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
