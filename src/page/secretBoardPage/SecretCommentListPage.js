import { useEffect, useState, useCallback } from "react";
import "../freeBoardPage/FreeCommentPage.css";
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

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      {comments.length > 0
        ? comments
            .filter((comment) => comment.commentContent !== 0)
            .map((comment) => {
              return (
                <div className="comment-box" key={comment.id}>
                  익명:{comment.commentContent}
                  <div className="comment-time">
                    {printDate(comment.commentCreatedAt)}
                  </div>
                </div>
              );
            })
        : "댓글이 없습니다"}
    </div>
  );
};

export default SecretCommentListPage;
