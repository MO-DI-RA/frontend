import React, { useState, useEffect } from "react";
import axios from "axios";

function Comment({ url }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("데이터 : ", response.data);
        setComments(response.data);
        console.log("댓글 내용: ", comments);
      })
      .catch((error) => console.error(error));
  }, [url]);

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

  return (
    <div>
      {comments.map((comment, index) => (
        <div className="comment" key={index} style={containerStyle}>
          <div className="userInfo">
            <img
              src={"http://localhost:8000" + comment.author_profile_image}
              className="profileImg"
              alt="profileImg"
              style={commentInputStyle}
            />
            <p>{comment.writer}</p>
          </div>
          <p className="commentContent" style={commentContentStyle}>
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Comment;
