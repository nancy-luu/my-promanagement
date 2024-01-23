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

// styles
import "./Dashboard.css";
import MyProjectsList from "./MyProjectsList";
import MeetingsList from "./MeetingsList";

const Dashboard = () => {
  const currentDate = dayjs();

  const [dateForComparison, setDateForComparison] = useState(currentDate);
  const [calendarDays, setCalendarDays] = useState(generateDate());
  const [selectedDateObj, setSelectedDateObj] = useState({day: currentDate.$D, month: months[currentDate.month()], year: currentDate.$y});    


  const { myProjects, openProjects, inProgressProjects, completedProject } = useMyProjects();



  return (
    <div className="dashboard-container">
      <div className="overview">
        <Overview />
      </div>
      <div className="small-cal">
        <SmallCalendar 
          dateForComparison={dateForComparison}
          setDateForComparison={setDateForComparison}
          currentDate={currentDate}
          selectedDateObj={selectedDateObj}
          setSelectedDateObj={setSelectedDateObj}
          months={months}
        />
      </div>   
      <div className="meeetings">
        <MeetingsList 
            dateForComparison={dateForComparison}
            selectedDateObj={selectedDateObj}
            calendarDays={calendarDays} 
        />
      </div>   
      <div className="tasks">
        <PriorityTasks />
      </div>
      <div className="comments">
        <NewCommentsList projects={myProjects} />
      </div>
      <div className="collabs">
        <Collaborators />
      </div>
    </div>
  );
};

export default Dashboard;

