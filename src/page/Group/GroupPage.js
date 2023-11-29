import React, { useState, useEffect } from "react";
import "../../css/GroupPage.css";
import goBack from "../../asset/goBack.png";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Comment from "../../component/Comment";
import CommentInput from "../../component/CommentInput";

function GroupPage() {
    const token = localStorage.getItem("access-token");
    const navigate = useNavigate();
    const { id } = useParams();
    const commentUrl = `http://127.0.0.1:8000/gathering/posts/${id}/comments/`;

    //소모임 상세 정보
    const [groupInfo, setGroupInfo] = useState({});

    //모집중, 모집완료 표시
    const [recruiting, setRecruiting] = useState(true);

    //관심설정 표시
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/gathering/posts/${id}/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log(res.data);
                // 분야 추가 필요
                const {
                    id,
                    author_nickname,
                    author_profile_image,
                    deadline,
                    title,
                    content,
                    status,
                    tag,
                    created_at,
                    division,
                    max_people,
                    method,
                    contact,
                    summary,
                    like_status,
                } = res.data;
                setGroupInfo({
                    id: id, //id
                    profile: author_profile_image, //작성자 프사
                    nickname: author_nickname, //작성자 닉네임
                    deadline: deadline, //마감기한
                    title: title, //제목
                    content: content, //내용
                    created_at: created_at, //작성일자
                    status: status, //상태(모집중/모집완료)
                    summary: summary, //요약
                    tag: tag, //태그
                    division: division, //모집구분
                    max_people: max_people, //모집 인원
                    method: method, //진행방식
                    contact: contact, // 연락 방법
                    like_status: like_status, //관심등록
                });
                setRecruiting(res.data.status); // 서버로부터 받은 status 값으로 recruiting 상태 업데이트
                setLiked(res.data.like_status);
                console.log("관심등록 상태: ", res.data.like_status);
            })
            .catch(err => {
                console.log("error : ", err);
            });
        console.log("관심 등록:", groupInfo.like_status);
        console.log(recruiting ? "모집중" : "모집완료");
    }, [id, recruiting, token, liked]);

    const toggleRecruitmentStatus = () => {
        const newStatus = !recruiting;
        setRecruiting(newStatus);

        axios({
            method: "PUT",
            url: `http://127.0.0.1:8000/gathering/posts/${id}/`,
            data: {
                status: newStatus,
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log("Status updated successfully:", res);
            })
            .catch(err => {
                console.error("Error updating status:", err);
            });
    };

    // 모집중 버튼
    const buttonStyle = recruiting
        ? "groupState"
        : "groupState recruitingComplete";
    const buttonText = recruiting ? "모집중" : "모집완료";

    // 뒤로가기 버튼
    const onBackClick = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/AddGroup/${id}`, { state: { groupInfo: groupInfo } });
    };

    // 관심 설정
    const handleLikedChange = () => {
        setLiked(true);
        axios({
            method: "POST",
            url: `http://127.0.0.1:8000/gathering/posts/${id}/like/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        alert("관심 등록되었습니다.");
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            axios({
                method: "DELETE",
                url: `http://127.0.0.1:8000/gathering/posts/${id}/`,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => {
                    console.log("Post deleted successfully");
                    window.confirm("성공적으로 삭제되었습니다.");
                    navigate("/Home");
                })
                .catch(err => {
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
                        <button
                            className={buttonStyle}
                            onClick={toggleRecruitmentStatus}
                        >
                            {buttonText}
                        </button>
                        <button
                            className={
                                !groupInfo.like_status
                                    ? "LikedSetBtnYes"
                                    : "LikedSetBtn"
                            }
                            onClick={handleLikedChange}
                        >
                            {" "}
                            ♥
                        </button>
                    </div>
                </div>

                <p> {groupInfo.summary} </p>

                <div className="userInfo">
                    <img
                        src={"http://localhost:8000" + groupInfo.profile}
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
                    <button
                        className="groupDeleteButton"
                        onClick={handleDelete}
                    >
                        삭제하기
                    </button>
                </div>

                <h3 className="commentTitle">댓글</h3>
                <CommentInput postUrl={commentUrl} />
                <Comment
                    url={`http://127.0.0.1:8000/gathering/posts/${id}/comments/`}
                    type="group"
                />
            </div>
        </div>
    );
}
export default GroupPage;
