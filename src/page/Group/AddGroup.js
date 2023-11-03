import React from "react";
import Header from "../../component/Header"
import Footer from "../../component/Footer";

function AddGroup(){
    return(
        <div>
            <Header/>
            <div>
                <div>
                    <p> <b>새로운 소모임</b>을 생성하고<br/>
                    함께 활동할 <b>팀원</b>들을 <b>모집</b>해보세요!
                    </p>
                </div>
                <div className="groupInfo">
                    <p> 소모임 기본 정보 </p>
                </div>
                <div className="groupPost">

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddGroup;
