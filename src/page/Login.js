import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { setCookie } from "../config/cookie";
import "../css/Login.css";
import kakaoLogo from "../asset/kakaoLogo.png";

function Login() {
  //페이지이동 navigator
  const navigate = useNavigate();

  //react-hook-form 사용
  const { register, handleSubmit } = useForm();

  //Submit
  const onSubmit = async (data) => {
    console.log(data); //콘솔 확인

    const { email, password } = data;

    let body = {
      email: email,
      password: password,
    };

    console.log("body", body);

    // API 주소 입력
    axios
      .post("http://localhost:8000/user/login/", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.token) {
          setCookie("accessToken", res.data.token.access);
          navigate("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //

  return (
    <div className="Login">
      <h2 className="welcome">
        <span className="modira">MODIRA</span>에 오신 것을 환영합니다!
      </h2>
      <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-MAIL"
          {...register("email", {
            required: true,
          })}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="PASSWORD"
          {...register("password", {
            required: true,
          })}
        />
        <button id="loginButton">LOG IN</button>
        <button id="kakaoLoginButton" type="button">
          <div id="kakaoLogin">
            <img src={kakaoLogo} className="kakaoLogo" alt="kakao logo" />
            카카오 계정으로 시작하기
          </div>
        </button>
        <div className="notUser">
          아직 회원이 아니신가요?{" "}
          <NavLink to="/Signup" className="goSignup">
            {" "}
            회원가입 하러 가기{" "}
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
