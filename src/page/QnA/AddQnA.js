import React, { useState } from "react";
import axios from "axios";

import "../../css/AddQnA.css";

function AddQnA() {
  const [qnaTitle, setQnaTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://127.0.0.1:8000/qna/posts";

      const postData = {
        title: qnaTitle,
        content: questionContent,
      };

      const response = await axios.post(url, postData);

      console.log("POST 요청 성공:", response.data);
    } catch (error) {
      console.error("POST 요청 실패:", error);
    }
  };

  return (
    <div>
      <div className="addQnA">
        <p className="introQnA">
          질문을 <span className="registerQnA">등록</span>하고
          <br />
          궁금증을 해결해보세요!
        </p>
        <form className="addQnAForm" onSubmit={handleFormSubmit}>
          <input
            id="qnaTitle"
            name="qnaTitle"
            placeholder="제목을 작성해주세요"
            required
            value={qnaTitle}
            onChange={(e) => setQnaTitle(e.target.value)}
          ></input>
          <textarea
            className="qusetionContent"
            required
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
          ></textarea>
          <div className="registerQnAButtons">
            <button className="cancelButton">취소하기</button>
            <button type="submit" className="registerQnAButton">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQnA;
