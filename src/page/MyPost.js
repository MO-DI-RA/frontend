import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MyPost.css";

function MyPost() {
  const [selectedButton, setSelectedButton] = useState("myPostGroup");
  const [myPosts, setMyPosts] = useState([]);
  const [endpoint, setEndpoint] = useState("gathering");

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const options = {
      url: `http://127.0.0.1:8000/${endpoint}/posts/myposts/`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        setMyPosts(response.data);
      })
      .catch((error) => console.error(error));
  }, [endpoint]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === "myPostGroup") {
      setEndpoint("gathering"); // "소모임" 버튼을 누르면 endpoint를 "gathering"으로 설정
    } else if (buttonName === "myPostQnA") {
      setEndpoint("qna"); // "Q&A" 버튼을 누르면 endpoint를 "qna"으로 설정
    }
  };

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
          onClick={() => handleButtonClick("myPostGroup")}
        >
          소모임
        </button>
        <button
          className={
            selectedButton === "myPostQnA" ? "myPostQnA selected" : "myPostQnA"
          }
          onClick={() => handleButtonClick("myPostQnA")}
        >
          Q&A
        </button>
      </div>
      {/* 가져온 내용을 화면에 렌더링 */}
      <div className="myPostContent">
        {myPosts.map((post) => (
          <div key={post.id} className="postItem">
            <div className="postHeader">
              <img
                src={post.author_profile_image}
                alt={`작성자: ${post.author_nickname}`}
                className="authorImage"
              />
              <p className="authorNickname">{post.author_nickname}</p>
              <p className="postCreatedAt">{post.created_at}</p>
            </div>
            <h3 className="postTitle">{post.title}</h3>
            <p className="postContent">{post.content}</p>
            <p className="postStatus">상태: {post.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPost;
