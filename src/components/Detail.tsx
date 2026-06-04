import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getConcertDetailApi, getEmptySeatByRoundIdApi } from "../api/ConcertApi";
import type { GetConcertDetailResponse } from "../api/type/GetConcertDetailResponse";
import type { GetEmptySeatByRoundIdResponse } from "../api/type/GetEmptySeatByRoundIdResponse";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [roundId, setRoundId] = useState(0);
  const [concert, setConcert] = useState<GetConcertDetailResponse>();
  const [emptySeats, setEmptySeats] = useState<GetEmptySeatByRoundIdResponse[]>([]);

  useEffect(() => {
    getConcertDetailApi(Number(id))
    .then(res => {
      setConcert(res);
      callEmptySeatByRoundIdApi(res.rounds.filter(round => round.sequenceNumber == 1)[0].id);
    })
    .catch(e => {
      console.log("getConcertDetailApi fail!!");
      console.log(e);
    });
  }, [id])

  useEffect(() => {

  }, [emptySeats])

  const callEmptySeatByRoundIdApi = (id: number) => {
    setRoundId(id);
    getEmptySeatByRoundIdApi(id)
    .then(setEmptySeats)
    .catch(e => {
      console.log("getEmptySeatByRoundIdApi fail!!");
      console.log(e);
    });
  };

  return (
    <div style={{display:"flex", gap: "20px", flexDirection: "column"}}>
    <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
      <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
        <tr>
          <th>콘서트명</th>
          <th>상세정보</th>
          <th>관람시간</th>
          <th>티켓오픈일</th>
          <th>장소명</th>
          <th>가격</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tdStyle}>{concert?.name}</td>
          <td style={tdStyle}>{concert?.detailInfo}</td>
          <td style={tdStyle}>{concert?.runningTime}</td>
          <td style={tdStyle}>{concert?.ticketingStartTime}</td>
          <td style={tdStyle}>{concert?.placeName}</td>
          <td style={tdStyle}>
            {concert?.seatGrades.map((grade, _index) => {
              return (
              <>
                {_index != 0 && (<br />)}
                {grade.name}: {grade.price}원
              </>
              )
            })}
          </td>
        </tr>
      </tbody>
    </table>
    <div >
    {
      concert?.rounds.map(round => {
        return (
          <>
            <button type="button" onClick={() => callEmptySeatByRoundIdApi(round.id)}>{round.startDateTime}</button>
          </>
        );
      })
    }
    </div>
    <div style={{display:"flex", flexDirection:"row", gap: "10px", justifyContent: "center", width: "100%"}}>
      <div style={{display:"flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
          <label>남은 좌석:</label>
          <div style={{justifyContent: "center", width:"100px"}}>
            {emptySeats.map((empty, _index) => 
              <>
                {_index != 0 && <br />}
                <label style={{width:"100px"}}>
                  {empty.gradeName}: {empty.count}
                </label>
              </>  
              )}
          </div>
        </div>
        <button type="button" onClick={() => navigate(`/concerts/${id}/${roundId}/reserve/waiting`)}>예매하기</button>
      </div>
    </div>
  );
};

const tdStyle = {
  border: "1px solid",
  padding: "8px",
  wordBreak: "break-word", // 긴 단어 줄바꿈
  overflowWrap: "break-word", // 호환용
  whiteSpace: "normal"
};
  