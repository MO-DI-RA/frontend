import React, { useState, useEffect } from "react";
import "../../css/GroupPage.css";
import defaultImg from "../../asset/defaultImg.png";
import goBack from "../../asset/goBack.png";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function GroupPage() {
  const navigate = useNavigate();
  const {id} = useParams();

  //소모임 상세 정보
  const [groupInfo, setGroupInfo] = useState({
    id : '',
    profile : defaultImg,
    nickname : '',
    deadline : '',
    title : '',
    content : '',
    created_at : '',
    status : false,
    summary : '',
    type : '',
  })

  //모집중, 모집완료 표시
  const [recruiting, setRecruiting] = useState(groupInfo.status);


  useEffect(() => {
    axios({
      method : "GET",
      url : `gathering/posts/${id}`,
      headers : {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
      // 분야 추가 필요
      const { id, title, deadline, content, summary, author_profile_image, author_nickname, created_at, status } = res.data;
      setGroupInfo({
        id : id,
        profile : author_profile_image,
        nickname : author_nickname,
        deadline : deadline,
        title : title,
        content : content,
        created_at : created_at,
        status : status,
        summary : summary,
      })
    })
    .then((err) => {
      console.log("error : ", err);
    })
    console.log(recruiting ? "모집중" : "모집완료");
  }, []);

  const toggleRecruitmentStatus = () => {
    setRecruiting(!recruiting);
  };

  // 모집중 버튼
  const buttonStyle = recruiting
    ? "groupState"
    : "groupState recruitingComplete";
  const buttonText = recruiting ? "모집중" : "모집완료";

  // 뒤로가기 버튼
  const onBackClick=()=>{
    navigate(-1);
  }

  return (
    <div>
      <div className="groupPage">
        <div className="groupPageContainer">
        <img src={goBack} className="goBack" alt="뒤로가기" onClick={onBackClick}/>
          <div className="groupTitleLayout">
            <h2> {groupInfo.title} </h2>
            <button className={buttonStyle} onClick={toggleRecruitmentStatus}>
              {buttonText}
            </button>
          </div>
        </div>

        <p> {groupInfo.summary} </p>

        <div className="userInfo">
          <img src={groupInfo.profile} className="defaultImg" alt="defaultImg"></img>
          <p> {groupInfo.nickname} </p>
          <p> {groupInfo.created_at} </p>
        </div>

        <div className="groupInfo">
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 구분</p>
            <p className="groupInfoValue">소모임</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">분야</p>
            <div className="rowLayout">
              <p className="groupInfoValue"> #{groupInfo.type}</p>
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
            <p className="groupInfoValue"> {groupInfo.deadline} </p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">진행 기간</p>
            <p className="groupInfoValue">6개월</p>
          </div>
        </div>

        <h3 className="groupIntro">소모임 소개</h3>
        <p className="groupContent"> {groupInfo.content}</p>

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
    </div>
  );
}

export default GroupPage;
