
import Meeting from './Meeting'

// styles
import './Meeting.css'

const MeetingsList = ({ selectedDateObj, calendarDays }) => {

  return (
    <div className="meetings-container">
      <div className="meeting">
        <h4>Schedule for {selectedDateObj.month} {selectedDateObj.day}, {selectedDateObj.year}</h4>
      </div>
      <div className="meetings-form">
        <Meeting 
          // thisMonth={thisMonth} 
          calendarDays={calendarDays} 
        />
        <div>No meetings for today.</div>
      </div>
    </div>
  )
}

export default MeetingsList
