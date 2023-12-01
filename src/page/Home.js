import React, { useState, useEffect } from "react";
import Banner from "../component/Banner";
import TypeBtn from "./Group/TypeBtn";
import GroupContainer from "../component/GroupContainer";
import QnAContainer from "../component/QnAContainer";

import "../css/Home.css";

function Home() {
    //소모임, Q&A 화면 렌더링 -> 소모임이면 true, Q&A이면 false
    const [isGroup, setIsGroup] = useState(true);

    //전송 데이터 폼
    const method = "GET"; //method
    const [url, setUrl] = useState("http://localhost:8000/gathering/posts/"); //url 설정
    // axios 요청 header
    const headers = {
        "Content-Type": "application/json",
    };

    //소모임 컨테이너
    const clickGroup = () => {
        setIsGroup(true);
        setUrl("http://localhost:8000/gathering/posts/");
    };

    // Q&A 컨테이너
    const clickQnA = () => {
        setIsGroup(false);
        setUrl("http://localhost:8000/qna/posts/");
    };

    //검색
    const updateSearchURL = newURL => {
        setUrl(newURL);
    };

    return (
        <div className="home_page">
            <Banner />
            <div className="nav">
                <button
                    className="group"
                    onClick={clickGroup}
                    style={{ cursor: "pointer" }}
                >
                    {" "}
                    소모임{" "}
                </button>
                <button
                    href="/"
                    className="qna"
                    onClick={clickQnA}
                    style={{ cursor: "pointer" }}
                >
                    Q&A{" "}
                </button>
            </div>
            <div className="groupList" style={{ marginTop: "30px" }}>
                {isGroup ? (
                    <div className="home-Container">
                        <Search
                            isGroup={isGroup}
                            updateSearchURL={updateSearchURL}
                        />
                        <div
                            style={{ marginLeft: "3%", marginBottom: "100px" }}
                        >
                            <GroupContainer
                                method={method}
                                url={url}
                                headers={headers}
                                modify={false}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="home-Container">
                        <Search
                            isGroup={isGroup}
                            updateSearchURL={updateSearchURL}
                        />
                        <div style={{ marginLeft: "10%" }}>
                            <QnAContainer
                                method={method}
                                url={url}
                                headers={headers}
                                modify={false}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

export function Search({ isGroup, updateSearchURL }) {
    const [all, setAll] = useState(true);
    const [title, setTitle] = useState("");
    const [ing, setIng] = useState(true);
    const [tag, setTag] = useState("");
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
    const [activeType, setActiveType] = useState("");

    // URL 업데이트 로직을 useEffect로 이동
    useEffect(() => {
        let statusUrl = ing ? "" : "false";
        console.log(isGroup);
        let newUrl = isGroup
            ? `http://localhost:8000/gathering/posts/search?title=${title}&tag=${tag}&status=${statusUrl}`
            : `http://localhost:8000/qna/posts/search?title=${title}`;
        console.log(newUrl);
        updateSearchURL(newUrl);
    }, [ing, title, tag, isGroup, updateSearchURL]); // 의존성 배열에 isGroup, updateSearchURL 추가

    useEffect(() => {
        setTitle("");
        setTag("");
        setAll(true);
        setTypeDropdownOpen(false);
        setActiveType("");
        setIng(true);
    }, [isGroup]);

    const handleAllChange = e => {
        e.preventDefault();
        setAll(!all);
        setTypeDropdownOpen(!typeDropdownOpen);
        setTag(""); // 태그 상태 초기화
        // setSearchUrl 로직 제거
    };

    const handleTagChange = e => {
        e.preventDefault();
        const newTag = e.target.value;
        setActiveType(newTag);
        setTag(newTag);
    };

    const handleTitleChange = e => {
        // e.preventDefault();
        const newTitle = e.target.value;
        console.log("title", newTitle);
        setTitle(newTitle);
    };

    const handleStatusChange = e => {
        e.preventDefault();
        setIng(!ing);
    };

    const handleSubmit = e => {
        e.preventDefault(); // 폼 제출 방지
        // 필요한 경우, 여기에 추가적인 로직을 구현
    };

    return (
        <div>
            {isGroup ? (
                <div className="search-container">
                    <form className="group_search" onSubmit={handleSubmit}>
                        <div className="search-form">
                            <div className="search-group">
                                <button
                                    type="button"
                                    onClick={handleAllChange}
                                    className="all"
                                >
                                    ALL
                                </button>
                                <div className="type-dropdown">
                                    {typeDropdownOpen ? (
                                        <TypeBtn
                                            handleChange={handleTagChange}
                                            activeType={activeType}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <button
                                onClick={handleStatusChange}
                                className={!ing ? "ingTrue" : "ingFalse"}
                                type="button"
                            >
                                모집중
                            </button>
                        </div>
                        <input
                            id="search-keyword"
                            type="text"
                            className="keyword"
                            placeholder="원하는 소모임을 검색해보세요"
                            onChange={handleTitleChange}
                            value={title}
                        />
                    </form>
                </div>
            ) : (
                <div className="QnAList">
                    <form className="qna_serach" onSubmit={handleSubmit}>
                        <input
                            id="keyword"
                            type="text"
                            className="keyword"
                            placeholder="궁금한 질문을 검색해보세요"
                            onChange={handleTitleChange}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}
