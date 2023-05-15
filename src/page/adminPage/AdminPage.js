import axios from "axios";
import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";
import apiClient from "../../apiClient";

const AdminPage = () => {
  const move = useNavigate();

  const [posts, setPosts] = useState([]);

  //멤버 이름 검색
  const [filteredPosts, setFilteredPosts] = useState([]);

  //관리자 체크
  const studentId = localStorage.getItem("studentId");
  const isAdmin = studentId === "admin";

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const totalPages = () => {
    return Math.ceil(filteredPosts.length / postsPerPage);
  };
  const nextPage = () => {
    if (currentPage < totalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setModalShow(false);
  const handleShow = (image) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  const getPosts = () => {
    axios.get("http://localhost:8080/auth/all").then((res) => {
      const sortedPosts = res.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  useEffect(() => {
    filterPosts();
  }, [posts]);

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) => post.studentId && !post.certification && post.file
    );
    setFilteredPosts(filtered);
  };

  const rejectCertification = async (studentId) => {
    try {
      await apiClient.patch(
        `http://localhost:8080/auth/${studentId}/certification/fail`,
        { imageFile: false }
      );
      alert("인증 요청 삭제 되었습니다");
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCertification = async (studentId) => {
    try {
      await apiClient.patch(
        `http://localhost:8080/auth/${studentId}/certification/success`,
        { certification: true }
      );
      alert("인증 처리 되었습니다");
      getPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      {isAdmin ? (
        <>
          <div>
            <div className="d-flex justify-content-between">
              <strong className="p-3">인증 필요한 회원</strong>
            </div>
          </div>
          <hr />
          <br />
          {currentPosts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <strong>학번</strong>
                  </th>
                  <th>
                    <strong>이름</strong>
                  </th>
                  <th>
                    <strong>이메일</strong>
                  </th>
                  <th>
                    <strong>첨부 자료</strong>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentPosts
                  .sort((a, b) => b.id - a.id)
                  .map((post) => (
                    <tr key={post.id}>
                      <td>{post.studentId}</td>
                      <td>{post.username}</td>
                      <td>{post.email}</td>
                      <td>
                        {post.imageFile && (
                          <img
                            src={`data:image/png;base64,${post.imageFile}`}
                            alt="preview"
                            style={{ width: "50px", height: "auto" }}
                            onClick={() =>
                              handleShow(
                                `data:image/png;base64,${post.imageFile}`
                              )
                            }
                          />
                        )}
                      </td>
                      <td>
                        <button
                          className="red-button"
                          onClick={() => {
                            if (window.confirm("인증 거절 하시겠습니까?")) {
                              rejectCertification(post.studentId);
                            }
                          }}
                        >
                          인증 거절
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            if (window.confirm("인증 처리 하시겠습니까?")) {
                              handleCertification(post.studentId);
                            }
                          }}
                        >
                          인증 확인
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <>
              모두 인증 완료 되었습니다.
              <br />
            </>
          )}

          <Modal show={modalShow} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>첨부 자료</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%" }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <br />
          <div className="pagination">
            <div className="pagination-container">
              <MdNavigateBefore
                className="cursor-pointer"
                onClick={prevPage}
                disabled={currentPage === 1}
              />
              <span className="grey">
                {currentPage} / {totalPages()}
              </span>
              <MdNavigateNext
                className="cursor-pointer"
                onClick={nextPage}
                disabled={currentPage === totalPages()}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="p-3">
          <h4>
            <RiAdminLine />
          </h4>
          <div>접근 권한이 없습니다.</div>
          <div className="grey pt-1">관리자만 접근 가능한 페이지 입니다.</div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
