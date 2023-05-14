import axios from "axios";
import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  //멤버 이름 검색
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  //작성 버튼 활성화
  const studentId = localStorage.getItem("studentId");
  const isAdmin = studentId === "admin12";

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

  const getPosts = () => {
    axios.get("http://localhost:8080/auth/all").then((res) => {
      const sortedPosts = res.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  useEffect(() => {
    filterPosts();
  }, [posts]);

  const handleSearch = (e) => {
    e.preventDefault();
    filterPosts();
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) => post.studentId && !post.certification && post.file
    );
    setFilteredPosts(filtered);
  };

  const handleCertification = async (studentId) => {
    try {
      await axios.patch(
        `http://localhost:8080/auth/${studentId}/certification`,
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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="검색하고 싶은 이름 입력하고 ENTER!"
              className="form-control"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </form>
          <br />
          {currentPosts.length > 0 ? (
            currentPosts
              .sort((a, b) => b.id - a.id)
              .map((post) => {
                return (
                  <>
                    <div
                      key={post.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {post.studentId} | {post.username} | {post.email}
                      </div>
                      <button
                        className="red-button"
                        onClick={() => handleCertification(post.studentId)}
                      >
                        {post.certification ? "인증 완료" : "인증 확인"}
                      </button>
                    </div>
                    <hr />
                  </>
                );
              })
          ) : (
            <>
              모두 인증 완료 되었습니다.
              <br />
            </>
          )}
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
        <div>
          <h1>접근 권한이 없습니다.</h1>
        </div>
      )}
    </div>
  );
};
export default AdminPage;
