//소모임 컨테이너
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../css/GroupContainer.css";
import { useNavigate } from "react-router";

function GroupContainer({url}) {
    const navigate = useNavigate();
    console.log("url" , url);

    const [groupList, setGroupList] = useState([]);
    const [groupID, setGroupID] = useState(); //상세페이지 id

    useEffect(() => {
        axios({
            method : "GET",
            url : url,
            headers : {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res.data);
            setGroupList(res.data)
            setGroupID(res.data.id);
        })
        .then((err) => {
            console.log('error : ',err);
        })
    },[url]);

    // 컨테이너 클릭 시 해당 컨테이너의 상세페이지로 이동
    const clickGroup= () => {
        navigate(`/gathering/posts/${groupID}`);
    }

    return(
        <div className="Main_Group">
            {/* get은 group.map((item)) */}
            {groupList.map((group) => (
                <div key={group.id} className="groupContainer" onClick={clickGroup}>
                    <div className="title_INFO">
                        <div className="titleINFO">
                            <div className="title"> {group.title} </div>
                            <div className="deadline"> {group.deadline} </div>
                        </div>
                    <div className="type"> {group.tag} </div>
                </div>
                <div className="summary"> {group.summary} </div>
                <div className="profileINFO">
                    <img src={group.author_profile_image} alt="profile" className="profile_IMG" />
                    <div> {group.author_nickname} </div>
                </div>
                </div>
            ))}
        </div>
    )

}

export default GroupContainer;
