import { useState } from "react";
import axios from "axios";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { AiOutlinePicture } from "react-icons/ai";
import { AiFillIdcard } from "react-icons/ai";
import apiClient from "../../../../apiClient";

const CardAuthentication = () => {
  const studentId = localStorage.getItem("studentId");
  const move = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await apiClient.post(
        `http://localhost:8080/member/${studentId}/uploadStudentCard`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the server response here
      console.log(response.data);
    } catch (error) {
      // Handle errors here
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div className="p-3">
      <strong>
        <AiFillIdcard />
        학생증
      </strong>
      <br />
      <div className=" cursor-pointer">
        <div className="grey">학생증을 스캔·촬영·캡처 후 첨부하여 인증</div>
        <hr />
        <input
          type="file"
          accept="file/*"
          onChange={handleImageChange}
          className="t-3"
          id="file-input"
        />
        <label htmlFor="file-input">파일 선택</label>

        {preview && (
          <div className="mt-3">
            <img src={preview} alt="preview" width="400" />
            <br /> <br />
            <button type="button" onClick={removeImage} className="button ml-3">
              파일 삭제
            </button>
          </div>
        )}
        <hr />
        <button type="button" onClick={handleSubmit} className=" button ">
          파일 제출
        </button>
      </div>
    </div>
  );
};

export default CardAuthentication;
