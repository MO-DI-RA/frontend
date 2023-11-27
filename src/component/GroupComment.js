import React, { useState, useEffect } from "react";
import axios from "axios";

function GroupComment({ id }) {
    const [commentData, setCommentData] = useState({
        profileImg: "",
        commentContent: "",
        nickname: "",
    });

    // const [commentData, setCommentData] = useState([]); //댓글 정보

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // .commentLayout의 width 스타일
        gap: "10px", // .commentLayout의 gap 스타일
    };

    const commentInputStyle = {
        height: "50px",
        borderColor: "#D9D9D9",
        borderRadius: "10px",
        resize: "none",
        fontSize: "20px",
        flexGrow: 1, // flex-grow 속성
    };

    const commentContentStyle = {
        marginLeft: "40px",
        marginBottom: "50px",
    };

    useEffect(() => {
        console.log("아이디: ", id);
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/gathering/posts/${id}/comments/`,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                // 서버로부터 받은 데이터로 상태를 업데이트
                console.log("데이터 : ", response.data);
                setCommentData({
                    profileImg: response.data[0].author_profile_image,
                    commentContent: response.data[0].content,
                    nickname: response.data[0].writer,
                });
                console.log("댓글 내용: ", commentData);
            })
            .catch(error => console.error(error));
    }, [id]);
    // const { profileImg, commentContent, nickname } = commentData;

    return (
        <div className="groupComment" style={containerStyle}>
            <div className="userInfo">
                <img
                    src={"http://localhost:8000" + commentData.profileImg}
                    className="profileImg"
                    alt="profileImg"
                    style={commentInputStyle}
                ></img>
                <p>{commentData.nickname}</p>
            </div>
            <p className="commentContent" style={commentContentStyle}>
                {commentData.commentContent}
            </p>
        </div>
    );
}

export default GroupComment;
