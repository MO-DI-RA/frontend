import React from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { actionCreators } from "../redux/user";

import "../css/SignUp.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // react-hook-form 사용
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 폼 제출

  const onSubmit = async (data) => {
    // console.log("data: ", data); //콘솔 확인

    const { email, password, nickname } = data;

    let body = {
      email: email,
      password: password,
      nickname: nickname,
    };

    // console.log("전송할 body : ", body);

    dispatch(actionCreators.signupDB(body, navigate));
  };

  return (
    <div>
      <div className="SignUp">
        <div className="SignUp-txt">
          <h1 style={{ margin: "0px", fontSize: "40px" }}> 회원 가입 </h1>
          <p> 회원가입 후 나의 소모임을 개설하고 팀원을 모집할 수 있습니다. </p>
        </div>
        <div className="SignUp-Container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formBox">
              <label htmlFor="email" className="inputLabel">
                {" "}
                이메일{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="inputBox"
                {...register("email", {
                  required: true,
                })}
              />
              <div className="ErrMsg">
                {errors.email && <p>* 이메일을 입력하세요</p>}
              </div>
            </div>
            <div className="formBox">
              <label htmlFor="password" className="inputLabel">
                {" "}
                비밀번호{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="inputBox"
                {...register("password", {
                  required: true,
                  pattern:
                    /(?=.*\d{1,50})(?=.*[~`!@#$%&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                })}
              />
              <div className="ErrMsg">
                {errors.password && errors.password.type === "required" && (
                  <p> * 비밀번호를 입력해주세요 </p>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <p>
                    {" "}
                    * 비밀번호는 영문 소문자, 숫자, 특수기호를 조합한 8~16자로
                    입력하세요{" "}
                  </p>
                )}
              </div>
            </div>
            <div className="formBox">
              <label htmlFor="checkPassword" className="inputLabel">
                {" "}
                비밀번호 확인{" "}
              </label>
              <input
                type="password"
                id="checkPassword"
                name="checkPassword"
                className="inputBox"
                {...register("checkPassword", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
              />
              <div className="ErrMsg">
                {errors.checkPassword &&
                  errors.checkPassword.type === "required" && (
                    <p> * 비밀번호를 확인하세요 </p>
                  )}
                {errors.checkPassword &&
                  errors.checkPassword.type === "validate" && (
                    <p> * 비밀번호가 일치하지 않습니다. </p>
                  )}
              </div>
            </div>
            <div className="formBox">
              <label htmlFor="nickname" className="inputLabel">
                {" "}
                닉네임{" "}
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="inputBox"
                {...register("nickname", {
                  required: true,
                  maxLength: 7,
                })}
              />
              <div className="ErrMsg">
                {errors.nickname && errors.nickname.type === "required" && (
                  <p> * 닉네임을 입력하세요 </p>
                )}
                {errors.nickname && errors.nickname.type === "maxLength" && (
                  <p> * 최대 길이는 7자 입니다. </p>
                )}
              </div>
            </div>
            <input type="submit" value="회원 가입 하기" className="SignupBtn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
