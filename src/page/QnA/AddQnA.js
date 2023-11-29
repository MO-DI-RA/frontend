import React, { useState } from "react";
import axios from "axios";
import "../../css/AddQnA.css";
import { useNavigate } from "react-router-dom";

function AddQnA() {
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaSummary, setQnaSummary] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const options = {
      url: "http://127.0.0.1:8000/qna/posts/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: qnaTitle,
        summary: qnaSummary,
        content: questionContent,
      },
    };

    axios(options)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    navigate(-1);
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
          <input
            id="qnaSummary"
            name="qnaSummary"
            placeholder="Q&A의 내용을 한 줄로 요약해주세요"
            required
            value={qnaSummary}
            onChange={(e) => setQnaSummary(e.target.value)}
          />
          <textarea
            className="qusetionContent"
            required
            value={questionContent}
            onChange={(e) => setQuestionContent(e.target.value)}
          ></textarea>
          <div className="registerQnAButtons">
            <button className="cancelButton" onClick={handleCancel}>
              취소하기
            </button>
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
