import { useEffect, useRef, useState } from "react";
import { getPositionByWaitingTokenApi, getWaitingTokenApi } from "../api/WaitingApi";
import { useNavigate, useParams } from "react-router-dom";
import type { WaitingToken } from "../api/type/WaitingTokenResponse";

export default function ReserveWaiting() {
  const navigate = useNavigate();
  const { concertId } = useParams<{concertId: string}>();
  const { roundId } = useParams<{roundId: string}>();
  const [position, setPosition] = useState(0);
  const [waitingToken, setWaitingToken] = useState<WaitingToken>();
  const intervalRef = useRef<number|null>(null);

  useEffect(() => {
    const initApi = async () => {
      const wt = await getWaitingTokenApi(Number(concertId), Number(roundId));
      console.log("Wt",wt);
      setWaitingToken(wt);
      const p = await getPositionByWaitingTokenApi(wt);
      setPosition(p);

      if (p === 0) {          
          stopPolling();
        }
    };

    initApi();
    }, []);


  // 2. 폴링을 중지하는 함수
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('폴링이 명시적으로 종료되었습니다.');
      if(position == 0) {
        navigate(`/${roundId}/reserve`)
      }
    }
  };

  useEffect(() => {
    const getPosition = async () => {
      try {
        const p = await getPositionByWaitingTokenApi(waitingToken!);
        setPosition(p);
      
        // 3. 특정 시점(조건)에 도달하면 인터벌 종료
        if (p === 0) {          
          stopPolling();
        }
      } catch (error) {
        console.error('API 호출 에러, 폴링을 중단합니다.');
        stopPolling(); // 에러 발생 시에도 안전하게 종료
      }
    }

    // 4. 3초마다 반복 실행하도록 인터벌 등록 및 ref에 ID 저장
    intervalRef.current = setInterval(getPosition, 2000);

    // 5. 컴포넌트 언마운트 시 클린업
    return () => stopPolling();
  }, []); // 빈 배열을 두어 최초 마운트 시에만 인터벌이 1번 등록되도록 함

  return (
    <>
    잠시 기다려주세요...
    {position} 번째 순서입니다.
    </>
  );
}