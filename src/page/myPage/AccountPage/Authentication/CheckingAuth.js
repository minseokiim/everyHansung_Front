import apiClient from "../../../../apiClient";
import { useState, useEffect } from "react";

const CheckingAuth = () => {
  //사진 검사해서 통과하면 (백엔드에서 1 보내주면)->Success.js
  const [auth, setAuth] = useState("");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}/uploadStudentCard`)
        .then((res) => {
          //res.data받아서 값 저장
          auth = res.data;
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

  return <div></div>;
};

export default CheckingAuth;
