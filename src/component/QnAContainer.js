import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import defaultImg from "../asset/defaultImg.png";

function QnAContainer({ method,  url , headers, modify}) {
    const [QnAList, setQnAList] = useState([]);
    const [existList, setExistList] = useState(true); //관심 설정한 Q&A가 있을때

    //modify 수정 가능? 불가능
    const [modifyList, setModifyList] = useState(false);

    useEffect(() => {
        axios({
            method: method,
            url: url,
            headers: headers,
        })
            .then(res => {
                console.log(res.data);
                // 데이터가 없으면 setExistList == false
                if(res.data == null){
                    setExistList(false);
                }
                else{
                    setQnAList(res.data);
                }
            })
            .then(err => {
                console.log("error : ", err);
            });
    }, [method, url, headers, modifyList]);

    // 수정하기 버튼 클릭
    const clickModify = () => {
        setModifyList(true);
    }

    // 삭제하기 버튼 클릭
    const clickDelete = () => {
        setModifyList(false);
    }


    return (
        <div>
            {existList ? (
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
                    {modify ? (
                        <div>
                            {modifyList ? (
                                <button onClick={clickDelete}> 삭제하기 </button>
                            ) : (
                                <button onClick={clickModify}> 수정하기 </button>
                            )}
                        </div>
                         ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <p> 관심 설정한 Q&A가 없습니다. </p> 
            )}
        </div>
    );
}

export default QnAContainer;
