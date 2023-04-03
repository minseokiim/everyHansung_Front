import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const LectureListPage = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const onSearch = (e) => {
    if (e.key === "Enter") {
      //검색
      getPosts();
    }
  };

  const getPosts = () => {
    axios
      .get("http://localhost:8080/lectures")
      .then((res) => setPosts(res.data));
  };
  // const deletePost = (e, id) => {
  //   e.stopPropagation();
  //   alert("삭제하시겠습니까?");
  //   axios.delete(`http://localhost:3001/posts/${id}`).then(() =>
  //     setPosts((prevPosts) => {
  //       return prevPosts.filter((post) => {
  //         return post.id !== id;
  //       });
  //     })
  //   );
  // };

  //   let params={
  //     lectureName_like:searchText
  //   }
  //   axios
  //   .get(`http://localhost:3001/posts`, {
  //     params,
  //   })
  //   .then((res) => {  setPosts(res.data)});
  // };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">강의평</strong>
          <button
            className="m-2  write-button"
            onClick={() => {
              move("/lectureboard/post");
            }}
          >
            작성하기
          </button>
        </div>
      </div>

      <hr />
      <div className="m-4">
        <input
          type="text"
          placeholder="검색어 입력"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyUp={onSearch}
        />
        <br />
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="d-flex justify-content-between card-body cursor-pointer"
                  onClick={() => move(`/lectureboard/${post.id}`)}
                >
                  {post.lectureName}, {post.professor} 교수님
                  {/* <div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => deletePost(e, post.id)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              );
            })
          : "게시물이 없습니다."}
      </div>
    </div>
  );
};
export default LectureListPage;
