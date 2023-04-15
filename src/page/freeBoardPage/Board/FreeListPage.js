import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../secretBoardPage/Board/SecretListPage.css";
import { BsFillTrashFill } from "react-icons/bs";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const FreeListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
    axios.get("http://localhost:8080/freeboard/all").then((res) => {
      setPosts(res.data);
    });
  };

  const deletePost = (e, id) => {
    alert("삭제하시겠습니까?");
    e.stopPropagation();
    axios.delete(`http://localhost:8080/freeboard/${id}`).then(() =>
      setPosts((prevPosts) => {
        return prevPosts.filter((post) => {
          return post.id !== id;
        });
      })
    );
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
          <strong className="p-3">자유게시판</strong>
          <button
            className="m-2  write-button"
            onClick={() => {
              move("/freeboard/post");
            }}
          >
            작성하기
          </button>
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
                  className="d-flex justify-content-between card-body cursor-pointer"
                  onClick={() => move(`/freeboard/${post.id}`)}
                >
                  <div>
                    {post.title}
                    <br />
                    <div className="grey">
                      {post.content}
                      <br />
                      {timeDifference(post.createdAt)}&nbsp;
                      <span className="black">
                        {post.isAnonymous ? "익명" : post.studentId}
                      </span>
                    </div>
                  </div>
                  <div>
                    <BsFillTrashFill onClick={(e) => deletePost(e, post.id)} />
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
export default FreeListPage;
