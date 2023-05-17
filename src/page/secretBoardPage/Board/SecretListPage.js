import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../secretBoardPage/Board/SecretListPage.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import apiClient from "../../../apiClient";
import { BsFillPersonFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";

const SecretListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  //게시물 검색
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  //작성 버튼 활성화
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");

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
    axios.get("http://localhost:8080/secretboard/all").then((res) => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    filterPosts();
  };

  const timeDifference = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const days = Math.floor(diffInSeconds / 86400);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  const filterPosts = () => {
    const filtered = posts.filter(
      (post) =>
        post.title &&
        post.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">비밀게시판</strong>

          {name && (
            <button
              className="m-2  write-button"
              onClick={() => {
                move("/secretboard/post");
              }}
            >
              작성하기
            </button>
          )}
        </div>
      </div>
      <hr />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="검색어 입력하고 ENTER!"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </form>
      <br />
      {currentPosts.length > 0
        ? currentPosts
            .filter((post) => post.title !== 0)
            .sort((a, b) => b.id - a.id)
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className=" card-body cursor-pointer"
                  onClick={() => {
                    if (name) {
                      move(`/secretboard/${post.id}`);
                    } else {
                      alert("로그인 해야 게시물 확인 가능합니다");
                    }
                  }}
                >
                  <div>
                    {post.title.length > 10
                      ? `${post.title.substring(0, 10)}...`
                      : post.title}
                    <span className="p-1">
                      {post.fileDir ? <AiOutlinePicture /> : ""}
                    </span>
                    <br />
                    <div className="grey">
                      {post.content.slice(0, 80)}
                      {post.content.length > 80 ? "..." : ""}
                      <br />
                      <div className="grey ">
                        <BiTimeFive />
                        &nbsp;
                        {timeDifference(post.createdAt)}&nbsp; &nbsp;
                        <span className="black">
                          <BsFillPersonFill />
                          &nbsp;
                          {post.anonymous ? "익명" : post.nickname}
                          <span className="heart-icon-container ">
                            <AiOutlineHeart style={{ color: "#c62917" }} />
                            {post.countLike} &nbsp;
                            <span className="heart-icon-container">
                              <AiOutlineComment />
                              {post.countComment}
                            </span>
                            &nbsp;
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        : "게시물이 없습니다"}
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
  );
};

export default SecretListPage;
