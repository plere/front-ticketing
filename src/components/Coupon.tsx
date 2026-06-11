import { useNavigate, useParams } from "react-router-dom";
import { tempReservationTokenStore } from "../stores/tempReservationStore";

export function Coupon() {
  const navigate = useNavigate();
  const { concertId } = useParams<{concertId: string}>();
  const { roundId } = useParams<{roundId: string}>();
   const tempReservation = tempReservationTokenStore((state) => state.tempReservation);
  

  return (
    <>
    <div>
      선택한 좌석<br />
      {tempReservation.seatIds.map(seat => {
        return (
          <>
            {seat}
            <br />
          </>
        );
      })}
    </div>
    <table style={{ width: "80%", margin: "0 auto", tableLayout:"fixed", borderCollapse: "collapse"}}>
      <tbody>
        <tr>
          <td style={{...tdStyle, width: "80%"}}>쿠폰적용하기</td>
          <td style={tdStyle}>
            <select style={selectStyle}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
            </select>
          </td>
        </tr>
        <tr>
          <td 
            colSpan={2} 
            style={{ 
              padding: "16px 0",     // 위아래 여백을 줘서 버튼이 숨쉬게 함
              textAlign: "right",    // 버튼을 맨 오른쪽(3열 위치)으로 밀어냄
              border: "none"         // 마지막 행은 테두리를 없애면 더 깔끔합니다
            }}
          >
            <button style={{ padding: "8px 16px", cursor: "pointer" }} onClick={() => navigate(`/concerts/${concertId}/${roundId}/reserve/payment`)}>다음단계</button>
          </td>
        </tr>
      </tbody>
    </table>
    </>
  );
};

const tdStyle = { border: "1px solid #ddd", padding: "8px" };
const selectStyle = {
  width: "100%",
  height: "100%",          // 부모(td) 높이에 꽉 맞춤
  minHeight: "35px",       // 칸이 너무 찌그러지지 않게 최소 높이 지정
  padding: "8px",          // td에서 뺐던 여백을 여기서 줍니다
  boxSizing: "border-box", // 패딩이 너비를 뚫고 나가지 않게 방지
  border: "none",          // 셀렉트 박스 자체의 테두리를 없애서 자연스럽게 융화
  outline: "none",         // 클릭했을 때 생기는 파란 테두리 제거
  backgroundColor: "transparent", // 배경색을 투명하게 (선택사항)
  cursor: "pointer",
  textAlign: "center"      // 글자 가운데 정렬
} as const;