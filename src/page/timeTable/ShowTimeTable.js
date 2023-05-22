import { useState, useEffect } from "react";
import apiClient from "../../apiClient";
import { useNavigate } from "react-router-dom";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import TimeTableList from "./TimeTableList";
import moment from "moment";
import "./TimeTableList.css";
import config from "../../config";

const ShowTimeTable = () => {
  const [timeTableData, setTimeTableData] = useState([]);
  const move = useNavigate();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchTimeTableData = async () => {
      try {
        const response = await apiClient.get(
          `${config.API_BASE_URL}/time/${studentId}`
        );
        if (response.status === 200) {
          setTimeTableData(response.data);
        } else {
          console.error("데이터를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생", error);
      }
    };

    fetchTimeTableData();
  }, []);

  const dayToNumber = (day) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days.indexOf(day);
  };

  const sortByDayAndTime = (data) => {
    return data.sort((a, b) => {
      if (dayToNumber(a.day) === dayToNumber(b.day)) {
        return new Date(a.startTime) - new Date(b.startTime);
      }
      return dayToNumber(a.day) - dayToNumber(b.day);
    });
  };

  const deleteTimeTableItem = async (id) => {
    try {
      const response = await apiClient.delete(
        `${config.API_BASE_URL}/time/${id}`
      );

      if (response.status === 200) {
        setTimeTableData(timeTableData.filter((item) => item.id !== id));
      } else {
        console.error("시간표 항목을 삭제하는데 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생", error);
    }
  };

  const sortedTimeTableData = sortByDayAndTime(timeTableData);

  const formatTime = (time) => {
    return moment(time).format("hh:mm A");
  };

  const config = {
    viewType: "Week",
    // onTimeRangeSelected: async (args) => {
    //   // handle time range selection
    // },
    // onEventClick: async (args) => {
    //   // handle event click
    // },
    headerDateFormat: "dddd",
    cellDuration: 60,
    cellWidth: 150,
    timeHeaders: [
      { groupBy: "Day", format: "dddd" },
      { groupBy: "Hour", format: "h tt" },
    ],
    businessBeginsHour: 9,
    businessEndsHour: 22,
    days: moment.weekdays().slice(1, 6), //월요일부터 금요일까지
    scrollTo: "09:00",
  };

  const colors = ["#82c1dc", "#eda5a5", "#9dbc72", "#fffac8", "#949494"];

  const events = timeTableData.map((item, index) => {
    const startDate = moment(item.startTime);
    const endDate = moment(item.endTime);

    const startDay = moment()
      .startOf("week")
      .add(1, "days")
      .add(dayToNumber(item.day), "days");

    const startDateWithDay = startDay
      .clone()
      .hours(startDate.hours())
      .minutes(startDate.minutes())
      .subtract(15, "hours"); //강제로 시차 없앰
    const endDateWithDay = startDay
      .clone()
      .hours(endDate.hours())
      .minutes(endDate.minutes())
      .subtract(15, "hours");

    return {
      start: startDateWithDay.toDate(),
      end: endDateWithDay.toDate(),
      id: item.id,
      text: `${item.subject} 
       ${item.professor}
        ${item.room}`,
      backColor: colors[index % colors.length],
    };
  });

  return (
    <div className="p-3">
      <div>
        <div className="d-flex justify-content-between">
          <strong className="p-3">시간표</strong>
          <button
            className="m-2 write-button"
            onClick={() => {
              move("/timetable/post");
            }}
          >
            추가하기
          </button>
        </div>
      </div>
      <hr />

      <TimeTableList
        timeTableData={sortedTimeTableData}
        deleteTimeTableItem={deleteTimeTableItem}
        formatTime={formatTime}
      />
      <div className="calendar-container">
        <DayPilotCalendar {...config} events={events} />
      </div>
    </div>
  );
};

export default ShowTimeTable;
