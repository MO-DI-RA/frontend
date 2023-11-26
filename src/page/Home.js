import React, { useState } from "react";
import Banner from "../component/Banner";
import TypeBtn from "./Group/TypeBtn";
import GroupContainer from "../component/GroupContainer";
import QnAContainer from "../component/QnAContainer";

import "../css/Home.css";

function Home() {
  //소모임, Q&A 화면 렌더링 -> 소모임이면 true, Q&A이면 false
  const [isGroup, setIsGroup] = useState(true);
  // 타입 검색 드롭다운
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [type, setType] = useState(''); //분야 선택
  const [recruiting, setRecruiting] = useState(false); //모집중
  const [keyword, setKeyword] = useState(''); //키워드 검색

  const [url, setUrl] = useState("http://localhost:8000/gathering/posts/"); //url 설정

  //드롭 다운
  const typeListDropdown = () => {
    setTypeDropdownOpen(!typeDropdownOpen);
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

  //분야 검색
  const typeSearch = (e) => {
    setType(e.target.value);
    console.log(type);
  }

  const typeSubmit = () => {
    
  }

  //모집중
  const recruitSearch = () => {
    setRecruiting(!recruiting);
    console.log(recruiting);
  }

  const recruitSubmit = () => {

  }

  //키워드 검색
  const keywordSearch = (e) => {
    setKeyword(e.target.value);
    console.log(keyword);
  }


  const keywordSubmit = () => {

  }


  return (
    <div className="home_page">
      <Banner />
      <div className="nav">
        <button className="group" onClick={clickGroup}> 소모임 </button>
        <button href="/" className="qna" onClick={clickQnA}> Q&A </button>
      </div>
      <div className="groupList" style={{marginTop : "30px"}}>
        { isGroup ? 
          (
            <div className="serach_bar">
              <div className="search">
                <div style={{display : "flex", gap : "30px", alignItems : "center"}}>
                  {/* 분야별 검색 */}
                  <form className="type_search" onSubmit={typeSubmit}> 
                    <label htmlFor="type" onClick={typeListDropdown}> ALL </label>
                    <div className="type-dropdown">
                      {typeDropdownOpen && (
                        <TypeBtn id="type" handleChange={typeSearch}/>
                      )}
                    </div>
                  </form>
                  {/* 모집중 검색 */}
                  <form className="recruit_search" onSubmit={recruitSubmit}>
                    <button type="button" onClick={recruitSearch}> 모집중 </button>
                  </form>
                </div>
                {/* 키워드 검색 */}
                <form className="keyword_search" onSubmit={keywordSubmit}>
                  <input 
                    id="keyword"
                    type="text"
                    className="keyword"
                    placeholder="원하는 소모임을 검색해보세요"
                    onClick={keywordSearch}
                  />
                </form>
              </div>
              <GroupContainer url={url}/>
            </div>
          ) : 
          (
            <div className="QnAList">
              <form className="qna_serach" onSubmit={keywordSubmit}>
                <input 
                    id="keyword"
                    type="text"
                    className="keyword"
                    placeholder="궁금한 질문을 검색해보세요"
                    onClick={keywordSearch}
                  />
              </form>
              <QnAContainer url={url}/> 
            </div>
          )}
      </div>
    </div>
  );
}

export default Home;
