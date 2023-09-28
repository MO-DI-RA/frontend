import "./Login.css";
import kakaoLogo from "./kakaoLogo.png";

function Login() {
  return (
    <div className="Login">
      <h2 className="welcome">
        <span className="modira">MODIRA</span>에 오신 것을 환영합니다!
      </h2>
      <form method="POST">
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
