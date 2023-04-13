// // SubjectInputPopup.js
// import React, { useState } from "react";
// import axios from "axios";

// const SubjectInputPopup = ({ rowIndex, columnId, onSave, onClose }) => {
//   const [subject, setSubject] = useState("");

//   const handleChange = (e) => {
//     setSubject(e.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       // 여기에 API URL을 입력하세요.
//       const API_URL = "https://your-api-url.com/save-subject";
//       await axios.post(API_URL, { rowIndex, columnId, subject });
//       onSave(rowIndex, columnId, subject);
//       onClose();
//     } catch (error) {
//       console.error("Error saving subject:", error);
//     }
//   };

//   return (
//     <div className="popup">
//       <div className="popup-inner">
//         <h3>과목 입력</h3>
//         <input type="text" value={subject} onChange={handleChange} />
//         <button onClick={handleSubmit}>저장</button>
//         <button onClick={onClose}>취소</button>
//       </div>
//     </div>
//   );
// };

// export default SubjectInputPopup;
