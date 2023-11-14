//카카오 로그인 리다이렉트 화면
import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/user";


const Redirect = (props) => {
    const dispatch = useDispatch();

    //인가 코드
    const code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(() => {
        dispatch(userActions.kakaoLogin(code));
    }, []);

    return(
        <div> 카카오 로그인 </div>
    )
}

export default Redirect;