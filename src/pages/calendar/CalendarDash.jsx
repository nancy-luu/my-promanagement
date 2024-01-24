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
    <div className="calendar-dash-container">
      <NavLink exact to="/createEvent">
        <button className="btn" onClick={handleAddEvent}>
          Schedule Meeting
        </button>
      </NavLink>
      <div className="big-calendar-container">
        <BigCalendar />
      </div>
    </div>
  );
};

export default CalendarDash;
