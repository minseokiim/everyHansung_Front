import { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useNavigate } from "react-router-dom";
import "./MessagePage.css";
import { BiTimeFive } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

const MyListPage = () => {
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  const getMessages = () => {
    apiClient
      .get(`http://localhost:8080/message/${studentId}/all`)
      .then((res) => {
        setMessages(res.data);
      });
  };

  //   백엔드랑 api다름, 백엔드는 나가기 기능으로 되어있음 ->둘중 하나 수정
  const deleteMessage = async (id) => {
    // try {
    //   await apiClient.delete(`http://localhost:8080/message/${id}`);
    //   alert("쪽지가 삭제되었습니다.");
    // } catch (error) {
    //   alert("쪽지 삭제에 실패했습니다.");
    // }
  };

  useEffect(() => {
    getMessages();
  }, []);

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
  return (
    <>
      <div className="p-4">
        <strong
          className="notimportant cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            move("/message");
          }}
        >
          받은 쪽지함
        </strong>
        &nbsp;&nbsp;
        <strong className="important-navy">보낸 쪽지함</strong>
        <hr />
        {messages.length > 0
          ? messages.map((message) => {
              return (
                <div key={message.id}>
                  {message.sender === studentId && (
                    <div className="card-body cursor-pointer">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0",
                        }}
                      >
                        {message.content}

                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <BsFillTrashFill
                            className="icon"
                            onClick={() => {
                              deleteMessage(message.id);
                            }}
                          />
                        </span>
                      </div>
                      <span className="grey">
                        <BiTimeFive /> {timeDifference(message.timestamp)}&nbsp;
                        &nbsp;
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          : "쪽지가 없습니다"}
      </div>
    </>
  );
};
export default MyListPage;
