import React, { useState } from "react";
import axios from "axios";

function CommentInput() {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("access-token");

  const containerStyle = {
    display: "flex", // enables flexbox
    justifyContent: "center", // centers items horizontally in the container
    alignItems: "center", // centers items vertically in the container
    marginTop: "18px",
    marginBottom: "54px",
  };
  const textareaStyle = {
    resize: "none",
    width: "869px",
    height: "103px",
    border: "1px solid #E5E5E5",
    fontSize: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#E5E5E5",
    width: "121px",
    height: "103px",
    fontSize: "20px",
    borderRadius: "30px",
    borderColor: "#E5E5E5",
    marginLeft: "33px",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "http://127.0.0.1:8000/", ///////////////////////
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        comment: comment,
      },
    };

    axios(options)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  return (
    <div className="commentInput" style={containerStyle}>
      <textarea
        style={textareaStyle}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button style={buttonStyle} onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
}

export default CommentInput;
