import React from "react";
import { useEffect, useState } from "react";
import { fetchUser } from "./User/UserAPI";

function Home(){

    const [user, setUser] = useState({});
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    useEffect(() => {
        if(ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [ACCESS_TOKEN]);

    return(
        <div>
            {ACCESS_TOKEN
            ?
            <div>
                {user.nickname}님
            </div>
            :
            <div>
                홈 화면
            </div>
            }
        </div>
    )
}

export default Home;