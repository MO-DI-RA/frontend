import "./Login.css";
import kakaoLogo from "./kakaoLogo.png";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.idVal,
        password: this.state.pwVal,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.token) {
          //토큰 값 존재하면
          localStorage.setItem("token", response.token); //토큰값 브라우저의 로컬스토리지에 저장
          this.props.history.push("/main"); //메인페이지로 이동
        } else {
          alert("로그인 실패");
        }
      });
  };

  return (
    <div className="Login">
      <h2 className="welcome">
        <span className="modira">MODIRA</span>에 오신 것을 환영합니다!
      </h2>
      <form onSubmit={handleSubmit}>
        <input id="email" name="email" placeholder="E-MAIL"></input>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="PASSWORD"
        ></input>
        <button id="loginButton">LOG IN</button>
        <button id="kakaoLoginButton">
          <div id="kakaoLogin">
            <img src={kakaoLogo} className="kakaoLogo" alt="kakao logo" />
            카카오 계정으로 시작하기
          </div>
        </button>
        <div className="notUser">
          아직 회원이 아니신가요?{" "}
          <a href="http://" className="goSignup">
            회원가입 하러 가기
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
