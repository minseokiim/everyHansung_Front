import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";

const AdminShowPage = () => {
  const { studentId } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();

  //관리자 체크
  const nowId = localStorage.getItem("studentId");
  const isAdmin = nowId === "admin12";

  const getPost = (studentId) => {
    axios.get(`http://localhost:8080/auth/${studentId}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getPost(studentId);
  }, []);

  const rejectCertification = async (studentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/auth/${studentId}/certification/fail`,
        { imageFile: false }
      );
      alert("인증 요청 삭제 되었습니다");
      move("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCertification = async (studentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/auth/${studentId}/certification/success`,
        { certification: true }
      );
      alert("인증 처리 되었습니다");
      move("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      {isAdmin ? (
        <>
          <h5>
            <strong>
              {post.username} | {post.studentId}
            </strong>
            <hr />
          </h5>

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
        </>
      ) : (
        <div className="p-3">
          <h4>
            <RiAdminLine />
          </h4>
          <div>접근 권한이 없습니다.</div>
          <div className="grey pt-1">관리자만 접근 가능한 페이지 입니다.</div>
        </div>
      )}
    </div>
  );
};

export default AdminShowPage;
