import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SecretCommentListPage from "../Comment/SecretCommentListPage";
import SecretCommentWritePage from "../Comment/SecretCommentWritePage";
import "../../freeBoardPage/Comment/FreeCommentPage.css";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import apiClient from "../../../apiClient";

const SecretShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  // const [postNick, setPostNick] = useState("");
  const move = useNavigate();

  const getPost = (id) => {
    axios.get(`http://localhost:8080/secretposts/${id}`).then((res) => {
      setPost(res.data);

      // //isAnonymous 체크여부에 따라 게시물 작성자 바뀜
      // if (res.data.isAnonymous === true) {
      //   setPostNick("익명");
      //   console.log("익명", postNick);
      // } else if (res.data.isAnonymous === false) {
      //   setPostNick(res.data.studentId);
      //   console.log("실명", postNick);
      // }
    });
  };

  useEffect(() => {
    getPost(id);
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4">
      <div className="d-flex">
        <h4 className="flex-grow-1">{post.title}</h4>
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              move(`/secretboard/edit/${id}`);
            }}
          >
            수정하기
          </button>
        </div>
      </div>
      <div className="text-muted post-time">
        작성일: {printDate(post.createdAt)}
      </div>
      <div className="text-muted post-time">
        작성자: {post.isAnonymous ? "익명" : post.studentId}
      </div>
      <hr />
      <p>{post.content}</p>
      <br />
      <AiOutlineHeart /> <strong>공감</strong>
      <hr />
      <AiOutlineComment />
      <strong>댓글</strong>
      <br />
      <div className="comment">
        <SecretCommentListPage />
        <SecretCommentWritePage />
      </div>
    </div>
  );
};
export default SecretShowPage;
