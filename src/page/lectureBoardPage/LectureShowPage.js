import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Star from "./Star";

const LectureShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const createArray = (length) => [...Array(length)];

  const getPost = (id) => {
    axios.get(`http://localhost:8080/lectures/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  return (
    <div className="p-3">
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
        *별점 <br />
        {createArray(5).map((n, i) => (
          <Star key={i} selected={post.selectedStar > i} />
        ))}
        &nbsp;&nbsp;{post.selectedStar}/5
      </p>
      <p>
        *학기
        <br />
        {post.semester}
      </p>
      <p>
        *과제 양<br />
        {post.homework}
      </p>
      <p>
        *성적 기준
        <br />
        {post.score}
      </p>
      <p>
        *시험 횟수
        <br />
        {post.test}
      </p>
      <p>
        *조 모임
        <br />
        {post.team}
      </p>
      <p>
        *총평
        <br />
        {post.content}
      </p>
      <hr />
      <div className="important">** 강의평은 수정 및 삭제 불가능합니다.</div>
    </div>
  );
};
export default LectureShowPage;
