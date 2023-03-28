import { useEffect, useState, useCallback } from "react";
import "./FreeCommentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FreeCommentListPage = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getComments = () => {
    axios
      .get(`http://localhost:8080/freeposts/${id}/freecomments`)
      .then((res) => setComments(res.data));
  };

  useEffect(() => {
    getComments();
  }, []);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const deleteComment = (e, commentId) => {
    alert("삭제하시겠습니까?");
    e.stopPropagation();

    // axios
    //   .delete(`http://localhost:8080/freeposts/${id}/freecomments/${commentId}`)
    //   //이걸 쓰면 저 id의 post가 지워짐
    //   .then(() =>
    //     setComments((prev) => {
    //       return prev.filter((comment) => {
    //         return comment.id !== commentId;
    //       });
    //     })
    //   );
  };

  return (
    <div>
      {comments.length > 0 ? (
        comments
          .filter((comment) => comment.commentContent !== 0)
          .map((comment) => {
            return (
              <div className="comment-box" key={comment.id}>
                익명1:{comment.commentContent}
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
