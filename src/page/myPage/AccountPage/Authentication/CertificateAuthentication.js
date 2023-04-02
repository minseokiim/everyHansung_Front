import { useState } from "react";
import axios from "axios";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const CertificateAuthentication = () => {
  const move = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/certificate",
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
      console.error("Error uploading the image:", error);
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
          accept="image/*"
          onChange={handleImageChange}
          className="mt-3"
        />
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

export default CertificateAuthentication;
