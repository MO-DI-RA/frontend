//분야 태그 버튼
// 분야 태그 내용 정하기

const btnValue = [
    {id : "분야태그"},
    {id : "공부"},
    {id : "맛집"},
    {id : "IT"},
    {id : "운동"},
    {id : "학술"},
]

const btnStyle = {
    borderRadius: "50px",
    background: "#E5E5E5",
    border : "none",
    padding: "8px 15px",
    margin : "5px 5px",
}

function TypeBtn({handleChange}){
    return(
        <div style={{marginLeft : "25px"}}>
            {btnValue.map((button) => 
                <button
                    type = "button"
                    key={button.id}
                    value={button.id}
                    id = {button.id}
                    onClick={handleChange}
                    style={btnStyle}
                >
                #{button.id}
                </button>
            )}
        </div>
    );
};

export default TypeBtn;