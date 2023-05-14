import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminShowPage = () => {
  const { studentId } = useParams();
  const [post, setPost] = useState([]);

  const getPost = (studentId) => {
    axios.get(`http://localhost:8080/auth/${studentId}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getPost(studentId);
  }, []);

  //인증 거절 버튼
  const rejectCertification = async (studentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/auth/${studentId}/certification/fail`,
        { imageFile: false }
      );
      alert("인증 요청 삭제 되었습니다");
    } catch (error) {
      console.error(error);
    }
  };

  //인증 수락 버튼
  const handleCertification = async (studentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/auth/${studentId}/certification/success`,
        { certification: true }
      );
      alert("인증 처리 되었습니다");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h5>
        <strong>
          {post.username} | {post.studentId}
        </strong>
        <hr />
      </h5>

      {/* 사진 보여주기 */}
      <br />
      {post.imageFile && (
        <div className="mt-3">
          <img
            src={`data:image/png;base64,${post.imageFile}`}
            alt="preview"
            style={{ width: "400px", height: "auto" }}
          />
        </div>
      )}
      <button
        className="red-button"
        onClick={() => {
          if (window.confirm("인증 거절 하시겠습니까?")) {
            rejectCertification(post.studentId);
          }
        }}
      >
        인증 거절
      </button>

      <button
        className="button"
        onClick={() => {
          if (window.confirm("인증 처리 하시겠습니까?")) {
            handleCertification(post.studentId);
          }
        }}
      >
        인증 확인
      </button>
    </div>
  );
};

export default AdminShowPage;
