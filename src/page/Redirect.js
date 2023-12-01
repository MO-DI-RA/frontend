//카카오 로그인 리다이렉트 화면
import React from "react";
import axios from "axios";
import base64 from "base-64";

const Redirect = () => {
    // 인가 코드
    const code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8000/user/kakao/login/?code=${code}`,
        })
            .then(res => {
                // console.log(res);
                const ACCESS_TOKEN = res.data.access;
                const REFRESH_TOKEN = res.data.refresh;
                localStorage.setItem("access-token", ACCESS_TOKEN);
                localStorage.setItem("refresh-token", REFRESH_TOKEN);

                let token = ACCESS_TOKEN;
                let payload = token.substring(
                    token.indexOf(".") + 1,
                    token.lastIndexOf(".")
                );
                let dec = JSON.parse(base64.decode(payload));
                // console.log(dec);
                // console.log("decode : ", dec["user_id"]);
                localStorage.setItem("user_id", dec["user_id"]); //user_id 토큰 까봐야함
                window.location.href = "/home";
            })
            .catch(err => {
                console.log("소셜로그인 실패", err);
                // window.alert("소셜 로그인 실패");
                // window.location.href = "/login";
            });
    }, []); // 의존성 배열에 dispatch와 code 추가

    return (
        <div style={{ textAlign: "center", padding: "500px" }}>
            카카오 로그인 중 ...
        </div>
    );
};

export default Redirect;
