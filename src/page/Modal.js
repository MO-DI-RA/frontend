import React, { useEffect } from "react";
import "../css/Modal.css";
import Login from "./Login";

const Modal = ({ closeModal }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    // 모달 컨텐츠 외부를 클릭했을 때 모달창을 닫습니다.
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            closeModal();
        }
    };
    return (
        <div className="modalBackdrop" onClick={handleBackdropClick}>
            <div className="modalContent">
                <Login className="loginModal" />
                {/* <button onClick={closeModal}>닫기</button> */}
            </div>
        </div>
    );
};

export default Modal;
