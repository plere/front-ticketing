import './css/Reserve.css';
import React, { act, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentSeatApi } from "../api/ConcertApi";
import type { GetCurrentColumnSeatResponse, GetCurrentSeatResponse } from "../api/type/GetCurrentSeatResponse";
import { reservationTokenStore } from '../stores/reservationTokenStore';
import { createTempReservationApi } from '../api/ReserveApi';
import { closeBtnStyle, headerStyle, modalBoxStyle, overlayStyle, titleStyle } from './css/ReserveModal';

type SelectSeatType = {
  id: number,
  floor: number,
  row: number,
  column: number
};

const SeatButton = React.memo(({columnSeat, selected, floor, row, action} : {
    columnSeat: GetCurrentColumnSeatResponse, 
    selected: SelectSeatType[],
    floor: number,
    row: number,
    action: (seat: SelectSeatType) => void
  }) => {
  const selectSeat = useMemo(() => {
    if(selected.find(seat => seat.id === columnSeat.id)) {
      return '3px solid black';
    }
    return '';

  }, [columnSeat, selected]);

  return (
    <button type="button" 
      style={{
        backgroundColor: columnSeat.state === "EMPTY" ? "#1814e7":"#b0b0b6",
        border: selectSeat
      }}
      disabled={columnSeat.state === "RESERVED"}
      onClick={() => action({id: columnSeat.id, floor: floor, row: row, column: columnSeat.column})}
    />
  );
});

const Modal = ({close} : {
  close: () => void
}) => {
  return (
    <div style={overlayStyle} onClick={close}>
      <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>이미 선점된 좌석입니다</h2><br />
          <button style={closeBtnStyle} onClick={close}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default function Reserve() {
  const { concertId } = useParams<{concertId: string}>();
  const { roundId } = useParams<{roundId: string}>();
  const [seatInfo, setSeatInfo] = useState<GetCurrentSeatResponse>();
  const reservationToken = reservationTokenStore((state) => state.reservationToken)
  const [selectSeats, setSelectSeats] = useState<SelectSeatType[]>([]);
  const [modalView, setModalView] = useState<boolean>(false);
  
  useEffect(() => {
    getCurrentSeatApi(Number(roundId), reservationToken)
    .then(setSeatInfo)
    .catch(e => {
      console.log("getCurrentSeatApi fail!!");
      console.log(e);
    });
  }, [])

  const selectSeat = (seat: SelectSeatType) => {
    if(selectSeats.find(selected => selected.id === seat.id)) {
      setSelectSeats(
        selectSeats.filter(selected => selected.id !== seat.id)
      );
    } else {
      setSelectSeats([
        ...selectSeats,
        seat
      ]);
    }
  }

  const callReserveApi = () => {
   createTempReservationApi(Number(concertId), Number(roundId), selectSeats.map((seat) => seat.id))
   .then(res => {
    //todo, tempreservation store에 저장
    console.log("tempreservation!! ", res);
   })
   .catch(e => {
      setModalView(true);
      console.log("createTempReservationApi fail!!");
      console.log(e);
    });
  }

  const resetSelectSeats = () => {
    setSelectSeats([]);
  };

  const closeModal = () => {
    setModalView(false);
    resetSelectSeats();
  };

  return (
    <>
    {modalView && <Modal close={closeModal}/>}
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
                      <SeatButton columnSeat={columnSeat} selected={selectSeats} floor={floorSeat.floor} row={rowSeat.row} action={selectSeat}/>
                    );
                  })}
                  </>
                )
              })}
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
          <button type='button' onClick={callReserveApi}>예매하기</button>
        </div>
      </div>
    </div><br /><br /><br />
    <div>
      선택한 좌석 <br />
      {
        selectSeats.map((seat) => {
          return (
          <>
            {seat.floor}층: {seat.row} 행 {seat.column}열
            <br />
          </>
          )
        })
      }
    </div>
    </>
  );
}

