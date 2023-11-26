//분야 태그 버튼
// 분야 태그 내용 정하기

const btnValue = [
  { id: "분야태그" },
  { id: "공부" },
  { id: "맛집" },
  { id: "IT" },
  { id: "운동" },
  { id: "학술" },
];

const btnStyle = {
  borderRadius: "50px",
  background: "#E5E5E5",
  border: "none",
  padding: "8px 15px",
  margin: "5px 5px",
};

//소모임 생성시 선택된 분야 색 표시를 위해 activeType 추가
function TypeBtn({ handleChange, activeType }) {
  return (
    <div style={{ marginLeft: "25px" }}>
      {btnValue.map((button) => (
        <button
          type="button"
          key={button.id}
          value={button.id}
          id={button.id}
          onClick={handleChange}
          style={{
            ...btnStyle,
            backgroundColor: activeType === button.id ? "#D1DDD0" : "#E5E5E5", //선택시 연두색 아니면 회색
          }}
        >
          #{button.id}
        </button>
      ))}
    </div>
  );
}

export default TypeBtn;
