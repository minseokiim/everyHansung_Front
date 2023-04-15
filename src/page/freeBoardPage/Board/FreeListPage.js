import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../secretBoardPage/Board/SecretListPage.css";

const FreeListPage = () => {
  // const studentId = useSelector((state) => state.auth.studentId);

  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:8080/freeboard/all").then((res) => {
      setPosts(res.data);
      //setFilteredPosts(res.data);
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

  const filterPosts = () => {
    const filtered = posts.filter((post) =>
      post.title && post.title.toLowerCase().includes(searchText.toLowerCase())
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
      {filteredPosts.length > 0
        ? filteredPosts
            .filter((post) => post.title !== 0)
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className="d-flex justify-content-between card-body cursor-pointer"
                  onClick={() => move(`/freeboard/${post.id}`)}
                >
                  {post.title}

                  <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => deletePost(e, post.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })
        : "게시물이 없습니다"}
    </div>
  );
};
export default FreeListPage;
