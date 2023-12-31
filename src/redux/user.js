//Redux 모듈 내 API 통신
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, removeCookie } from "../config/cookie";

import axios from "axios";
import base64 from "base-64";

//Action
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

//initialState
const initialState = {
  user: null,
  is_login: false,
};

//Action Creator
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

//middleware actions

//Login
const loginDB = (body, navigate) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8000/user/login/", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(
          setUser({
            email: res.data.email,
          })
        );
        const is_login = res.data.token.access;
        // console.log("access-token : ", res.data.token.access);
        localStorage.setItem("access-token", res.data.token.access);
        localStorage.setItem("refresh-token", res.data.token.refresh);
        let token = res.data.token.access;
        let payload = token.substring(
          token.indexOf(".") + 1,
          token.lastIndexOf(".")
        );
        let dec = JSON.parse(base64.decode(payload));
        // console.log(dec);
        // console.log("decode : ", dec["user_id"]);
        localStorage.setItem("user_id", dec["user_id"]); //user_id 토큰 까봐야함
        setCookie("is_login", `${is_login}`);
        // alert("로그인 성공");
        navigate(-1);
        window.location.reload();
      })
      .catch((error) => {
        alert("등록 되지 않은 Eamil 혹은 비밀번호가 일치하지 않습니다.");
        // window.location.reload(); // 페이지 새로고침
      });
  };
};

// SignUp
const signupDB = (body, navigate) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8000/user/signup/", body)
      .then((res) => {
        // console.log(res);
        navigate("/Home");
        // console.log("body : ", body);
      })
      .catch((error) => {
        alert("Email 중복입니다.");
      });
  };
};

// logout
const logoutDB = () => {
  return function (dispatch) {
    dispatch(logOut());
    window.localStorage.clear();
    removeCookie("is_login");
    window.location.reload();
    window.location.href = "/Home"; //홈화면 이동
  };
};

// 로그인 유지
const loginCheckDB = () => {
  return function (dispatch) {
    const token = localStorage.getItem("refresh-token");
    // console.log(token);
    const body = { token: token };
    axios
      .post("http://127.0.0.1:8000/user/verify/", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const is_login = res.data.token.access;
        setCookie("is_login", `${is_login}`);
        // console.log("0-------------------");
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 401) | (error.response.status === 400)
        ) {
          dispatch(logOut());
          window.localStorage.clear();
          removeCookie("is_login");
          // window.location.href = "/Home";
        } else {
          // Handle other types of errors or log them
          console.error("Error occurred:", error);
        }
      });
  };
};

//불변성 유지
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.accessToken = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("refresh-token");
        removeCookie("is_login");
        draft.user = null;
        draft.accessToken = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  logOut,
  getUser,
  loginDB,
  signupDB,
  loginCheckDB,
  logoutDB,
};
