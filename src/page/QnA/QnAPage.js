import React, { useState, useEffect } from "react";
import "../../css/QnAPage.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import defaultImg from "../../asset/defaultImg.png";
import goBack from "../../asset/goBack.png";

function QnAPage() {
  const [resolve, setResolve] = useState(false);

  useEffect(() => {
  }, [resolve]);

  const toggleResolveStatus = () => {
    setResolve(!resolve);
  };

  const buttonStyle = resolve ? "qnaState resolve" : "qnaState";
  const buttonText = resolve ? "해결" : "미해결";

  return (
    <div>
      <Header />
      <div className="qnaPage">
        <div className="qnaPageContainer">
          <img src={goBack} className="goBack" alt="뒤로가기"></img>
          <div className="qnaTitleLayout">
            <h2>질문 제목</h2>
            <button className={buttonStyle} onClick={toggleResolveStatus}>
              {buttonText}
            </button>
          </div>
        </div>
        <div className="userInfo">
          <p>2023.11.04 03:52 작성</p>
          <p>조회수 0</p>
        </div>
        <div className="userInfo">
          <img src={defaultImg} className="defaultImg" alt="defaultImg"></img>
          <p>작성자 닉네임</p>
        </div>

        <p className="qnaContent">질문 내용</p>

        <div className="qnaEditButtons">
          <button className="qnaModifyButton">수정하기</button>
          <button className="qnaDeleteButton">삭제하기</button>
        </div>

        <h3 className="answerTitle">답변 등록하기</h3>
        <div className="answerInputLayout">
          <textarea className="answerInput"></textarea>
          <button className="answerRegister">등록</button>
        </div>

        <div className="answerLayout">
          <div className="userInfo">
            <img src={defaultImg} className="defaultImg" alt="defaultImg"></img>
            <p>사용자 닉네임</p>
            <p>2023.11.04 04:12</p>
          </div>
          <p className="answerContent">답변 내용</p>
          <button className="CommentOnAnswer">댓글 달기</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default QnAPage;
