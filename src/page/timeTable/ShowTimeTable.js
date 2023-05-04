import React, { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useNavigate } from "react-router-dom";

const ShowTimeTable = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const move = useNavigate();

  useEffect(() => {
    const fetchTimeTableData = async () => {
      try {
        const response = await apiClient.get(
          "https://localhost:3000/timetable"
        );
        if (response.status === 200) {
          setTimeTableData(response.data);
        } else {
          console.error("데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생", error);
      }
    };

    fetchTimeTableData();
  }, []);

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">시간표</strong>
          <button
            className="m-2 write-button"
            onClick={() => {
              move("/timetable/post");
            }}
          >
            작성하기
          </button>
        </div>
      </div>
      <hr />

      <table className="table">
        <thead>
          <tr>
            <th>과목명</th>
            <th>요일</th>
            <th>시작 시간</th>
            <th>종료 시간</th>
          </tr>
        </thead>
        <tbody>
          {timeTableData.map((item, index) => (
            <tr key={index}>
              <td>{item.subject}</td>
              <td>{item.day}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTimeTable;
