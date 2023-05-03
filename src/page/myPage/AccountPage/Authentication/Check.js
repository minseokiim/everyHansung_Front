import { AiOutlineCheckCircle } from "react-icons/ai";

const Check = () => {
  return (
    <div className="p-5 m-5">
      <div className="table-all">
        <AiOutlineCheckCircle />
        <span className="p-2">
          <strong>첨부하신 사진을 검토중입니다.</strong>
        </span>
      </div>
    </div>
  );
};

export default Check;
