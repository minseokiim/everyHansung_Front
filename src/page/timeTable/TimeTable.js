import React, { useState } from "react";
import Table from "./Table";
import Modal from "react-modal";
import axios from "axios";
import "./TimeTable.css";

const TimeTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "시간",
        accessor: "time",
      },
      {
        Header: "월",
        accessor: "mon",
      },
      {
        Header: "화",
        accessor: "tue",
      },
      {
        Header: "수",
        accessor: "wed",
      },
      {
        Header: "목",
        accessor: "thu",
      },
      {
        Header: "금",
        accessor: "fri",
      },
    ],
    []
  );

  const [data, setData] = useState([
    {
      time: "09:00-10:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "10:00-10:30",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "10:30-11:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "11:00-12:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "12:00-13:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "13:00-13:30",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "13:30-14:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "14:00-15:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "15:00-16:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "16:00-16:30",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "16:30-17:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
    {
      time: "17:00-18:00",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
    },
  ]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/timetable",
        data
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onDataChange = (rowIndex, columnId, value) => {
    setData((oldData) => {
      const newData = oldData.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, [columnId]: value };
        }
        return row;
      });
      return newData;
    });
  };

  return (
    <div className="table-all">
      <h4>
        <strong>시간표</strong>
      </h4>
      <br />
      <Table columns={columns} data={data} onDataChange={onDataChange} />
      <br />

      <button onClick={handleSave} className="table-button">
        시간표 저장
      </button>

      {/* 최종 목표:modal로 시간, 장소, 교수, 과목 받기 */}
    </div>
  );
};

export default TimeTable;
