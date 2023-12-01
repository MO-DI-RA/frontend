import React, { useState } from "react";
import axios from "axios";

function CommentInput({ postUrl, openModal }) {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("access-token");

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    marginTop: "18px",
    marginBottom: "54px",
    marginLeft: "93px",
  };
  const textareaStyle = {
    resize: "none",
    width: "1400px",
    height: "103px",
    border: "1px solid #E5E5E5",
    fontSize: "20px",
    borderRadius: "30px",
    padding: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#CCD4C9",
    width: "121px",
    height: "133px",
    fontSize: "20px",
    borderRadius: "30px",
    border: "none",
    marginLeft: "33px",
    cursor: "pointer",
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    const options = {
      url: postUrl,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        content: comment,
      },
    };

    axios(options)
      .then((response) => {
        //    console.log (response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          openModal(); // 401 오류시(로그인 안하고 댓글 등록 누르면) 모달을 띄움
        }
      });
  };

  return (
    <div className="commentInput" style={containerStyle}>
      <textarea
        style={textareaStyle}
        value={comment}
        onChange={(e) => setComment(e.target.value)}></textarea>
      <button style={buttonStyle} onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
}

export default CommentInput;
