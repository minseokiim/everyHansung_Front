import { useState } from "react";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import apiClient from "../../../../apiClient";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const CertificateAuthentication = () => {
  const studentId = localStorage.getItem("studentId");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const move = useNavigate();

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
      console.log(response.data);
      move("/auth/check");
    } catch (error) {
      console.error("파일 업로드 중 에러발생", error);
    }
  };

  return (
    <div className="p-3">
      <strong>재학 증명서</strong>
      <div className="cursor-pointer">
        <div className="grey">
          학교에서 공식적으로 발급한 재학 증명서를 제출 하여 인증
        </div>
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

export default CertificateAuthentication;
