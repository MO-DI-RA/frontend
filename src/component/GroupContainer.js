//소모임 컨테이너
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../css/GroupContainer.css";
import defaultImg from "../asset/defaultImg.png";
import { Link } from "react-router-dom";

function GroupContainer({ url }) {
    console.log("url", url);

    const [groupList, setGroupList] = useState([]);

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
                setGroupList(res.data);
            })
            .then(err => {
                console.log("error : ", err);
            });
    }, [url]);

    return (
        <div className="Main_Group">
            {/* get은 group.map((item)) */}
            {groupList.map(group => (
                <Link
                    to={`/GroupPage/${group.id}`}
                    style={{ textDecoration: "none", color: "#000000" }}
                    className="Group_Link"
                >
                    <div key={group.id} className="groupContainer">
                        <div className="title_INFO">
                            <div className="titleINFO">
                                <div className="title"> {group.title} </div>
                                <div className="deadline">
                                    {" "}
                                    {group.deadline}{" "}
                                </div>
                            </div>
                            <div className="type"> {group.tag} </div>
                        </div>
                        <div className="summary"> {group.summary} </div>
                        <div className="profileINFO">
                            <img
                                src={
                                    "http://localhost:8000" +
                                        group.author_profile_image || defaultImg
                                }
                                alt="profile"
                                className="profile_IMG"
                            />
                            <div> {group.author_nickname} </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default GroupContainer;
