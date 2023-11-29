import React, { useState, useEffect } from "react";
import TypeBtn from "./TypeBtn";
import "../../css/AddGroup.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AddGroup() {
  const [division, setDivision] = useState(""); //모집 구분
  const [headcnt, setHeadcnt] = useState(""); //모집 인원
  const [method, setMethod] = useState(""); //진행 방식
  const [period, setPeriod] = useState(""); //진행 기간
  const [type, setType] = useState(""); //분야
  const [contact, setContact] = useState(""); // 연락 방법
  const [deadline, setDeadline] = useState(""); //모집 마감일
  const [title, setTitle] = useState(""); //소모일 제목
  const [summary, setSummary] = useState(""); //소모임 한 줄 요악
  const [introduce, setIntroduce] = useState(""); //소모임 소개글

  const navigate = useNavigate();

  // 선택된 항목을 나타내기 위한 useState
  const [activeDivision, setActiveDivision] = useState("");
  const [activeMethod, setActiveMethod] = useState("");
  const [activeType, setActiveType] = useState("");

  const location = useLocation();
  const groupInfo = location.state?.groupInfo;
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (groupInfo) {
      // 폼 필드를 groupInfo 데이터로 초기화
      setDivision(groupInfo.division);
      setHeadcnt(groupInfo.max_people);
      setMethod(groupInfo.method);
      setPeriod(groupInfo.period);
      setType(groupInfo.tag);
      setContact(groupInfo.contact);
      setDeadline(groupInfo.deadline);
      setTitle(groupInfo.title);
      setSummary(groupInfo.summary);
      setIntroduce(groupInfo.content);

      // 선택된 항목을 나타내는 상태도 업데이트
      setActiveDivision(groupInfo.division);
      setActiveMethod(groupInfo.method);
      setActiveType(groupInfo.tag);

      setIsEditMode(true);
    }
  }, [groupInfo]);

  //모집 구분 버튼 선택
  const handleDivisionChange = (e) => {
    setDivision(e.target.value); //버튼의 value 값 저장
    setActiveDivision(e.target.value);
  };

  //모집 인원 옵션 선택
  const handleHeadcntChange = (e) => {
    setHeadcnt(e.target.value); //선택한 option value 값 저장
  };

  //진행 방식 버튼 선택
  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setActiveMethod(e.target.value);
  };

  //진행 기간 옵션 선택
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value); //선택한 option value 값 저장
  };

  // 분야 버튼 선택
  const hadnleTypeChange = (e) => {
    setType(e.target.value);
    setActiveType(e.target.value);
  };

  // 연락 방법 옵션 선택
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  // 모집 마감일 날짜 선택
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  // 제목 저장
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 한 줄 요약 저장
  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  // 소모임 소개 저장
  const handleIntroduceChange = (e) => {
    setIntroduce(e.target.value);
  };

  //폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      division: division,
      max_people: headcnt,
      method: method,
      period: period,
      tag: type,
      contact: contact,
      deadline: deadline,
      title: title,
      summary: summary,
      content: introduce,
    };

    console.log(division);
    console.log(headcnt);
    console.log(method);
    console.log(period);
    console.log(type);
    console.log("여기 ", contact);
    console.log(deadline);
    console.log(title);
    console.log(summary);
    console.log(introduce);
    if (division === "") alert("구분을 입력하세요");

    // 토큰 가져오기
    const token = localStorage.getItem("access-token");

    if (isEditMode) {
      //수정 모드이면 PUT
      const options = {
        url: `http://127.0.0.1:8000/gathering/posts/${groupInfo.id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        data: requestData,
      };
      axios(options)
        .then((response) => {
          console.log("Update successful", response);
        })
        .catch((error) => {
          console.error("Error updating data", error);
        });
    } else {
      //일반 모드이면 POST
      const options = {
        url: "http://127.0.0.1:8000/gathering/posts/",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
        data: {
          division: division, // 모집 구분
          max_people: headcnt, // 모집 인원
          period: period, // 진행 기간
          method: method, // 진행 방식
          tag: type, // 분야
          contact: contact, // 연락 방법
          deadline: deadline, // 모집 마감일
          title: title, // 소모일 제목
          summary: summary, // 소모임 한 줄 요약
          content: introduce, // 소모임 소개글
        },
      };

      axios(options)
        .then((response) => {
          // 서버가 준 새 소모임의 ID
          console.log(response);
          navigate(`/GroupPage/${response.data.id}/`); // 새 소모임의 상세 페이지로 이동
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div style={{ padding: "0px 200px 20px" }}>
        <div>
          <p className="groupTxt">
            {" "}
            <b>새로운 소모임</b>을 생성하고
            <br />
            함께 활동할 <b>팀원</b>들을 <b>모집</b>해보세요!
          </p>
        </div>
        <form className="groupForm" onSubmit={handleSubmit}>
          <p className="groupTitle"> 소모임 기본 정보 </p>
          <div className="groupInfo">
            <div className="infoPost">
              <label htmlFor="division"> 모집 구분 </label>
              <input
                type="button"
                id="division"
                value="소모임"
                onClick={handleDivisionChange}
                style={{
                  backgroundColor:
                    activeDivision === "소모임" ? "#D1DDD0" : "#E5E5E5",
                }}
              />
              <input
                type="button"
                id="division"
                value="스터디"
                onClick={handleDivisionChange}
                style={{
                  backgroundColor:
                    activeDivision === "스터디" ? "#D1DDD0" : "#E5E5E5",
                }}
              />
            </div>
            <div className="infoPost">
              <label htmlFor="headcnt"> 모집 인원 </label>
              <select id="headcnt" onChange={handleHeadcntChange}>
                {/* 인원 수 옵션 수정 필요 */}
                <option value={0}> 인원미정 </option>
                <option value={1}> 1명 </option>
                <option value={2}> 2명 </option>
                <option value={3}> 3명 </option>
                <option value={100}> 100명 </option>
              </select>
            </div>
            <div className="infoPost">
              <label htmlFor="method"> 진행 방식 </label>
              <input
                type="button"
                id="method"
                value="온라인"
                onClick={handleMethodChange}
                style={{
                  backgroundColor:
                    activeMethod === "온라인" ? "#D1DDD0" : "#E5E5E5",
                }}
              />
              <input
                type="button"
                id="method"
                value="오프라인"
                onClick={handleMethodChange}
                style={{
                  backgroundColor:
                    activeMethod === "오프라인" ? "#D1DDD0" : "#E5E5E5",
                }}
              />
            </div>
            <div className="infoPost">
              <label htmlFor="period"> 진행 기간 </label>
              <select id="period" onChange={handlePeriodChange}>
                {/* 기간 옵션 수정 필요 */}
                <option value={0}> 기간 미정 </option>
                <option value={1}> 1개월 </option>
                <option value={2}> 2개월 </option>
                <option value={12}> 12개월 </option>
              </select>
            </div>
            <div className="infoPost">
              {/* 분야 태그 옵션 수정 필요 */}
              <label htmlFor="type"> 분야 </label>
              <TypeBtn
                id="type"
                handleChange={hadnleTypeChange}
                activeType={activeType}
                className="type"
              />
            </div>
            <div className="infoPost">
              <label htmlFor="contact"> 연락 방법 </label>
              <select id="contact" onChange={handleContactChange}>
                <option value={"카카오톡 오픈채팅"}> 카카오톡 오픈채팅 </option>
                <option value={"이메일"}> 이메일 </option>
                <option value={"네이버 폼"}> 네이버 폼 </option>
                <option value={"구글 폼"}> 구글 폼 </option>
              </select>
            </div>
            <div className="infoPost">
              <label htmlFor="deadline"> 모집 마감 </label>
              <input
                className="deadline"
                id="deadline"
                type="date"
                onChange={handleDeadlineChange}
                value={deadline}
              />
            </div>
          </div>
          <div>
            <p className="groupTitle">소모임 소개글</p>
            <div className="groupPost">
              <div className="postElement" style={{ gap: "80px" }}>
                <label htmlFor="title"> 제목 </label>
                <input
                  id="title"
                  type="text"
                  className="text"
                  placeholder="제목을 입력해주세요"
                  onChange={handleTitleChange}
                />
              </div>
              <div className="postElement" style={{ gap: "40px" }}>
                <label htmlFor="summary"> 한 줄 요약 </label>
                <input
                  id="summary"
                  type="text"
                  className="text"
                  placeholder="소모임을 한 줄로 설명해주세요"
                  onChange={handleSummaryChange}
                />
              </div>
              <div
                className="postElement"
                style={{
                  gap: "20px",
                  flexDirection: "column",
                  alignItems: "normal",
                }}
              >
                <label htmlFor="introduce"> 소모임 소개 </label>
                <textarea id="introduce" onChange={handleIntroduceChange} />
              </div>
            </div>
          </div>
          <div className="groupBtn">
            <button
              type="button"
              style={{ backgroundColor: "#d9d9d9" }}
              onClick={handleCancel}
            >
              취소하기
            </button>
            {isEditMode ? (
              <button style={{ backgroundColor: "#aec0ac" }}>수정 완료</button>
            ) : (
              <button style={{ backgroundColor: "#aec0ac" }}>등록하기</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGroup;
