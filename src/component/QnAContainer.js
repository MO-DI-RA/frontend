import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";


function QnAContainer({url}) {
    const navigate = useNavigate();
    const [QnAList , setQnAList] = useState([]);

    useEffect(() => {
        axios({
            method : "GET",
            url : url,
            headers : {
                "Content-Type" : "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            setQnAList([]);
        })
        .then((err) => {
            console.log("error : ", err);
        })
    },[]);

     // 컨테이너 클릭 시 해당 컨테이너의 상세페이지로 이동
     const clickQnA= () => {
        navigate(`/QnAPage/${QnAList.id}`);
    }

    return(
        <div className="QnA_Main" style={{marginBottom : "40px"}}>
            {QnAList.map((qna) => {
                <div className="Main_QnA">
                    <div className="QnA_titleBox">
                        {qna.status ? (
                            <div className="stateFlase"> 미해결 </div>
                        ) : (
                            <div className="stateTrue"> 해결 </div>
                        )}
                        <div className="title"> {qna.title} </div>
                    </div>
                    <div className="summary"> {qna.summary} </div>
                    <div className="QnA_content">
                        <img src={qna.author_profile_image} alt="기본 이미지" className="profile"/>
                        <div className="nickname"> {qna.author_nickname} </div>
                        <div className="created_at"> 등록일 : {qna.created_at} </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default  QnAContainer;