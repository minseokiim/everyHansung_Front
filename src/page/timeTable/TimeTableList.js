import { BsFillTrashFill } from "react-icons/bs";
import "./TimeTableList.css";

const TimeTableList = ({ timeTableData, deleteTimeTableItem, formatTime }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <strong>과목</strong>
          </th>
          <th>
            <strong>교수</strong>
          </th>
          <th>
            <strong>강의실</strong>
          </th>
          <th>
            <strong>요일</strong>
          </th>
          <th>
            <strong>시작</strong>
          </th>
          <th>
            <strong>종료</strong>
          </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {timeTableData.map((item, index) => (
          <tr key={index}>
            <td>{item.subject}</td>
            <td>{item.professor}</td>
            <td>{item.room}</td>
            <td>{item.day}</td>
            <td>{formatTime(item.startTime)}</td>
            <td>{formatTime(item.endTime)}</td>
            <td>
              <BsFillTrashFill
                className="icon cursor-pointer"
                onClick={() => {
                  if (window.confirm("이 수업을 삭제하시겠습니까?")) {
                    deleteTimeTableItem(item.id);
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTableList;
