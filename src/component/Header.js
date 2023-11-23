import React, { useState } from "react";
import headerLogo from "../asset/headerLogo.png";
import dropdownImg from "../asset/dropdownImg.png";
import "../css/Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="header">
      <img src={headerLogo} alt="Header Logo" className="logo" />
      <nav>
        {isLoggedIn ? (
          // 로그인된 상태일 때
          <>
            <a href="/" className="link">
              새글쓰기
            </a>
            <img
              src={dropdownImg}
              alt="Dropdown"
              className="dropdownImg"
              onClick={() => {
                // 드롭다운 추가
              }}
            />
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
