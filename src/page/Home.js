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
  const updateSearchURL = (newURL) => {
    setUrl(newURL);
  };

  return (
    <div className="home_page">
      <Banner />
      <div className="nav">
        <button className="group" onClick={clickGroup}>
          {" "}
          소모임{" "}
        </button>
        <button href="/" className="qna" onClick={clickQnA}>
          {" "}
          Q&A{" "}
        </button>
      </div>
      <div className="groupList" style={{ marginTop: "30px" }}>
        {isGroup ? (
          <div className="home-Container">
            <Search isGroup={isGroup} updateSearchURL={updateSearchURL} />
            <div style={{ marginLeft: "10%", marginBottom: "100px" }}>
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
            <Search isGroup={isGroup} updateSearchURL={updateSearchURL} />
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
  const [all, setAll] = useState(true); // ALL 선택
  const [title, setTitle] = useState(""); // 키워드 검색
  const [ing, setIng] = useState(true); // 모집중 검색
  const [tag, setTag] = useState(""); //태그 검색
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false); // 타입 검색 드롭다운
  const [activeType, setActiveType] = useState(""); //타입 버튼 선택 css

  const [searchUrl, setSearchUrl] = useState(
    `http://localhost:8000/gathering/posts/search?title=${title}&tag=${tag}&status=${ing}`
  );

  useEffect(() => {
    console.log("Updated state values:", { all, title, ing, tag });
    console.log("Updated searchUrl: ", searchUrl);
  }, [all, title, ing, tag, searchUrl]);

  // 폼 제출
  const handleURLChange = (e) => {
    e.preventDefault();
    console.log("실행");
    console.log("검색:", searchUrl);
    updateSearchURL(searchUrl);
    setTitle("");
  };

  //ALL 버튼 선택
  const handleAllChange = (e) => {
    e.preventDefault();
    setAll(!all);
    setTypeDropdownOpen(!typeDropdownOpen); //드롭다운
    setSearchUrl(
      `http://localhost:8000/gathering/posts/search?title=&tag=&status=`
    );
    console.log("ALL 버튼 URL: ", searchUrl);
    if (!all) {
      console.log("ALL(true) URL: ", searchUrl);
      handleURLChange(e);
    }
  };

  //Type 버튼 선택
  const handleTagChange = (e) => {
    e.preventDefault();
    const newTag = e.target.value;
    console.log("target value : ", newTag);
    setActiveType(newTag);
    setSearchUrl(
      `http://localhost:8000/gathering/posts/search?title=&tag=${newTag}&status=`
    );
    console.log("타겟 벨류:", tag);
    console.log("태그 검색 URL : ", searchUrl);
    handleURLChange(e);
  };

  // 키워드 검색
  const handleTitleChange = (e) => {
    e.preventDefault();
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isGroup) {
      setSearchUrl(
        `http://localhost:8000/gathering/posts/search?title=${newTitle}&tag=&status=`
      );
    } else {
      setSearchUrl(
        `http://localhost:8000/qna/posts/search?title=${newTitle}&tag=&status=`
      );
    }
  };

  // 모집중 검색
  const handleStatusChange = (e) => {
    e.preventDefault();
    let newStatus = !ing; // Toggle the value
    setIng(newStatus);
    console.log("상태", newStatus);
    if (ing) {
      setSearchUrl(
        `http://localhost:8000/gathering/posts/search?title=&tag=&status=`
      );
    } else {
      setSearchUrl(
        `http://localhost:8000/gathering/posts/search?title=&tag=&status=${newStatus}`
      );
    }
    handleURLChange(e);
  };

  const style = {};

  return (
    <div>
      {isGroup ? (
        <div className="search-container">
          <form className="group_search" onSubmit={handleURLChange}>
            <div className="search-form">
              <div className="search-group">
                <button type="button" onClick={handleAllChange} className="all">
                  {" "}
                  ALL{" "}
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
                className={!ing ? "ingTrue" : "ingFalse"}>
                {" "}
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
          <form className="qna_serach" onSubmit={handleURLChange}>
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
