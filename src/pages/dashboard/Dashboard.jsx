import { useState } from "react";
import { useMyProjects } from "../../hooks/useMyProjects";
import { generateDate, months } from "../../util/generateDate";
import dayjs from "dayjs";

// components
import Overview from "./Overview";
import SmallCalendar from "./SmallCalendar";
import PriorityTasks from "./PriorityTasksList";
import NewCommentsList from "./NewCommentsList";
import Collaborators from "./Collaborators";
import MeetingsList from "./MeetingsList";
import BookmarkedProjects from "./BookmarkedProjects";

// styles
import "./Dashboard.css";

const Dashboard = () => {
  const currentDate = dayjs();

  const [dateForComparison, setDateForComparison] = useState(currentDate);
  const [calendarDays, setCalendarDays] = useState(generateDate());
  const [selectedDateObj, setSelectedDateObj] = useState({
    day: currentDate.$D,
    month: months[currentDate.month()],
    year: currentDate.$y,
  });

  const { myProjects } = useMyProjects();

  return (
    <div className="main-content-container">
      <div className="content-grid-one">
        <div className="subgrid-two">
          <Overview />
          <BookmarkedProjects myProjects={myProjects} />
        </div>
        <PriorityTasks />
        <NewCommentsList projects={myProjects} />
      </div>
      <div className="content-grid-two">
        <SmallCalendar
          dateForComparison={dateForComparison}
          setDateForComparison={setDateForComparison}
          currentDate={currentDate}
          selectedDateObj={selectedDateObj}
          setSelectedDateObj={setSelectedDateObj}
          months={months}
        />
        <MeetingsList
          dateForComparison={dateForComparison}
          selectedDateObj={selectedDateObj}
          calendarDays={calendarDays}
        />
        <Collaborators />
      </div>
    </div>
  );
};

export default Dashboard;
