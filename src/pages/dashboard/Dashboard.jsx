import { useState } from "react";
import { useMyProjects } from "../../hooks/useMyProjects";
import { useMyMeetings } from '../../hooks/useMyMeetings'
import { generateDate, months } from "../../util/generateDate";
import dayjs from "dayjs";

// components
import Overview from "./overview/Overview";
import SmallCalendar from "./small-calendar/SmallCalendar";
import PriorityTasks from "./priority/PriorityTasksList";
import NewCommentsList from "./new-comments/NewCommentsList";
import Collaborators from "./collaborators/Collaborators";
import MeetingsList from "./meeting-list/MeetingsList";
import BookmarkedProjects from "./bookmark/BookmarkedProjects";

 
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
  const { myMeetings } = useMyMeetings();

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
          myMeetings={myMeetings}
        />
        <MeetingsList
          dateForComparison={dateForComparison}
          selectedDateObj={selectedDateObj}
          calendarDays={calendarDays}
          myMeetings={myMeetings}
        />
        <Collaborators />
      </div>
    </div>
  );
};

export default Dashboard;
