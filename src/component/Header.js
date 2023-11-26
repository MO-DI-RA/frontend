import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import headerLogo from "../asset/headerLogo.png";
import dropdownImg from "../asset/dropdownImg.png";
import { useAuth } from "../redux/AuthContext";
import {actionCreators} from "../redux/user";
import "../css/Header.css";
import { useDispatch } from "react-redux";

function Header() {

  const dispatch = useDispatch();
  
  const { isLoggedIn } = useAuth();

    const [isNewPostDropdownOpen, setIsNewPostDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    //새글쓰기 드롭다운
    const toggleNewPostDropdown = () => {
        setIsNewPostDropdownOpen(!isNewPostDropdownOpen);
        setIsUserDropdownOpen(false);
    };

    //유저 드롭다운
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsNewPostDropdownOpen(false);
    };

    const closeDropdowns = () => {
        setIsNewPostDropdownOpen(false);
        setIsUserDropdownOpen(false);
    };

  //로그아웃
  const LogOut = () => {
    dispatch(actionCreators.logoutDB());
  }

  return (
    <header className="header">
      <NavLink to={"/"}>
        <img src={headerLogo} alt="Header Logo" className="logo" />
      </NavLink>
      <nav>
        {isLoggedIn ? (
          // 로그인된 상태일 때
          <>
            <button className="newPostButton" onClick={toggleNewPostDropdown}>
              새 글 쓰기
            </button>
            {isNewPostDropdownOpen && (
              <div className="dropdownMenu">
                <a
                  href="/AddGroup"
                  className="dropdownLink"
                  onClick={closeDropdowns}
                >
                  소모임 등록
                </a>
                <a
                  href="/AddQnA"
                  className="dropdownLink"
                  onClick={closeDropdowns}
                >
                  Q&A 등록
                </a>
              </div>
            )}
            <img
              src={dropdownImg}
              alt="Dropdown"
              className="dropdownImg"
              onClick={toggleUserDropdown}
            />
            {isUserDropdownOpen && (
              <div className="dropdownMenu">
                <a
                  href="/Mypage"
                  className="dropdownLink"
                  onClick={closeDropdowns}
                >
                  마이페이지
                </a>
                <a
                  href="/MyPost"
                  className="dropdownLink"
                  onClick={closeDropdowns}
                >
                  내가 작성한 글
                </a>
                <button className="logoutButton" onClick={LogOut}>로그아웃</button>
              </div>
            )}
          </>
        ) : (
          // 로그인되지 않은 상태일 때
          <>
            <a href="/login" className="link">
              로그인
            </a>
            <a href="/Signup" className="link">
              회원가입
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
