import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { actionCreators } from "../redux/user";

import "../css/Login.css";
import kakaoLogo from "../asset/kakaoLogo.png";
import { useDispatch } from "react-redux";

function Login() {
    //react-hook-form 사용
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    //Submit
    const onSubmit = async data => {
        console.log(data); //콘솔 확인

        const { email, password } = data;

        let body = {
            email: email,
            password: password,
        };

        console.log("body", body);

        dispatch(actionCreators.loginDB(body));
        // navigate("/Home");
    };

    //kakao 로그인
    const REST_API_KEY = "e1e4af98ca9f6131da2d779f616737bc";
    const REDIRECT_URI = "http://127.0.0.1:3000/user/kakao/callback/";
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    //kakao login
    const kakaoLogin = () => {
        window.location.href = link;
    };

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
                <button
                    id="kakaoLoginButton"
                    type="button"
                    onClick={kakaoLogin}
                >
                    <div id="kakaoLogin">
                        <img
                            src={kakaoLogo}
                            className="kakaoLogo"
                            alt="kakao logo"
                        />
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
