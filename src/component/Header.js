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
            <a href="/newpost" className="link">
              새글쓰기
            </a>
            <img
              src={dropdownImg} // 이미지의 경로를 넣으세요
              alt="Dropdown"
              className="dropdownImg"
              onClick={() => {
                // 이미지를 클릭하면 드롭다운 메뉴가 열리도록 로직을 추가하세요
                // 예: 드롭다운 상태를 관리하는 state를 추가하고 클릭 시 상태를 변경하여 드롭다운을 열거나 닫습니다.
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
