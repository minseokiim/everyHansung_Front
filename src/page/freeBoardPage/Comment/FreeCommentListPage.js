import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../../apiClient";

const FreeCommentListPage = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const studentId = localStorage.getItem("studentId"); //학번 정보 받아오기

  const getComments = () => {
    //해당 게시물의 댓글 받아오기
    apiClient
      .get(`http://localhost:8080/comment/freeboard/${id}`)
      .then((res) => setComments(res.data));
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteComment = (e, commentId) => {
    alert("삭제하시겠습니까?");
    e.stopPropagation();

    //apiClient.delete 해서 댓글 정보 삭제하기
    // apiClient.delete()
  };

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      {comments.length > 0 ? (
        comments
          .filter((comment) => comment.commentContent !== 0)
          .map((comment) => {
            return (
              <div className="comment-box" key={comment.id}>
                {comment.commentIsAnonymous ? "익명" : comment.nickname} :
                {comment.commentContent}
                <div className="comment-time">
                  {printDate(comment.commentCreatedAt)}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deleteComment(e, comment.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })
      ) : (
        <div className="no-comment">
          해당 게시물에는 댓글이 없습니다
          <br /> <br />
        </div>
      )}
    </div>
  );
};

export default FreeCommentListPage;
