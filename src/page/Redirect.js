//카카오 로그인 리다이렉트 화면
import React from "react";
import axios from "axios";

const Redirect = () => {
  // 인가 코드
  const code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:8000/user/kakao/login/?code=${code}`,
    })
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.access;
        localStorage.setItem("access-token", ACCESS_TOKEN);
        window.location.href = "/home";
      })
      .catch((err) => {
        console.log("소셜로그인 실패", err);
        // window.alert("소셜 로그인 실패");
        // window.location.href = "/login";
      });
  }, []); // 의존성 배열에 dispatch와 code 추가

  return 0;
};

export default Redirect;
