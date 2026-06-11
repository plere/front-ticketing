import { useState } from "react";
import { getAllConcertApi } from "../api/ConcertApi";
import type { GetAllConcertPageResponse } from "../api/type/GetAllConcertResponse";
import { Link } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [concertApiRes, setConcertApiRes] = useState<GetAllConcertPageResponse>();

  const callGetAllConcertApi = () => {
    getAllConcertApi(1, 10, name)
    .then(setConcertApiRes).catch(e => {
      console.log("getAllConcertApi fail!!");
      console.log(e);
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div>
      <div>
        <label>콘서트명: </label>
        <input type="text" value={name} onChange={handleInputChange}></input>
        <button style={{width:"50px", fontSize: "10px"}} type="button" onClick={callGetAllConcertApi}>검색</button>
      </div>
      <div>
        <table style={{ width: "100%",  tableLayout:"fixed", borderCollapse: "collapse"}}>
        <thead style={{backgroundColor: "#242424", color: "#f9f9f9"}}>
          <tr>
            <th>콘서트명</th>
            <th>오픈일</th>
            <th>장소명</th>
          </tr>
        </thead>
        <tbody>
          {(concertApiRes?.items.length ?? 0 > 0) && concertApiRes?.items.map(item => (
            <tr key={item.id}>
              <td style={tdStyle}>
                <Link to={`/${item.id}`} style={{width: "120px"}}>{item.name}</Link>
              </td>
              <td style={tdStyle}>{item.openTime}</td>
              <td style={tdStyle}>{item.placeName}</td>
            </tr>
          ))}
        </tbody>
        </table>
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
  