//메인에서 보여지는 리스트 -> 최신꺼 하나만 보이게 하기
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../secretBoardPage/Board/SecretListPage.css";
import { AiOutlinePicture } from "react-icons/ai";
import apiClient from "../../../apiClient";

const Secretboard = () => {
  const move = useNavigate();
  const [posts, setPosts] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const [name, setName] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const getPosts = () => {
    axios.get("http://localhost:8080/secretboard/all").then((res) => {
      const sortedPosts = res.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    getPosts();
  }, [posts.length]);

  return (
    <div className="p-3">
      <div></div>

      {currentPosts.length > 0 ? (
        currentPosts
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
                  - 비밀게시판 &nbsp;
                  <span className="grey">
                    {post.title} {post.fileDir ? <AiOutlinePicture /> : ""}
                  </span>
                </div>
              </div>
            );
          })
      ) : (
        <>
          - 비밀게시판 &nbsp; <span className="grey">게시물이 없습니다</span>
        </>
      )}
    </div>
  );
};

export default Secretboard;
