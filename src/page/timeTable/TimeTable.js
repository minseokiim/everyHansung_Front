import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import apiClient from "../../apiClient";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("과목명을 입력해주세요."),
  day: Yup.string().required("요일을 선택해주세요."),
  startTime: Yup.string().required("시작 시간을 입력해주세요."),
  endTime: Yup.string().required("종료 시간을 입력해주세요."),
});

const TimeTable = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await apiClient.post(
        "https://localhost:3000/timetable",
        values
      );

      if (response.status === 200) {
        alert("입력 되었습니다.");
      } else {
        console.error("실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생", error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="p-3">
      <strong className="p-3">시간표 입력</strong>
      <hr />
      <Formik
        initialValues={{ subject: "", day: "", startTime: "", endTime: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="p-3">
            <label htmlFor="subject">*과목명: &nbsp; </label>
            <Field name="subject" type="text" className="comment-input" />
            {errors.subject && touched.subject ? (
              <div>{errors.subject}</div>
            ) : null}
            <br /> <br />
            <label htmlFor="day">*요일: &nbsp; </label>
            <Field name="day" as="select" className="comment-input">
              <option value="">선택하세요</option>
              <option value="mon">월요일</option>
              <option value="tue">화요일</option>
              <option value="wed">수요일</option>
              <option value="thu">목요일</option>
              <option value="fri">금요일</option>
            </Field>
            {errors.day && touched.day ? <div>{errors.day}</div> : null}
            <br /> <br />
            <label htmlFor="startTime">*시작 시간:&nbsp; </label>
            <Field name="startTime" type="time" className="comment-input" />
            {errors.startTime && touched.startTime ? (
              <div>{errors.startTime}</div>
            ) : null}
            <br /> <br />
            <label htmlFor="endTime">*종료 시간:&nbsp; </label>
            <Field name="endTime" type="time" className="comment-input" />
            {errors.endTime && touched.endTime ? (
              <div>{errors.endTime}</div>
            ) : null}
            <br /> <br />
            <button type="submit" disabled={isSubmitting} className="button">
              제출
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TimeTable;

// import React, { useState, useMemo } from "react";
// import Table from "./Table";
// import Modal from "react-modal";
// import axios from "axios";
// import "./TimeTable.css";

// const TimeTable = () => {
//   const columns = useMemo(
//     () => [
//       {
//         Header: "시간",
//         accessor: "time",
//       },
//       {
//         Header: "월",
//         accessor: "mon",
//       },
//       {
//         Header: "화",
//         accessor: "tue",
//       },
//       {
//         Header: "수",
//         accessor: "wed",
//       },
//       {
//         Header: "목",
//         accessor: "thu",
//       },
//       {
//         Header: "금",
//         accessor: "fri",
//       },
//     ],
//     []
//   );

//   const [data, setData] = useState([
//     {
//       time: "09:00-10:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "10:00-10:30",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "10:30-11:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "11:00-12:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "12:00-13:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "13:00-13:30",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "13:30-14:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "14:00-15:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "15:00-16:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "16:00-16:30",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "16:30-17:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//     {
//       time: "17:00-18:00",
//       mon: "",
//       tue: "",
//       wed: "",
//       thu: "",
//       fri: "",
//     },
//   ]);

//   const handleSave = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/timetable",
//         data
//       );
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onDataChange = (rowIndex, columnId, value) => {
//     setData((oldData) => {
//       const newData = oldData.map((row, index) => {
//         if (index === rowIndex) {
//           return { ...row, [columnId]: value };
//         }
//         return row;
//       });
//       return newData;
//     });
//   };

//   return (
//     <div className="table-all">
//       <h4>
//         <strong>시간표</strong>
//       </h4>
//       <br />
//       <Table columns={columns} data={data} onDataChange={onDataChange} />
//       <br />

//       <button onClick={handleSave} className="table-button">
//         시간표 저장
//       </button>

//       {/* 최종 목표:modal로 시간, 장소, 교수, 과목 받기 */}
//     </div>
//   );
// };

// export default TimeTable;
