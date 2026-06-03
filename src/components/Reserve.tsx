import './css/Reserve.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentSeatApi } from "../api/ConcertApi";
import type { GetCurrentSeatResponse } from "../api/type/GetCurrentSeatResponse";

export default function Reserve() {
  const { roundId } = useParams<{roundId: string}>();
  const [seatInfo, setSeatInfo] = useState<GetCurrentSeatResponse>();
  

  useEffect(() => {
    getCurrentSeatApi(Number(roundId))
    .then(setSeatInfo)
    .catch(e => {
      console.log("getCurrentSeatApi fail!!");
      console.log(e);
    });
  }, [])

  return (
    <div style={{display:"flex", flexDirection:"row", gap: "10px", justifyContent: "center", width: "100%"}}>
      <div>
        {
          seatInfo?.seats.map((floorSeat, _floorIndex) => {
            return (
              <div>
              {_floorIndex != 0 && (<br />) }
              {floorSeat.rows.map((rowSeat, _rowIndex) => {
                return (
                  <>
                  {_rowIndex != 0 && (<br />) }
                  {rowSeat.columns.map(columnSeat => {
                    return (
                    <button type="button" 
                    style={{backgroundColor: columnSeat.state === "EMPTY" ? "#1814e7":"#b0b0b6"}}
                    disabled={columnSeat.state === "RESERVED"}/>
                  );
                })}
                </>
              )
              }
              )}
              </div>
            )
          })
        }
      </div>
      <div style={{display:"flex", gap: "20px", flexDirection:"column"}}>
        <div>
        {
          seatInfo?.grades.map((grade, _index) => {
            return (
              <>
              {_index != 0 && (<br />) }
              <label>{grade.gradeName} {grade.price}원 {grade.emptySeatCount}석</label>
              </>
            )
          })
        }
        </div>
        <div>
          <button type='button'>예약하기</button>
        </div>
      </div>
    </div>
  );
}

