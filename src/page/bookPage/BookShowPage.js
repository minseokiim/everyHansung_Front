import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsCardChecklist, BsBook } from "react-icons/bs";
import apiClient from "../../apiClient";
import SendMessagePage from "../messagePage/SendMessagePage";
import { BiMessage } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";

const BookShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const move = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  //const receiver=post.id;
  const studentId = localStorage.getItem("studentId");

  const getPost = (id) => {
    apiClient.get(`http://localhost:8080/book/${id}`).then((res) => {
      setPost(res.data);
    });
  };

  const deletePost = async (id) => {
    try {
      await apiClient.delete(`http://localhost:8080/book/${id}`);
      alert("게시물이 삭제되었습니다.");
      move("/bookstore");
    } catch (error) {
      alert("게시물 삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    getPost(id);
  }, []);

  return (
    <div className="p-4">
      {studentId && (
        <>
          <div className="d-flex">
            <div className="flex-grow-1">
              <h5>
                <FaChalkboardTeacher /> &nbsp;
                {post.lectureName}
              </h5>
              &nbsp; &nbsp;
              <strong>{post.bookName}</strong>&nbsp;/&nbsp;{post.author}
              &nbsp;/&nbsp;
              {post.publisher}
            </div>

            {post.studentId === studentId && (
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

            {post.studentId !== studentId && (
              <>
                <div>
                  <BiMessage
                    className="cursor-pointer"
                    onClick={() => {
                      setIsMessageModalOpen(true);
                    }}
                  />
                  <SendMessagePage
                    isOpen={isMessageModalOpen}
                    onRequestClose={() => setIsMessageModalOpen(false)}
                  />
                </div>
              </>
            )}
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
            &nbsp; 책 사진
          </strong>
          <br />:
          {post.imageFile && (
            <div className="mt-3">
              <img
                src={`data:image/png;base64,${post.imageFile}`}
                alt="preview"
                style={{ width: "400px", height: "auto" }}
              />
            </div>
          )}
          <br /> <br />
          <strong>
            <BsCardChecklist />
            &nbsp; 총평
          </strong>
          <br />: {post.content}
          <br />
          <br />
          <div className="grey">
            ** 책 구매를 원하면 쪽지 기능을 활용하세요!
          </div>
        </>
      )}
    </div>
  );
};
export default BookShowPage;
