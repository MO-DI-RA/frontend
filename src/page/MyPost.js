import React, { useState, useEffect } from "react";
// import axios from "axios";
import "../css/MyPost.css";
import GroupContainer from "../component/GroupContainer";
import QnAContainer from "../component/QnAContainer";

function MyPost() {
  const token = localStorage.getItem("access-token");
  const [selectedButton, setSelectedButton] = useState("myPostGroup");
  const [isGroup, setIsGroup] = useState(true); //소모임을 선택했는지 확인

  //소모임, Q&A 컨테이너 전달 Props
  const method = "GET";
  const [url, setUrl] = useState(
    `http://127.0.0.1:8000/gathering/posts/myposts/`
  ); //컴포넌트에 전달할 url
  const [headers, setHeaders] = useState({
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${token}`,
  }); //axios 요청 header

  useEffect(() => {
    const options = {
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    };

    setUrl(options.url); //컴포넌트에 전달할 url 설정
    setHeaders(options.headers); //컴포넌트에 전달할 headers 설정
  }, [token, isGroup]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === "myPostGroup") {
      setUrl(`http://127.0.0.1:8000/gathering/posts/myposts/`);
      setIsGroup(true); //소모임 컨테이너 렌더링
      console.log("내가 작성한 글 소모임");
      console.log("내가 작성한 글 URL : ", url);
    } else if (buttonName === "myPostQnA") {
      setUrl(`http://127.0.0.1:8000/qna/posts/myposts/`);
      setIsGroup(false); //QnA 컨테이너 렌더링
      console.log("내가 작성한 글 QNA");
      console.log("내가 작성한 글 URL : ", url);
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
          onClick={() => handleButtonClick("myPostGroup")}>
          소모임
        </button>
        <button
          className={
            selectedButton === "myPostQnA" ? "myPostQnA selected" : "myPostQnA"
          }
          onClick={() => handleButtonClick("myPostQnA")}>
          Q&A
        </button>
      </div>
      {/* 가져온 내용을 화면에 렌더링 */}
      <div className="myPostContent">
        {isGroup ? (
          <div className="groupContainer">
            <GroupContainer
              method={method}
              url={url}
              headers={headers}
              modify={false}
            />
          </div>
        ) : (
          <div className="groupContainer">
            <QnAContainer
              method={method}
              url={url}
              headers={headers}
              modfiy={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPost;
