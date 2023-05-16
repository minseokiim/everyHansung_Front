import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Star from "./Star";
import { BsCardChecklist } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../apiClient";
import { BsFillPersonFill, BsFillTrashFill } from "react-icons/bs";

const LectureShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const createArray = (length) => [...Array(length)];
  const studentId = localStorage.getItem("studentId");
  const [nickname, setNickname] = useState("");
  const isAdmin = studentId === "admin";

  const getPost = (id) => {
    axios.get(`http://localhost:8080/lecture/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setNickname(member.nickname);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    } else {
      console.log("닉네임 못받아옴");
    }
  }, [studentId]);

  const deletePost = async (id) => {
    try {
      await apiClient.delete(`http://localhost:8080/lecture/${id}`);
      alert("게시물이 삭제되었습니다.");
      move("/lectureboard");
    } catch (error) {
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="p-4">
      {nickname && (
        <>
          <div className="d-flex">
            <h4 className="flex-grow-1">
              <FaChalkboardTeacher />
              &nbsp;{post.lectureName} &nbsp;, &nbsp;{post.professor} 교수님
            </h4>
            {isAdmin && (
              <div>
                <span className="p-2">
                  <BsFillTrashFill
                    className="cursor-pointer icon"
                    onClick={() => {
                      if (window.confirm("게시물을 삭제하시겠습니까?")) {
                        deletePost(id);
                      }
                    }}
                  />
                </span>
              </div>
            )}

            {!isAdmin && (
              <div>
                <button
                  className="button"
                  onClick={(e) => {
                    e.preventDefault();
                    move("/lectureboard");
                  }}
                >
                  뒤로 가기
                </button>
              </div>
            )}
          </div>

          <hr />
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 별점
            </strong>
            <br />
            {createArray(5).map((n, i) => (
              <Star key={i} selected={post.selectedStars > i} />
            ))}
            &nbsp;&nbsp;{post.selectedStars}/5
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 학기
            </strong>
            <br />: {post.semester}
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 과제 양
            </strong>
            <br />: {post.homework}
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 성적 기준
            </strong>
            <br />: {post.score}
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 시험 횟수
            </strong>
            <br />: {post.test}
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 조 모임
            </strong>
            <br />: {post.team}
          </p>
          <p>
            <strong>
              <BsCardChecklist />
              &nbsp; 총평
            </strong>
            <br />: {post.content}
          </p>
          <hr />
          <div className="important">
            ** 강의평은 수정 및 삭제 불가능합니다.
          </div>
        </>
      )}
    </div>
  );
};
export default LectureShowPage;
