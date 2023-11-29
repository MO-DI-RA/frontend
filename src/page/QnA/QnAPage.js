import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/QnAPage.css";
import defaultImg from "../../asset/defaultImg.png";
import goBack from "../../asset/goBack.png";
import axios from "axios";
import CommentInput from "../../component/CommentInput";
import Comment from "../../component/Comment";
import Modal from "../Modal";

function QnAPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access-token");
  const { id } = useParams();
  let headersString = token ? `Bearer ${token}` : "";

  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [resolve, setResolve] = useState(false);

  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [editedTitle, setEditedTitle] = useState(""); // 수정된 제목
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용

  //관심설정 표시
  const [liked, setLiked] = useState(false);

  // 댓글 입력창 상태 관리
  const [commentInputs, setCommentInputs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // 빈 문자열 혹은 null/undefined 처리

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // 유효한 날짜 값인 경우
      return date.toISOString().split("T")[0];
    } else {
      // 유효하지 않은 날짜 값인 경우
      return "";
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/qna/posts/${id}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: headersString,
      },
    })
      .then((response) => {
        setQuestionData(response.data);
        setResolve(response.data.status); //서버에서 받은 status가 참이면 해결 상태로 설정
        setLiked(response.data.like_status); //관심 설정 여부
      })
      .catch((error) => console.error(error));
  }, [id, liked]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const toggleResolveStatus = () => {
    const newResolveStatus = !resolve;
    setResolve(newResolveStatus);

    axios
      .put(
        `http://127.0.0.1:8000/qna/posts/${id}/toggle/`,
        {
          title: questionData.title,
          content: questionData.content,
          status: newResolveStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setResolve(resolve); // 오류 발생 시 상태 되돌리기
      });
  };

  const buttonStyle = resolve ? "qnaState resolve" : "qnaState";
  const buttonText = resolve ? "해결" : "미해결";

  const startEdit = () => {
    //수정 시작할때 초기 값(원래 내용)
    setEditedTitle(questionData.title);
    setEditedContent(questionData.content);
    setEditMode(true);
    // setEditedTitle("원래 제목");
    // setEditedContent("원래 내용");
    // setEditMode(true);
  };

  const submitEdit = () => {
    const options = {
      url: `http://127.0.0.1:8000/qna/posts/${id}/`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        title: editedTitle,
        content: editedContent,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response);
        // 수정 후 필요한 동작 수행
        setQuestionData({
          ...questionData,
          title: editedTitle,
          content: editedContent,
        });
        setEditMode(false); // 수정 모드 종료
      })
      .catch((error) => console.error(error));
  };

  const submitAnswer = () => {
    const options = {
      url: "http://127.0.0.1:8000/qna/answers/", // 답변 등록 URL
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      data: {
        questionId: questionData.id,
        content: answer,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response);
        // 새로운 답변을 questionData.answers 배열에 추가
        setQuestionData({
          ...questionData,
          answers: [...questionData.answers, response.data],
        });
        // 입력란을 비워주기
        setAnswer("");
      })
      .catch((error) => console.error(error));
  };

  const deleteQuestion = () => {
    if (window.confirm("이 Q&A를 삭제하시겠습니까?")) {
      axios
        .delete(`http://127.0.0.1:8000/qna/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.href = "/Home"; // 삭제 후 홈으로
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  // 관심 설정
  const handleLikedChange = () => {
    const token = localStorage.getItem("access-token");

    axios({
      method: "POST",
      url: `http://127.0.0.1:8000/qna/posts/${id}/like/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (liked) {
          setLiked(false);
          alert("관심 해제 되었습니다.");
        } else {
          setLiked(true);
          alert("관심 등록 되었습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          openModal(); // 401 오류시(로그인 안하고 관심 등록 누르면) 모달을 띄움
        }
      });
  };

  // 뒤로가기 버튼
  const onBackClick = () => {
    navigate(-1);
  };

  // 댓글 입력창 표시/숨김 처리
  const toggleCommentInput = (answerId) => {
    setCommentInputs({
      ...commentInputs,
      [answerId]: !commentInputs[answerId],
    });
  };

  function renderContent() {
    if (editMode) {
      //수정모드
      return (
        <div className="qnaPage">
          <div className="qnaEditContainer">
            <input
              className="qnaTitleEdit"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              className="qusetionContentEdit"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
            <button onClick={submitEdit} className="qnaEditCompleteButton">
              수정완료
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {isModalOpen && <Modal closeModal={closeModal} />}
          <div className="qnaPage">
            <div className="qnaInfoContainer">
              <img
                src={goBack}
                className="goBack"
                alt="뒤로가기"
                onClick={onBackClick}
              ></img>
              <div className="qnaTitleLayout">
                <h2>{questionData.title}</h2>
                <button className={buttonStyle} onClick={toggleResolveStatus}>
                  {buttonText}
                </button>
                <button
                  className={liked ? "LikedSetBtnYes" : "LikedSetBtn"}
                  onClick={handleLikedChange}
                >
                  {" "}
                  ♥
                </button>
              </div>
            </div>
            <div className="userInfo">
              <p>{formatDate(questionData.created_at)}</p>
              {/* <p>작성일자</p> */}
            </div>
            <div className="userInfo">
              <img
                src={
                  "http://localhost:8000" + questionData.author_profile_image ||
                  defaultImg
                }
                // src={defaultImg}
                className="defaultImg"
                alt="작성자 프로필"
              ></img>
              <p>{questionData.author_nickname}</p>
              {/* <p>작성자 닉네임</p> */}
            </div>

            <p className="qnaContent">{questionData.content}</p>
            {/* <p className="qnaContent">질문 내용</p> */}
            <div className="qnaEditButtons">
              <button onClick={startEdit} className="qnaModifyButton">
                수정하기
              </button>
              <button onClick={deleteQuestion} className="qnaDeleteButton">
                삭제하기
              </button>
            </div>

            <h3 className="answerTitle">답변 등록하기</h3>
            <div className="answerInputLayout">
              <textarea
                className="answerInput"
                value={answer}
                onChange={handleAnswerChange}
              ></textarea>
              <button
                onClick={() => {
                  submitAnswer();
                  openModal();
                }}
                className="answerRegister"
              >
                등록
              </button>
            </div>

            {questionData.answers.map((answer) => (
              <div className="answerLayout" key={answer.answer_id}>
                <div className="userInfo">
                  <img
                    src={
                      "http://localhost:8000" +
                        questionData.author_profile_image || defaultImg
                    }
                    className="defaultImg"
                    alt="Profile"
                  />
                  <p>{answer.author_nickname}</p>
                  <p>{formatDate(answer.created_at)}</p>
                </div>
                <p className="answerContent">{answer.content}</p>
                <button
                  className="CommentOnAnswer"
                  onClick={() => toggleCommentInput(answer.answer_id)}
                >
                  댓글 달기
                </button>
                {commentInputs[answer.answer_id] && (
                  <CommentInput
                    postUrl={`http://127.0.0.1:8000/qna/posts/${questionData.id}/comments/${answer.answer_id}/reply/`}
                    type="qna"
                  /> // 댓글 입력 컴포넌트
                )}
                <Comment
                  url={`http://127.0.0.1:8000/qna/posts/${questionData.id}/comments/${answer.answer_id}/reply/`}
                />
                {/* 댓글 내용 불러오는 컴포넌트 */}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  return renderContent();
}
export default QnAPage;
