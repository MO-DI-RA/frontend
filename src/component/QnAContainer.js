import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";


function QnAContainer({url}) {
    const navigate = useNavigate();
    const [QnAList , setQnAList] = useState([]);
    const [QnAID, setQnAID] = useState(); //상세페이지 id 설정
    const [profileURL , setprofileURL] = useState(); //이미지 url 설정

    useEffect(() => {
        axios({
            method : "GET",
            url : url,
            headers : {
                "Content-Type" : "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            setQnAList(res.data);
            setQnAID(res.data.id);
            setprofileURL("localhost:8000"+res.data.author_profile_image);        })
        .then((err) => {
            console.log("error : ", err);
        })
    },[url]);

     // 컨테이너 클릭 시 해당 컨테이너의 상세페이지로 이동
     const clickQnA= () => {
        navigate(`/QnAPage/${QnAID}`);
    }

    return(
        <div className="QnA_Main" style={{ marginBottom: "40px" }}>
            {QnAList.map((qna) => (
                <div key={qna.id} className="Main_QnA" onClick={clickQnA}>
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
                        <img src={profileURL} alt="기본 이미지" className="profile" />
                        <div className="nickname"> {qna.author_nickname} </div>
                        <div className="created_at"> 등록일 : {qna.created_at} </div>
                    </div>
                </div>
            ))}
    </div>
    )
}

export default  QnAContainer;