import { months } from "../../util/generateDate";

import Meeting from './Meeting'

// styles
import './Meeting.css'

const MeetingsList = ({ thisMonth, calendarDays, selectedDay }) => {

  return (
    <div className="meetings-container">
      <div className="meeting">
        <h4>Schedule for {months[thisMonth.$M].slice(0, 3)} {selectedDay}, {thisMonth.year()}</h4>
      </div>
      <div className="meetings-form">
        <Meeting 
          thisMonth={thisMonth} 
          calendarDays={calendarDays} 
          selectedDay={selectedDay}
        />
      </div>
    </div>
  )
}

export default MeetingsList
