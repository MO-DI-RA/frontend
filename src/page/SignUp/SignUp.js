import React from "react";
import { useForm}  from "react-hook-form";

import "./SignUp.css";


function SignUp() {

    const {register, formState: {errors} ,handleSubmit} = useForm();

    
    // 폼 제출
    const onSubmit = (data) => {
        console.log(data);
    }

    return(
        <div className="SignUp">
            <div className="SignUp-txt">
                <h1 style={{margin : "0px", fontSize : "40px"}}> 회원 가입 </h1> 
                <p> 회원가입 후 나의 소모임을 개설하고 팀원을 모집할 수 있습니다. </p>
            </div>
            <div className="SignUp-Container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email" className="inputLabel"> 이메일 </label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        className="inputBox"
                        {...register("eamil", {
                            required : true,
                        })}
                    />
                    <div className="ErrMsg">
                        {errors.email && errors.email.type === "required" && 
                        <p> 이메일을 입력하세요 </p>}
                    </div>

                    <label htmlFor="password" className="inputLabel"> 비밀번호 </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="inputBox"
                        {...register("password", {
                            required : true,
                            pattern: /(?=.*\d{1,50})(?=.*[~`!@#$%&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                        })}
                    />
                    <label htmlFor="checkPassword" className="inputLabel"> 비밀번호 확인 </label>
                    <input 
                        type="password"
                        id="checkPassword"
                        name="checkPassword"
                        className="inputBox"
                        {...register("checkPassword", {
                            required: true,
                        })}
                    />
                    <label htmlFor="nickname" className="inputLabel"> 닉네임 </label>
                    <input 
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="inputBox"
                        {...register("nickname", {
                            required : true,
                            maxLength : 7
                        })}
                    />
                    <input type="submit" value="회원 가입 하기" className="SignupBtn"/>
                </form>
            </div>
        </div>
    )

}

export default SignUp;