import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsBook } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import apiClient from "../../apiClient";
import { SlOptionsVertical } from "react-icons/sl";

const BookListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); //페이지네이션
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");
  //const [saleState, setSaleState] = useState("");
  //const [imageFile, setImageFile] = useState("");
  const saleStates = ["판매중", "예약중", "판매완료"];

  useEffect(() => {
    if (studentId) {
      apiClient
        .get(`http://localhost:8080/member/${studentId}`)
        .then((res) => {
          const member = res.data;
          setName(member.username);
        })
        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }
  }, [studentId]);

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

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    filterPosts();
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.bookName.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase()) ||
        post.publisher.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const getPosts = async () => {
    const res = await axios.get("http://localhost:8080/book/all");
    const sortedPosts = res.data.sort((a, b) => b.id - a.id);
    setPosts(sortedPosts);
    filterPosts(sortedPosts);
    //console.log(res.data);
    //setSaleState(res.data.saleState);
    //setImageFile(res.data.imageFile); //이미지 테스트
  };

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  useEffect(() => {
    filterPosts();
  }, [posts]);

  const createSaleStateUpdater = (id, currentSaleState) => async () => {
    const currentIndex = saleStates.indexOf(currentSaleState);
    const nextIndex = (currentIndex + 1) % saleStates.length;
    const nextState = saleStates[nextIndex];

    try {
      await apiClient.patch(
        `http://localhost:8080/book/${id}?saleState=${nextState}`
      );
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              saleState: nextState,
            };
          } else {
            return post;
          }
        })
      );
    } catch (error) {
      alert("판매 상태 업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">책방</strong>
          {name && (
            <button
              className="m-2  write-button"
              onClick={() => {
                move("/bookstore/post");
              }}
            >
              작성하기
            </button>
          )}
        </div>
      </div>

      <hr />
      <div>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder="검색하고 싶은 수업명/교수님 성함/ 책 이름 입력하고 ENTER"
            className="form-control"
            value={search}
            onChange={onChangeSearch}
          />
        </form>
        <br />
        {currentPosts.length > 0
          ? currentPosts
              .sort((a, b) => b.id - a.id) //최신순
              .map((post) => {
                const updateSaleState = createSaleStateUpdater(
                  post.id,
                  post.saleState
                );

                return (
                  <div
                    key={post.id}
                    className=" card-body cursor-pointer"
                    onClick={() => {
                      if (name) {
                        move(`/bookstore/${post.id}`);
                      } else {
                        alert("로그인 해야 게시물 확인 가능합니다");
                      }
                    }}
                  >
                    <div>
                      <BsBook /> &nbsp;
                      {post.bookName}
                      {post.studentId === studentId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateSaleState();
                          }}
                          className="red-button float-right"
                        >
                          {post.saleState}
                        </button>
                      )}
                      <div>
                        {/* 미리보기 해결 남음 */}
                        {post.imageFile && (
                          <img
                            src={`data:image/png;base64,${post.imageFile}`}
                            alt="preview"
                            style={{ width: "100px", height: "auto" }}
                          />
                        )}
                      </div>
                      <hr />
                      <FaChalkboardTeacher /> &nbsp;
                      {post.lectureName}
                    </div>
                  </div>
                );
              })
          : "게시물이 없습니다."}
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
      </div>
    </div>
  );
};
export default BookListPage;
