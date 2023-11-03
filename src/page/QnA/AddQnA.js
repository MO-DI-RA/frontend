import "../../css/AddQnA.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";

function AddQnA() {
  return (
    <div>
      <Header />
      <div className="addQnA">
        <p className="introQnA">
          질문을 <span className="registerQnA">등록</span>하고
          <br />
          궁금증을 해결해보세요!
        </p>
        <form className="addQnAForm">
          <input
            id="qnaTitle"
            name="qnaTitle"
            placeholder="제목을 작성해주세요"
            required
          ></input>
          <textarea className="qusetionContent" required></textarea>
          <div className="registerQnAButtons">
            <button className="cancelButton">취소하기</button>
            <button className="registerQnAButton">등록하기</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AddQnA;
