//소모임 컨테이너
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../css/GroupContainer.css";
import defaultImg from "../asset/defaultImg.png";
import { Link } from "react-router-dom";

function GroupContainer({ method, url, headers, modify }) {
    const token = localStorage.getItem("access-token");

    const [existList, setExistList] = useState(true); //관심 설정한 소모임이 있을때
    const [groupList, setGroupList] = useState([]);

    //modify 수정 가능? 불가능
    const [modifyList, setModifyList] = useState(false);
    const [selectedGID, setSelectedGID] = useState([]); //소모임 아이디 배열

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

    useEffect(() => {
        console.log("group컨테이너 url :", url);
        axios({
            method: method,
            url: url,
            headers: headers,
        })
            .then(res => {
                console.log("get : ", res.data);
                // 데이터가 없으면 setExistList == false
                if (res.data.length === 0) {
                    console.log("없음");
                    setExistList(false);
                } else {
                    console.log("있음");
                    setExistList(true);
                    console.log("list : ", existList);
                    setGroupList(res.data);
                    console.log("groupList:", groupList);
                }
            })
            .then(err => {
                console.log("error : ", err);
            });
    }, [method, url, headers, modifyList]);

    // 컨테이너 박스 클릭 시 id를 저장
    const clickContainer = id => {
        if (modifyList) {
            const isSelectedID = selectedGID.includes(id);
            // 이미 선택됐으면 배열에서 제거하기
            if (isSelectedID) {
                setSelectedGID(prevSelectedGID =>
                    prevSelectedGID.filter(gid => gid !== id)
                );
            } else {
                // 선택되지 않았으면 배열에 추가하기
                setSelectedGID(prevSelectedGID => [...prevSelectedGID, id]);
            }
        }
    };

    // 수정하기 버튼 클릭
    const clickModify = () => {
        setModifyList(true);
    };

    // 삭제하기 버튼 클릭
    const clickDelete = () => {
        console.log("선택된 id", selectedGID);
        if (selectedGID.length === 0) {
            alert("삭제할 목록이 없습니다.");
        } else {
            axios({
                method: "DELETE",
                url: "http://127.0.0.1:8000/gathering/posts/unlike/",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${token}`,
                },
                data: selectedGID,
            });
            alert("삭제하시겠습니까?");
        }
        setModifyList(false);
    };

    return (
        <div>
            {existList ? (
                <div className="Main_Group">
                    <div className="Liked_Group">
                        {groupList.map(group => {
                            const GroupComponent = modifyList ? "div" : Link;

                            return (
                                <GroupComponent
                                    key={group.id}
                                    to={`/GroupPage/${group.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "#000000",
                                    }}
                                    className="Group_Link"
                                    onClick={e =>
                                        modifyList &&
                                        clickContainer(group.id, e)
                                    }
                                >
                                    <div
                                        className={`groupContainer ${
                                            modifyList &&
                                            selectedGID.includes(group.id)
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        <div className="title_INFO">
                                            <div className="titleINFO">
                                                <div className="title">
                                                    {" "}
                                                    {group.title}{" "}
                                                </div>
                                                <div className="deadline">
                                                    {" "}
                                                    마감일 |{" "}
                                                    {formatDate(
                                                        group.deadline
                                                    )}{" "}
                                                </div>
                                            </div>
                                            <div className="type">
                                                {" "}
                                                {group.tag}{" "}
                                            </div>
                                        </div>
                                        <div className="summary">
                                            {" "}
                                            {group.summary}{" "}
                                        </div>
                                        <div className="profileINFO">
                                            <img
                                                src={
                                                    "http://localhost:8000/" +
                                                        group.author_profile_image ||
                                                    defaultImg
                                                }
                                                alt="profile"
                                                className="profile_IMG"
                                            />
                                            <div> {group.author_nickname} </div>
                                        </div>
                                    </div>
                                </GroupComponent>
                            );
                        })}
                    </div>
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
                    등록된 소모임이 없습니다.
                </p>
            )}
        </div>
    );
}

export default GroupContainer;
