import { useState, useEffect } from "react"
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

// components
import Meeting from './Meeting'

// styles
import './Meeting.css'

const MeetingsList = ({ dateForComparison, selectedDateObj, calendarDays, myMeetings }) => {
  const [meetingToRender, setMeetingToRender] = useState([]);
 

  useEffect(() => {
    if (myMeetings && dateForComparison) {
      const filteredMeetings = myMeetings.filter(meeting => {
        const startAsDayjs = dayjs(meeting.start); // Convert meeting.start to Day.js object
        return startAsDayjs.isSame(dateForComparison, 'day'); // Compare Day.js objects
      });

      const sortedMeetings = filteredMeetings.sort((a, b) => a.start - b.start);

      setMeetingToRender(sortedMeetings);
    }
  }, [myMeetings, dateForComparison]);

  let firstThreeMeetings = meetingToRender.slice(0, 3);

  return (
    <div className="grid-one-item grid-common grid-c1">
      <h3>Schedule for {selectedDateObj.month} {selectedDateObj.day}, {selectedDateObj.year}</h3>
      <div className="meetings-wrapper">
        {firstThreeMeetings.length > 0 ? (
          <>
            {firstThreeMeetings && firstThreeMeetings.map(m => 
              <Link className="meeting-link" to={`meetings/${m.id}`}>
                <Meeting 
                  // thisMonth={thisMonth} 
                  meeting={m}
                  calendarDays={calendarDays} 
                />
              </Link>
              )
            }
            {meetingToRender.length > 3? <Link className="and-more-link" to={`/calendar`}>...and more</Link> : <></>}
          </>
          ):(
          <>
          <div className="nothing-to-display">
            <p>No meetings to today</p>
            <Link to={"/createMeeting"}> yet!</Link>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MeetingsList
