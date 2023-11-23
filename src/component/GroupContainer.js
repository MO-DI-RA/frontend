//소모임 컨테이너
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function GroupContainer({url}) {
    const [group, setGroup] = useState({'profile': '',});

    let groupInfo = [
        {title : "소모임 명",
         type : "분야",
         deadline : "2023.09.15", 
         summary : "소모일 한 줄 소개글",
         nickname : "작성자 이름", 
        },
        {title : "라스트댄스",
         type : "학술",
         deadline : "2023.12.31", 
         summary : "학술 동아리",
         nickname : "김두현", 
        },
    ];

    useEffect(() => {
        axios({
            method : "GET",
            url : {url},
            headers : {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            
        })
    })

    return(
        <div>
            
        </div>
    )

}

export default GroupContainer;
