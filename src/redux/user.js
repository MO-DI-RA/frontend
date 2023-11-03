//Redux 모듈 내 API 통신
import { createAction, handleAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { useNavigate } from "react-router-dom";
import {getCookie, setCookie, removeCookie} from "../config/cookie";
const navigate = useNavigate();

//Action
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

//initialState
const initialState = {
    user:  null,
    is_login : false, 
};


//Action Creator
const logOut = createAction(LOG_OUT, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));
const getUser = createAction(GET_USER, (user)=> ({user}));

//middleware actions

//Login
const loginDB = (body) => {
    return function () {
        axios.post("http://localhost:8000/user/login/", body, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            const accessToken = res.data.token.access;
            dispatchEvent(
                setUser({
                    email : res.data.email,
                })
            )
            setCookie("is_login", `${accessToken}`);
            navigate("/Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

// SignUp
const signupDB = (body) => {
    return function(){
        axios.post("http://localhost:8000/users/register/", body)
        .then((res) => {
            console.log(res);
            navigate("/Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }   
}

// 로그인 유지
const loginCheckDB = () => {
    return function() {
        const token = getCookie("is_login");
        console.log(token);
        //
        axios.post("")
    }
}

// logout
const logoutDB = () => {
    return function(dispatch, {history}){
        dispatch(logOut());
        history.replace("/Home");
    };
};

//불변성 유지
export default handleActions(
    {
        [SET_USER] : (state,action) => 
            produce(state, (draft) => {
                draft.user = action.payload.user;
                draft.accessToken = true;
            }),
        
        [LOG_OUT] : (state,action) => 
            produce(state,(draft) => {
                removeCookie("is_login");
                draft.user = null;
                draft.accessToken = false;
            }),
        [GET_USER] : (state,action) => produce(state, (draft) => {}),
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
