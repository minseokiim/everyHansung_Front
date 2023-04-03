import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Star from "./Star";

const LectureShowPage = () => {
  const { lectureId } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const createArray = (length) => [...Array(length)];

  const getPost = (lectureId) => {
    axios.get(`http://localhost:8080/lectures/${lectureId}`)
    .then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(lectureId);
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex">
        <h4 className="flex-grow-1">
          {post.lectureName} &nbsp;, &nbsp;{post.professor} 교수님
        </h4>

        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              move("/lectureboard/list");
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>

      <hr />
      <p>
        <strong> 별점</strong>
        <br />
        {createArray(5).map((n, i) => (
          <Star key={i} selected={post.selectedStar > i} />
        ))}
        &nbsp;&nbsp;{post.selectedStar}/5
      </p>
      <p>
        <strong>학기</strong>
        <br />: {post.semester}
      </p>
      <p>
        <strong>과제 양</strong>
        <br />: {post.homework}
      </p>
      <p>
        <strong>성적 기준</strong>
        <br />: {post.score}
      </p>
      <p>
        <strong>시험 횟수</strong>
        <br />: {post.test}
      </p>
      <p>
        <strong>조 모임</strong>
        <br />: {post.team}
      </p>
      <p>
        <strong>총평</strong>
        <br />: {post.content}
      </p>
      <hr />
      <div className="important">** 강의평은 수정 및 삭제 불가능합니다.</div>
    </div>
  );
};
export default LectureShowPage;