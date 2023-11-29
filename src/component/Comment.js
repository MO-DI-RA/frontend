import React, { useState, useEffect } from "react";
import axios from "axios";
import comment_mark from "../asset/comment_mark.png";

function Comment({ url, type }) {
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

  //소모임인지 Q&A인지에 따라 다르게
  const getBackgroundColor = () => {
    switch (type) {
      case "group":
        return "#FFFFFF";
      case "qna":
        return "#E5E5E5";
      default:
        return "white";
    }
  };

  const commentContainerStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: "16px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    width: "1400px",
    height: "103px",
    marginLeft: "30px",
  };

  const profileImgStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "12px",
  };

  const commentInfoStyle = {
    flex: 1,
  };

  const commentWriterStyle = {
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const commentContentStyle = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "8px",
    fontSize: "14px",
    color: "black",
    wordBreak: "break-word",
  };
  return (
    <div>
      {comments.map((comment, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: type === "group" ? "60px" : "40px",
          }}
          key={index}
        >
          {type !== "group" && <img src={comment_mark}></img>}
          <div className="comment" key={index} style={commentContainerStyle}>
            <img
              src={"http://localhost:8000" + comment.author_profile_image}
              className="profileImg"
              alt="profileImg"
              style={profileImgStyle}
            />
            <div style={commentInfoStyle}>
              <div style={commentWriterStyle}>{comment.writer}</div>
              <div>{comment.created_at}</div>
              <div style={commentContentStyle}>{comment.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
