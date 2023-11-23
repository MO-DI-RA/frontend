import React, { useState } from "react";
import "../css/MyPost.css";

function MyPost() {
  const [selectedButton, setSelectedButton] = useState("myPostGroup");
  return (
    <div>
      <div className="myPost">
        <h2 className="myPostTitle">내가 작성한 글</h2>
        <p className="myPostIntro">내가 작성한 글을 한번에 모아보세요!</p>
        <button
          className={
            selectedButton === "myPostGroup"
              ? "myPostGroup selected"
              : "myPostGroup"
          }
          onClick={() => setSelectedButton("myPostGroup")}
        >
          소모임
        </button>
        <button
          className={
            selectedButton === "myPostQnA" ? "myPostQnA selected" : "myPostQnA"
          }
          onClick={() => setSelectedButton("myPostQnA")}
        >
          Q&A
        </button>
      </div>
    </div>
  );
}

export default MyPost;
