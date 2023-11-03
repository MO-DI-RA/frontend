import React from "react";
import Header from "../component/Header";
import Banner from "../component/Banner";
import Footer from "../component/Footer";

import "../css/Home.css";

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <div className="nav">
        <a href="/" className="group">
          소모임
        </a>
        <a href="/" className="qna">
          Q&A
        </a>
      </div>
      <div className="groupList"></div>
      <Footer />
    </div>
  );
}

export default Home;
