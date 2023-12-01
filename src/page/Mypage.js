import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/Mypage.css";
import editImg from "../asset/editImg.png";
import QnAContainer from "../component/QnAContainer";
import GroupContainer from "../component/GroupContainer";

function Mypage() {
    const token = localStorage.getItem("access-token");
    // console.log(token);

    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState(); //프로필 사진
    const [nickname, setNickname] = useState(""); //닉네임

    // 소모임, Q&A 컨테이너 전달 Props
    const method = "GET"; //method
    const [groupUrl, setgroupUrl] = useState(
        "http://localhost:8000/gathering/posts/interest/"
    ); // group url
    const [qnaUrl, setQnaUrl] = useState(
        "http://localhost:8000/qna/posts/interest/"
    ); //qna url
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }; //Header 설정

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/user/mypage/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            // console.log(res.data);
            setProfile(res.data.profile_image);
            setNickname(res.data.nickname);
        });
    }, [token]);

    // 프로필 사진 formData 객체
    const formData = new FormData();

    //프로필 사진 변경
    const changeProfile = e => {
        e.preventDefault();
        const selectedImg = e.target.files[0];
        const reader = new FileReader();

        // console.log("이미지 : ", selectedImg);

        formData.append("files", selectedImg);

        //이미지 미리보기
        reader.onload = event => {
            setProfile(event.target.result);
        };

        if (selectedImg) {
            reader.readAsDataURL(selectedImg);
        }
    };

    const handleImageClick = () => {
        // 숨겨진 파일 입력을 클릭합니다.
        fileInputRef.current.click();
    };

    // 닉네임 변경
    const handleNickNameChange = e => {
        e.preventDefault();
        setNickname(e.target.value);
    };

    //프로필 사진, 닉네임 변경 submit
    const onSubmit = e => {
        e.preventDefault();
        console.log("프로필 : ", profile);
        console.log("닉네임 : ", nickname);
        axios({
            method: "PATCH",
            url: `http://localhost:8000/user/mypage/`,
            headers: {
                // Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            data: {
                nickname: nickname,
                profile_image: profile,
            },
        }).then(res => {
            window.location.reload();
        });
    };

    const profileImageUrl =
        profile && profile.startsWith("/")
            ? `http://localhost:8000${profile}`
            : profile;
    // console.log("0----------------", profile);
    return (
        <div>
            <div className="Mypage">
                <form className="profileForm" onSubmit={onSubmit}>
                    <div className="info">
                        <img
                            src={
                                profileImageUrl ||
                                "http://localhost:8000" + profile
                            }
                            className="defaultImgMyPage"
                            alt="defaultImg"
                        ></img>
                        <img
                            src={editImg}
                            className="editImg"
                            alt="editImg"
                            onClick={handleImageClick} // 이미지 클릭 시 파일 입력 활성화
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="profileEditBtn"
                            onChange={changeProfile}
                            ref={fileInputRef}
                            style={{ display: "none" }} // 숨김 처리
                        />
                        <h2 className="userWelcome">{nickname}님 환영해요.</h2>
                    </div>
                    <label htmlFor="nickname">*닉네임</label>
                    <input
                        id="mypage_nickname"
                        name="nickname"
                        required
                        placeholder={nickname}
                        onChange={handleNickNameChange}
                    />
                    <button id="profileSaveButton">프로필 저장</button>
                </form>

                <h2 className="GIList">소모임 관심 목록</h2>
                <div className="container">
                    <GroupContainer
                        method={method}
                        url={groupUrl}
                        headers={headers}
                        modify={true}
                    />
                </div>

                <h2 className="QnAIList">Q&A 관심 목록</h2>
                <div className="container">
                    <QnAContainer
                        method={method}
                        url={qnaUrl}
                        headers={headers}
                        modify={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Mypage;
