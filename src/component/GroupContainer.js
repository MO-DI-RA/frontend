//소모임 컨테이너
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../css/GroupContainer.css";
import { useNavigate } from "react-router";

function GroupContainer({url}) {
    const navigate = useNavigate();
    const [group, setGroup] = useState([]);

    useEffect(() => {
        axios({
            method : "GET",
            url : {url},
            headers : {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            setGroup(res.data);
        })
        .then((err) => {
            console.log('error : ',err);
        })
    },[]);

    // 컨테이너 클릭 시 해당 컨테이너의 상세페이지로 이동
    const clickGroup= (id) => {
        navigate(`/GroupPage/${id}`);
    }

    return(
        <div className="Main_Group">
            {/* get은 group.map((item)) */}
            {group.map((item) => (
                <div key={item.id} className="groupContainer" onClick={clickGroup(item.id)}>
                    <div className="title_INFO">
                        <div className="titleINFO">
                            <div className="title"> {item.title} </div>
                            <div className="deadline"> 마감일 : {item.deadline} </div>
                        </div>
                        <div className="type"> {item.tag} </div>
                    </div>
                    <div className="summary"> {item.summary} </div>
                    <div className="profileINFO">
                        <img src={item.profile}  className="profile_IMG"/>
                        <div> {item.nickname} </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default GroupContainer;
