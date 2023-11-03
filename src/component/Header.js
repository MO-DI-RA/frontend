import React from "react";
import headerLogo from "../asset/headerLogo.png";
import "../css/Header.css";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Header Logo" className="logo" />
      <nav>
        <a href="/login" className="link">
          로그인
        </a>
        <a href="/Signup" className="link">
          회원가입
        </a>
      </nav>
    </header>
  );
}

export default Header;
