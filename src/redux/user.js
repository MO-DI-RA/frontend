//Redux 모듈 내 API 통신
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, removeCookie } from "../config/cookie";
import axios from "axios";

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
const loginDB = (body) => {
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
        console.log("refresh-token : ", res.data.token.access);
        localStorage.setItem("refresh-token", res.data.token.access);
        setCookie("is_login", `${is_login}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// SignUp
const signupDB = (body) => {
  return function () {
    axios
      .post("http://localhost:8000/users/register/", body)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 로그인 유지
const loginCheckDB = () => {
  return function () {
    const token = localStorage.getItem("refresh-token");
    console.log(token);
    axios
      .post("127.0.0.1:8000/user/refresh/", token, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${token}`,
        },
      })
      .then((res) => {
        const is_login = res.data.token.access;
        setCookie("is_login", `${is_login}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// logout
const logoutDB = () => {
  return function (dispatch) {
    dispatch(logOut());
    window.location.href = "/Home"; //홈화면 이동
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

//카카오 로그인
const kakaoLogin = async (code) => {
  return async function (dispatch, getState) {
    await axios({
      method: "GET",
      url: `http://localhost:8000/user/kakao/login/?code=${code}`,
    })
      .then((res) => {
        console.log("--------------------------------------------------", res); //콘솔 확인
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("ACCESS_token", ACCESS_TOKEN); //로컬에 토큰 저장
        // window.location.href = "/Home"; //홈화면으로 이동
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("소셜로그인 실패");
        // window.location.href = "/login"; //로그인 화면으로 복귀
      });
  };
};

export const actionCreators = {
  logOut,
  getUser,
  loginDB,
  signupDB,
  loginCheckDB,
  logoutDB,
  // kakaoLogin,
};
