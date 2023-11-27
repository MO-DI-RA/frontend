import React, { useState, useEffect } from "react";
import "../../css/GroupPage.css";
import defaultImg from "../../asset/defaultImg.png";
import goBack from "../../asset/goBack.png";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import GroupComment from "../../component/GroupComment";
import CommentInput from "../../component/CommentInput";

function GroupPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    //소모임 상세 정보
    const [groupInfo, setGroupInfo] = useState({});

    //모집중, 모집완료 표시
    const [recruiting, setRecruiting] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/gathering/posts/${id}/`,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((err) => {
          console.error("Error during deletion:", err);
          window.confirm("삭제 실패!ㅋㅋ");
        });
    }
  };

  return (
    <div>
      <div className="groupPage">
        <div className="groupPageContainer">
          <img
            src={goBack}
            className="goBack"
            alt="뒤로가기"
            onClick={onBackClick}
          />

          <div className="groupTitleLayout">
            <h2> {groupInfo.title} </h2>
            <button className={buttonStyle} onClick={toggleRecruitmentStatus}>
              {buttonText}
            </button>
          </div>
        </div>

        <p> {groupInfo.summary} </p>

        <div className="userInfo">
          <img
            src={groupInfo.profile}
            className="profileImg"
            alt="profileImg"
          ></img>

          <p> {groupInfo.nickname} </p>
          <p> {groupInfo.created_at} </p>
        </div>

        <div className="groupInfo">
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 구분</p>
            <p className="groupInfoValue">{groupInfo.division}</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">분야</p>
            <div className="rowLayout">
              <p className="groupInfoValue"> #{groupInfo.tag}</p>
            </div>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 인원</p>
            <p className="groupInfoValue">{groupInfo.max_people}</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">연락 방법</p>
            <p className="groupInfoValue">{groupInfo.contact}</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">진행 방식</p>
            <p className="groupInfoValue">{groupInfo.method}</p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">모집 마감일</p>
            <p className="groupInfoValue"> {groupInfo.deadline} </p>
          </div>
          <div className="rowLayout">
            <p className="groupInfoLabel">진행 기간</p>
            <p className="groupInfoValue">{groupInfo.period}</p>
          </div>
        </div>

        <h3 className="groupIntro">소모임 소개</h3>
        <p className="groupContent"> {groupInfo.content}</p>

        <div className="groupEditButtons">
          <button className="groupModifyButton" onClick={handleEdit}>
            수정하기
          </button>
          <button className="groupDeleteButton" onClick={handleDelete}>
            삭제하기
          </button>
        </div>

        <h3 className="commentTitle">댓글</h3>
        {/* <div className="commentLayout">
          <textarea className="commentInput"></textarea>
          <button className="commentRegister">등록</button>
        </div> */}
        <CommentInput />
        {/* <div className="userInfo">
          <img src={defaultImg} className="defaultImg" alt="defaultImg"></img>
          <p>사용자 닉네임</p>
        </div>
        <p className="commentContent">댓글 내용</p> */}
        <GroupComment id={id} />
      </div>
    </div>
  );

}

export default GroupPage;
