import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FreeBoardHeart = ({ id }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [countLike, setCountLike] = useState(0);

  const clickHeart = () => {
    if (!isFilled) {
      setIsFilled(true);
      setCountLike(countLike + 1);

      //좋아요 수 patch
      axios.patch(`http://localhost:8080/freeboard/${id}`, {
        countLike
      });
    } else {
      setIsFilled(false);
      setCountLike(countLike - 1);
    }
  };

  return (
    <div>
      {isFilled ? (
        <AiFillHeart
          className="cursor-pointer"
          onClick={clickHeart}
          style={{ color: "#c62917" }}
        />
      ) : (
        <AiOutlineHeart className="cursor-pointer" onClick={clickHeart} />
      )}
      <span>
        <strong> {countLike}</strong>
      </span>
    </div>
  );
};

export default FreeBoardHeart;
