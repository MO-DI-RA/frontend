import React, { useState, useEffect } from "react";
import axios from "axios";

function GroupComment({ id }) {
  const [commentData, setCommentData] = useState({
    profileImg: "",
    commentContent: "",
    nickname: "",
  });
  const token = localStorage.getItem("access-token");

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // .commentLayout의 width 스타일
    gap: "10px", // .commentLayout의 gap 스타일
  };

  const commentInputStyle = {
    height: "50px",
    borderColor: "#D9D9D9",
    borderRadius: "10px",
    resize: "none",
    fontSize: "20px",
    flexGrow: 1, // flex-grow 속성
  };

  const commentContentStyle = {
    marginLeft: "40px",
    marginBottom: "50px",
  };

  useEffect(() => {
    const options = {
      url: `http://127.0.0.1:8000/gathering/posts/${id}/comments/`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        // Authorization: `Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        // 서버로부터 받은 데이터로 상태를 업데이트
        setCommentData({
          profileImg: response.data.profile_image,
          commentContent: response.data.content,
          nickname: response.data.nickname,
        });
      })
      .catch((error) => console.error(error));
  }, [token, id]);
  const { profileImg, commentContent, nickname } = commentData;

  return (
    <div className="groupComment" style={containerStyle}>
      <div className="userInfo">
        <img
          src={"http://localhost:8000" + profileImg}
          className="profileImg"
          alt="profileImg"
          style={commentInputStyle}
        ></img>
        <p>{nickname}</p>
      </div>
      <p className="commentContent" style={commentContentStyle}>
        {commentContent}
      </p>
    </div>
  );
}

export default GroupComment;
