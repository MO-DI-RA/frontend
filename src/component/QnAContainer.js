import React, { useEffect } from "react";
import "../css/QnAContainer.css";
import defaultImg from "../asset/defaultImg.png";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";


function QnAContainer({url}) {
    const navigate = useNavigate();
    const [qNa , setQnA] = useState({
        id : '',
        profile : defaultImg,
        nickname : '',
        title : '',
        content : '',
        created_at : '',
        status : true,
    })

    useEffect(() => {
        axios({
            method : "GET",
            url : {url},
            headers : {
                "Content-Type" : "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            const {id, author_frofile_image, author_nickname, title, content, created_at, status} = res.data;
            setQnA({
                id : id,
                profile : author_frofile_image,
                nickname : author_nickname,
                title : title,
                content : content,
                created_at : created_at,
                status : status,
            })
        })
        .then((err) => {
            console.log("error : ", err);
        })

        // 컨테이너 클릭 시 해당 컨테이너의 상세페이지로 이동
        const clickQnA= () => {
            navigate(`/QnAPage/${qNa.id}`);
        }

        return(
            <div className="Main_QnA">

            </div>
        )
    })
}

export default  QnAContainer;