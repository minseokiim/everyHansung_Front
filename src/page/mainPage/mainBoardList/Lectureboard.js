import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Star from "./Star";
import { FaChalkboardTeacher } from "react-icons/fa";
import apiClient from "../../../apiClient";
import config from "../../../config";

const Lectureboard = () => {
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
        .get(`${config.API_BASE_URL}/member/${studentId}`)
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
    axios.get(`${config.API_BASE_URL}/lecture/all`).then((res) => {
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
    <div>
      <div>
        {currentPosts.length > 0 ? (
          currentPosts
            .sort((a, b) => b.id - a.id)
            .map((post) => {
              return (
                <div
                  key={post.id}
                  className="card-body cursor-pointer"
                  onClick={() => {
                    if (name) {
                      move(`/lectureboard/${post.id}`);
                    } else {
                      alert("로그인 해야 게시물 확인 가능합니다.");
                    }
                  }}
                >
                  <span>
                    강의평 &nbsp;
                    <span className="grey">
                      <FaChalkboardTeacher />
                      &nbsp; {post.lectureName}, {post.professor} 교수님 &nbsp;
                    </span>
                    {createArray(5).map((n, i) => (
                      <Star key={i} selected={post.selectedStars > i} />
                    ))}
                  </span>
                </div>
              );
            })
        ) : (
          <>
            <div
              className="card-body cursor-pointer"
              onClick={() => {
                if (name) {
                  move("/lectureboard");
                } else {
                  alert("로그인 해야 게시물 확인 가능합니다.");
                }
              }}
            >
              강의평 &nbsp;
              <span className="grey">강의평이 없습니다.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Lectureboard;
