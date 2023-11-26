import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import defaultImg from "../asset/defaultImg.png";

function QnAContainer({ url }) {
    const [QnAList, setQnAList] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => {
                console.log(res.data);
                setQnAList(res.data);
            })
            .then(err => {
                console.log("error : ", err);
            });
    }, [url]);

    return (
        <div className="QnA_Main" style={{ marginBottom: "40px" }}>
            {QnAList.map(qna => (
                <Link
                    to={`/QnAPage/${qna.id}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                >
                    <div key={qna.id} className="Main_QnA">
                        <div className="QnA_titleBox">
                            {qna.status ? (
                                <div className="stateFalse"> 미해결 </div>
                            ) : (
                                <div className="stateTrue"> 해결 </div>
                            )}
                            <div className="title"> {qna.title} </div>
                        </div>
                        <div className="summary"> {qna.summary} </div>
                        <div className="QnA_content">
                            <img
                                src={
                                    "http://localhost:8000" +
                                        qna.author_profile_image || defaultImg
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
                                등록일 : {qna.created_at}{" "}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default QnAContainer;
