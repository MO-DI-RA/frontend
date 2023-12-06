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

  const [questionData, setQuestionData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [resolve, setResolve] = useState(false);

  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [editedTitle, setEditedTitle] = useState(""); // 수정된 제목
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용

  //관심설정 표시
  const [liked, setLiked] = useState(false);

  //댓글
  const [comments, setComments] = useState([]);

  // 댓글 입력창 상태 관리
  const [commentInputs, setCommentInputs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // 로그인 모달창 열기
    setIsModalOpen(true);
  };

  const closeModal = () => {
    //로그인 모달창 닫기
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

  //Q&A 상세정보
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/qna/posts/${id}/`,
      headers: {
        "Content-Type": "application/json",
        // Authorization: headersString,
      },
      params: {
        user_id: localStorage.getItem("user_id"),
      },
    })
      .then((response) => {
        setQuestionData(response.data);
        setResolve(response.data.status); //서버에서 받은 status가 참이면 해결 상태로 설정
        setLiked(response.data.like_status); //관심 설정 여부
      })
      .catch((error) => console.error(error));
  }, [id, liked]);

  //Q&A 댓글
  const fetchComments = () => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/qna/posts/${id}/comments/`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log("Q&A 댓글 error : ", err);
      });
  };

  useEffect(() => {
    // id 바뀔 때마다 fetchComments 호출
    fetchComments();
  }, [id]);

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
        // console.log(response);
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
        //수정 성공시
        // console.log(response);
        setQuestionData({
          //제목, 내용 set
          ...questionData,
          title: editedTitle,
          content: editedContent,
        });
        setEditMode(false); // 수정 모드 종료
      })
      .catch((error) => console.error(error));
  };

  const submitAnswer = () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      // 토큰이 없으면 로그인하지 않은 것 -> 모달을 열어 로그인을 유도
      openModal();
      return; // 함수 실행 중단
    }
    const options = {
      url: `http://127.0.0.1:8000/qna/posts/${questionData.id}/comments/`, // 답변 등록 URL
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
        // console.log(response);
        // 새로운 답변을 questionData.answers 배열에 추가
        setQuestionData({
          ...questionData,
          answers: [...questionData.answers, response.data],
        });
        // 입력란을 비워주기
        setAnswer("");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          openModal(); // 401 오류시(로그인 안하고 댓글 등록 누르면) 모달을 띄움
        }
        if (error.response && error.response.status === 400) {
          alert("답변 내용을 입력하세요.");
        }
      });
  };

  const deleteQuestion = () => {
    if (window.confirm("이 Q&A를 삭제하시겠습니까?")) {
      axios
        .delete(`http://127.0.0.1:8000/qna/posts/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
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
        // console.log(response);
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
      const isAuthor =
        Number(localStorage.getItem("user_id")) === questionData.author_id;
      // console.log(localStorage.getItem("user_id"), questionData.author_id);
      // console.log("-------", questionData);
      // const disableButton = isAuthor ? {} : { disabled: "disabled" };
      const editButtonStyle = isAuthor ? {} : { display: "none" };
      console.log(questionData.answers);
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
                <button
                  className={buttonStyle}
                  onClick={toggleResolveStatus}
                  disabled={!isAuthor ? true : false}
                >
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
              <img
                src={
                  "http://localhost:8000/" +
                    questionData.author_profile_image || defaultImg
                }
                className="defaultImg"
                alt="작성자 프로필"
              ></img>
              <p>{questionData.author_nickname}</p>
              <p> 등록일 : {formatDate(questionData.created_at)}</p>
            </div>

            <p className="qnaContent">{questionData.content}</p>
            <div className="qnaEditButtons" style={editButtonStyle}>
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
                }}
                className="answerRegister"
              >
                등록
              </button>
            </div>

            {comments.map((answer) => (
              <div className="answerLayout" key={answer.id}>
                <div className="userInfo">
                  <img
                    src={
                      "http://localhost:8000/" + answer.author_profile_image ||
                      defaultImg
                    }
                    className="defaultImg"
                    alt="Profile"
                  />
                  <p>{answer.writer}</p>
                  <p>{formatDate(answer.created_at)}</p>
                </div>
                <p className="answerContent">{answer.content}</p>
                <button
                  className="CommentOnAnswer"
                  onClick={() => toggleCommentInput(answer.id)}
                >
                  댓글 달기
                </button>
                {commentInputs[answer.id] && (
                  // 댓글 입력창 컴포넌트
                  <CommentInput
                    postUrl={`http://127.0.0.1:8000/qna/posts/${questionData.id}/comments/${answer.id}/reply/`}
                    openModal={openModal}
                  />
                )}
                {/* 댓글 내용 불러오는 컴포넌트 */}
                <Comment
                  url={`http://127.0.0.1:8000/qna/posts/${questionData.id}/comments/${answer.id}/reply/`}
                  type="qna"
                />
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
