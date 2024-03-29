import { NavLink } from "react-router-dom";

// components
import BigCalendar from "./BigCalendar";

// styles 
import "./CalendarDash.css";

const CalendarDash = () => {
  const handleAddEvent = () => {
    console.log("Redirect to /createEvent");
  };

  return (
    <div className="main-content-container">
      <div className="mobile-title">
        <h1>Calendar</h1>
      </div>
      <div className="button-wrapper">
        <NavLink exact to="/createMeeting">
          <button className="btn" onClick={handleAddEvent}>
            Schedule Meeting
          </button>
        </NavLink>
      </div>
      <div className="big-calendar-container">
        <BigCalendar />
      </div>
    </div>
  );
};

export default CalendarDash;
 