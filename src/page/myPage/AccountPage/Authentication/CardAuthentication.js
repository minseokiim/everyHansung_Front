import { useState } from "react";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { AiFillIdcard } from "react-icons/ai";
import apiClient from "../../../../apiClient";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

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
      move("/auth/check");
      console.log(response.data);
    } catch (error) {
      console.error("파일 업로드 중 에러발생", error);
    }
  };

  return (
    <div className="p-3">
      <AiFillIdcard />
      <strong className="p-1">학생증</strong>
      <br />
      <div className="cursor-pointer">
        <div className="grey">학생증을 스캔·촬영·캡처 후 첨부하여 인증</div>
        <hr />
        <input
          type="file"
          accept="file/*"
          onChange={handleImageChange}
          id="file-input"
        />
        <label htmlFor="file-input">
          <AiOutlinePaperClip className="icon" />
        </label>

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="preview"
              style={{ width: "300px", height: "auto" }}
            />
            <br /> <br />
            <BsFillTrashFill onClick={removeImage} className="icon ml-3" />
          </div>
        )}
        <hr />
        <button type="button" onClick={handleSubmit} className=" button ">
          제출
        </button>
      </div>
    </div>
  );
};

export default CardAuthentication;
