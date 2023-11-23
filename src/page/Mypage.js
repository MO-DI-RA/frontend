import React, { useEffect, useState } from "react";
import { getCookie } from "../config/cookie";
import axios from "axios";
import "../css/Mypage.css";
import defaultImg from "../asset/defaultImg.png";
import editImg from "../asset/editImg.png";
import Header from "../component/Header";
import Footer from "../component/Footer";

function Mypage() {
    const [nickname, setNickname] = useState("");

    const token = localStorage.getItem("refresh-token");
    console.log(token);

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/user/mypage/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            console.log(res.data);
            setNickname(res.data.nickname);
        });
    }, [token]);

    return (
        <div>
            <Header />
            <div className="Mypage">
                <div className="info">
                    <img
                        src={defaultImg}
                        className="defaultImg"
                        alt="defaultImg"
                    ></img>
                    <img src={editImg} className="editImg" alt="editImg"></img>
                    <h2 className="userWelcome">{nickname}님 환영해요.</h2>
                </div>
                <form className="profileForm">
                    <label for="nickname">*닉네임</label>
                    <input id="nickname" name="nickname" required></input>
                    <button id="profileSaveButton">프로필 저장</button>
                </form>

                <h2 className="GIList">소모임 관심 목록</h2>
                <div className="container">
                    <p> 관심 설정한 소모임이 없습니다. </p>
                </div>

                <h2 className="QnAIList">Q&A 관심 목록</h2>
                <div className="container">
                    <p> 관심 설정한 Q&A가 없습니다. </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Mypage;
