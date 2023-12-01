import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import defaultImg from "../asset/defaultImg.png";

function QnAContainer({ method, url, headers, modify }) {
    const token = localStorage.getItem("access-token");

    const [existList, setExistList] = useState(true); //관심 설정한 Q&A가 있을때
    const [QnAList, setQnAList] = useState([]);

    //modify 수정 가능? 불가능
    const [modifyList, setModifyList] = useState(false);
    const [selectedQID, setSelectedQID] = useState([]); //QnA 아이디 배열

    useEffect(() => {
        console.log("url in container", url);
        axios({
            method: method,
            url: url,
            headers: headers,
        })
            .then(res => {
                console.log(res.data);
                console.log(res.data.length);
                // 데이터가 없으면 setExistList == false
                if (res.data.length === 0) {
                    setExistList(false);
                } else {
                    setExistList(true);
                    setQnAList(res.data);
                }
            })
            .then(err => {
                console.log("error : ", err);
            });
    }, [method, url, headers, modifyList]);

    //컨테이너 박스 클릭 시 QnA id 저장
    const clickContainer = id => {
        if (modifyList) {
            const isSelectedID = selectedQID.includes(id);
            // 이미 선택됐으면 배열에서 제거하기
            if (isSelectedID) {
                setSelectedQID(prevSelectedGID =>
                    prevSelectedGID.filter(qid => qid !== id)
                );
            } else {
                // 선택되지 않았으면 배열에 추가하기
                setSelectedQID(prevSelectedQID => [...prevSelectedQID, id]);
            }
        }
    };

    // 수정하기 버튼 클릭
    const clickModify = () => {
        setModifyList(true);
    };

    // 삭제하기 버튼 클릭
    const clickDelete = () => {
        // console.log("선택된 id", selectedQID);
        if (selectedQID.length === 0) {
            alert("삭제할 목록이 없습니다.");
        } else {
            axios({
                method: "DELETE",
                url: "http://127.0.0.1:8000/qna/posts/unlike/",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
                data: selectedQID,
            });
            alert("삭제하시겠습니까?");
        }
        setModifyList(false); //삭제->수정 버튼 변경
    };

    const formatDate = dateString => {
        if (!dateString) return ""; // 빈 문자열 혹은 null/undefined 처리

        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            // 유효한 날짜 값인 경우
            return date.toISOString().split("T")[0];
        } else {
            // 유효하지 않은 날짜 값인 경우
            return "";
        }
    };

    return (
        <div>
            {existList ? (
                <div className="QnA_Main" style={{ marginBottom: "40px" }}>
                    {QnAList.map(qna => {
                        const QnAComponent = modifyList ? "div" : Link;
                        return (
                            <QnAComponent
                                key={qna.id}
                                to={`/QnAPage/${qna.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "#000000",
                                    cursor: "pointer",
                                }}
                                onClick={e =>
                                    modifyList && clickContainer(qna.id, e)
                                }
                            >
                                <div
                                    key={qna.id}
                                    className={`Main_QnA ${
                                        modifyList &&
                                        selectedQID.includes(qna.id)
                                            ? "selected"
                                            : ""
                                    }`}
                                >
                                    <div className="QnA_titleBox">
                                        {!qna.status ? (
                                            <div className="stateFalse">
                                                {" "}
                                                미해결{" "}
                                            </div>
                                        ) : (
                                            <div className="stateTrue">
                                                {" "}
                                                해결{" "}
                                            </div>
                                        )}
                                        <div className="title">
                                            {" "}
                                            {qna.title}{" "}
                                        </div>
                                    </div>
                                    <div className="summary">
                                        {" "}
                                        {qna.content}{" "}
                                    </div>
                                    <div className="QnA_content">
                                        <img
                                            src={
                                                "http://localhost:8000/" +
                                                    qna.author_profile_image ||
                                                defaultImg
                                            }
                                            alt="기본 이미지"
                                            className="profile"
                                        />
                                        <div className="nickname">
                                            {" "}
                                            {qna.author_nickname}{" "}
                                        </div>
                                        <div className="created_at">
                                            {" "}
                                            등록일 :{" "}
                                            {formatDate(qna.created_at)}{" "}
                                        </div>
                                    </div>
                                </div>
                            </QnAComponent>
                        );
                    })}
                    {modify ? (
                        <div style={{ textAlign: "center" }}>
                            {modifyList ? (
                                <button
                                    onClick={clickDelete}
                                    className="LikeModifyBtn"
                                >
                                    {" "}
                                    관심 해제 하기{" "}
                                </button>
                            ) : (
                                <button
                                    onClick={clickModify}
                                    className="LikeModifyBtn"
                                >
                                    {" "}
                                    수정하기{" "}
                                </button>
                            )}
                        </div>
                    ) : null}
                </div>
            ) : (
                <p
                    style={{
                        textAlign: "center",
                        margin: "100px 0px",
                        fontSize: "20px",
                    }}
                >
                    {" "}
                    등록된 Q&A가 없습니다.{" "}
                </p>
            )}
        </div>
    );
}

export default QnAContainer;
