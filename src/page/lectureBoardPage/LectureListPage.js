import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Star from "./Star";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../apiClient";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const LectureListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const createArray = (length) => [...Array(length)];
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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

  const onSearch = (e) => {
    if (e.key === "Enter") {
      filterPosts();
    }
  };

  const getPosts = () => {
    axios.get("http://localhost:8080/lecture/all").then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
    });
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.lectureName.toLowerCase().includes(searchText.toLowerCase()) ||
        post.professor.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">강의평</strong>
          {name && (
            <button
              className="m-2  write-button"
              onClick={() => {
                move("/lectureboard/post");
              }}
            >
              작성하기
            </button>
          )}
        </div>
      </div>

      <hr />
      <div>
        <input
          type="text"
          placeholder="검색하고 싶은 수업명/교수님 성함 입력하고 ENTER"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            filterPosts();
          }}
          onKeyUp={onSearch}
        />
        <br />

        {currentPosts.length > 0
          ? currentPosts
              .sort((a, b) => b.id - a.id) //최신순
              .map((post) => {
                return (
                  <div
                    key={post.id}
                    className=" card-body cursor-pointer"
                    onClick={() => {
                      if (name) {
                        move(`/lectureboard/${post.id}`);
                      } else {
                        alert("로그인 해야 게시물 확인 가능합니다");
                      }
                    }}
                  >
                    <div>
                      {createArray(5).map((n, i) => (
                        <Star key={i} selected={post.selectedStars > i} />
                      ))}
                      <hr />
                    </div>
                    <div>
                      <FaChalkboardTeacher />
                      &nbsp; {post.lectureName}, {post.professor} 교수님
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
export default LectureListPage;
