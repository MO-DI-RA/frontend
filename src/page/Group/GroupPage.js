import React, { useState, useEffect } from "react";
import "../../css/GroupPage.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import defaultImg from "../../asset/defaultImg.png";
import goBack from "../../asset/goBack.png";

function GroupPage() {
  const [recruiting, setRecruiting] = useState(true);

  useEffect(() => {
    console.log(recruiting ? "모집중" : "모집완료");
  }, [recruiting]);

  const toggleRecruitmentStatus = () => {
    setRecruiting(!recruiting);
  };

  const buttonStyle = recruiting
    ? "groupState"
    : "groupState recruitingComplete";
  const buttonText = recruiting ? "모집중" : "모집완료";

  return (
    <div>
      <Header />
      <div className="groupPage">
        <div className="groupPageContainer">
          <img src={goBack} className="goBack" alt="뒤로가기"></img>
          <div className="groupTitleLayout">
            <h2>소모임 명</h2>
            <button className={buttonStyle} onClick={toggleRecruitmentStatus}>
              {buttonText}
            </button>
          </div>
        </div>

        <p>소모임 소개글</p>

        <div className="userInfo">
          <img src={defaultImg} className="defaultImg" alt="defaultImg"></img>
          <p>작성자 닉네임</p>
          <p>2023.09.26</p>
        </div>

        <div className="groupInfo">
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 구분</p>
            <p className="groupInfoValue">소모임</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">분야</p>
            <div className="rowLayout">
              <p className="groupInfoValue">#학술</p>
              <p className="groupInfoValue">#공부</p>
            </div>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 인원</p>
            <p className="groupInfoValue">5명</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">연락 방법</p>
            <p className="groupInfoValue">카카오톡 오픈채팅</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">진행 방식</p>
            <p className="groupInfoValue">오프라인</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 마감일</p>
            <p className="groupInfoValue">2023.10.24</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">진행 기간</p>
            <p className="groupInfoValue">6개월</p>
          </div>
        </div>

        <h3 className="groupIntro">소모임 소개</h3>
        <p className="groupContent">소모임 활동에 대한 자세한 내용</p>

        <div className="groupEditButtons">
          <button className="groupModifyButton">수정하기</button>
          <button className="groupDeleteButton">삭제하기</button>
        </div>

        <h3 className="commentTitle">댓글</h3>
        <div className="commentLayout">
          <textarea className="commentInput"></textarea>
          <button className="commentRegister">등록</button>
        </div>
        <div className="userInfo">
          <img src={defaultImg} className="defaultImg" alt="defaultImg"></img>
          <p>사용자 닉네임</p>
        </div>
        <p className="commentContent">댓글 내용</p>
      </div>
      <Footer />
    </div>
  );
}

export default GroupPage;
