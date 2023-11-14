//분야 태그 버튼
// 분야 태그 내용 정하기

const btnValue = [
    {id : "분야 태그"},
    {id : "공부"},
    {id : "맛집"},
    {id : "IT"},
    {id : "운동"},
    {id : "학술"},
]


function TypeBtn({id, handleChange}){
    return(
        <div>
            {btnValue.map((button) => 
                <button
                    type = "button"
                    key={button.id}
                    value={button.id}
                    id = {id}
                    onClick={handleChange}
                >
                #{button.id}
                </button>
            )}
        </div>
    );
};

export default TypeBtn;