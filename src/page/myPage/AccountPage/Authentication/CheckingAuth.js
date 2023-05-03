import apiClient from "../../../../apiClient";
import { useState, useEffect } from "react";

const CheckingAuth = () => {
  const [auth, setAuth] = useState("");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}/uploadStudentCard`)
        .then((res) => {
          auth = res.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [studentId]);

  return <div></div>;
};

export default CheckingAuth;
