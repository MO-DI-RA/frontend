import "./App.css";
import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./redux/AuthContext";
import { useAuth } from "./redux/AuthContext";

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

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/kakao/callback/" element={<Redirect />} />
          <Route
            path="/mypage"
            element={<PrivateRoute element={<Mypage />} />}
          />
          <Route
            path="/AddGroup"
            element={<PrivateRoute element={<AddGroup />} />}
          />
          <Route
            path="/AddGroup/:id"
            element={<PrivateRoute element={<AddGroup />} />}
          />
          <Route
            path="/addqna"
            element={<PrivateRoute element={<AddQnA />} />}
          />
          <Route
            path="/mypost"
            element={<PrivateRoute element={<MyPost />} />}
          />
          <Route path="/grouppage/:id" element={<GroupPage />} />
          <Route path="/qnapage/:id" element={<QnAPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
