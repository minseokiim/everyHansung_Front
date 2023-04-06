import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

import { BsCardChecklist, BsBook } from "react-icons/bs";

const BookShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();

  const getPost = (id) => {
    axios.get(`http://localhost:8080/bookstore/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex">
        <h4 className="flex-grow-1">
          <h5>
            <FaChalkboardTeacher /> &nbsp;
            {post.lectureName}
          </h5>
          &nbsp; &nbsp;
          <strong>{post.bookName}</strong>&nbsp;/&nbsp;{post.author}
          &nbsp;/&nbsp;
          {post.publisher}
        </h4>
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              move("/bookstore/list");
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
      <hr />
      <strong>
        <BsCardChecklist />
        &nbsp; 책을 구매한 학기
      </strong>
      <br />: {post.semester}
      <br /> <br />
      <strong>
        <BsCardChecklist />
        &nbsp; 필기 흔적
      </strong>
      <br />: {post.writing}
      <br /> <br />
      <strong>
        <BsCardChecklist />
        &nbsp; 책 상태
      </strong>
      <br />: {post.state}
      <br /> <br />
      <strong>
        <BsCardChecklist />
        &nbsp; 책 훼손
      </strong>
      <br />: {post.broken}
      <br /> <br />
      <strong>
        <BsCardChecklist />
        &nbsp; 총평
      </strong>
      <br />: {post.content}
      <hr />
      <div className="important">** 책방은 수정 및 삭제 불가능합니다.</div>
    </div>
  );
};
export default BookShowPage;
