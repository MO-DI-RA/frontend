import React from "react";
import Banner from "../component/Banner";

import "../css/Home.css";

function Home() {
  return (
    <div>
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
    </div>
  );
}

export default Home;
