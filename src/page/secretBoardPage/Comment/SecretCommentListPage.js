import { useEffect, useState, useCallback } from "react";
import "./SecretCommentPage.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SecretCommentListPage = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getComments = () => {
    axios
      .get(`http://localhost:8080/secretposts/${id}/secretcomments`)
      .then((res) => setComments(res.data));
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteComment = (e, commentId) => {
    alert("삭제하시겠습니까?");
    e.stopPropagation();
    //apiClient.delete의 api추가
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

export default SecretCommentListPage;
