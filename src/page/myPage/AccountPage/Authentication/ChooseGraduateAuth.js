import { useState } from "react";
import "../../../signupPage/SignUpPage.css";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import apiClient from "../../../../apiClient";
import { TbCertificate } from "react-icons/tb";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const ChooseGraduateAuth = () => {
  const studentId = localStorage.getItem("studentId");
  const move = useNavigate();

  const [imageFile, setImageFile] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const removeImage = () => {
    setImageFile("");
    setPreviewImage("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setImageFile("");
      setPreviewImage("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;

    if (!imageFile) {
      alert("사진 첨부 후 다시 눌러주세요");
      return;
    }

    try {
      if (imageFile) {
        base64Image = await toBase64(imageFile);
      }

      const data = {
        imageFile: base64Image,
      };

      await apiClient
        .post(
          `http://localhost:8080/member/${studentId}/uploadStudentCard`,
          data
        )
        .then(() => {
          move("/auth/check");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="p-3">
      <TbCertificate />
      <strong className="p-1">졸업 증명서</strong>
      <div className="cursor-pointer">
        <div className="grey">
          학교에서 공식적으로 발급한 졸업 증명서를 제출 하여 인증
        </div>
        <hr />
        <div className="mb-3">
          <label htmlFor="imageFile" className="d-inline-block">
            <AiOutlinePaperClip
              className="icon"
              style={{ cursor: "pointer" }}
              size={24}
            />
          </label>
          <input
            type="file"
            id="imageFile"
            onChange={onImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          {imageFile && (
            <BsFillTrashFill
              onClick={removeImage}
              style={{ cursor: "pointer", marginLeft: "10px" }}
              size={20}
              className="icon"
            />
          )}

          {imageFile && !previewImage && (
            <div className="mt-3">
              <img
                src={`data:image/png;base64,${imageFile}`}
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
          {imageFile && previewImage && (
            <div>
              <img
                src={previewImage}
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
          <span className="grey">사진은 한장만 선택 가능합니다.</span>
        </div>
        <button className="button" type="submit" onClick={onSubmit}>
          제출
        </button>
      </div>
    </form>
  );
};

export default ChooseGraduateAuth;
