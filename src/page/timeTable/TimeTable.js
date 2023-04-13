import React, { useState } from "react";
import Table from "./Table";
import Modal from "react-modal";
import axios from "axios";
import "./TimeTable.css";
// import SubjectInputPopup from "./SubjectInputPopup";

// Modal.setAppElement("#root");

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
  //   const [showModal, setShowModal] = useState(false);
  //   const [selectedCell, setSelectedCell] = useState({
  //     rowIndex: null,
  //     columnId: null,
  //   });

  //   const openModal = (rowIndex, columnId) => {
  //     setSelectedCell({ rowIndex, columnId });
  //     setShowModal(true);
  //   };

  //   const closeModal = () => {
  //     setShowModal(false);
  //   };

  //   const handleInput = (e) => {
  //     onDataChange(selectedCell.rowIndex, selectedCell.columnId, e.target.value);
  //   };

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

  //   const [popupInfo, setPopupInfo] = useState({
  //     isOpen: false,
  //     rowIndex: null,
  //     columnId: null,
  //   });

  //   const handleCellClick = (rowIndex, columnId) => {
  //     if (columnId !== "time") {
  //       setPopupInfo({ isOpen: true, rowIndex, columnId });
  //     }
  //   };

  //   const closePopup = () => {
  //     setPopupInfo({ isOpen: false, rowIndex: null, columnId: null });
  //   };

  return (
    <div>
      <h4>
        <strong>시간표</strong>
      </h4>
      <Table columns={columns} data={data} onDataChange={onDataChange} />
      <button onClick={handleSave} className="button">
        시간표 저장
      </button>
      {/* <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="과목 입력"
      >
        <h2>과목 입력</h2>
        <input type="text" onChange={handleInput} />
        <button onClick={closeModal}>확인</button>
      </Modal> */}
    </div>
  );
};

export default TimeTable;
