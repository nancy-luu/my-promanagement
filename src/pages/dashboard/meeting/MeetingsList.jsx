import { useState, useEffect } from "react"
import { useMyMeetings } from '../../../hooks/useMyMeetings'
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

// components
import Meeting from './Meeting'

// styles
import './Meeting.css'

const MeetingsList = ({ dateForComparison, selectedDateObj, calendarDays }) => {
  const [meetingToRender, setMeetingToRender] = useState([]);
  const { myMeetings } = useMyMeetings();
 

  useEffect(() => {
    if (myMeetings && dateForComparison) {
      const filteredMeetings = myMeetings.filter(meeting => {
        const startAsDayjs = dayjs(meeting.start); // Convert meeting.start to Day.js object
        return startAsDayjs.isSame(dateForComparison, 'day'); // Compare Day.js objects
      });
      setMeetingToRender(filteredMeetings);
    }
  }, [myMeetings, dateForComparison]);


  return (
    <div className="grid-one-item grid-common grid-c1">
      <h3>Schedule for {selectedDateObj.month} {selectedDateObj.day}, {selectedDateObj.year}</h3>
      <div className="meetings-wrapper">
        {meetingToRender.length > 0 ? (
          <>
            {meetingToRender && meetingToRender.map(m => 
              <Link to={`meetings/${m.id}`}>
                <Meeting 
                  // thisMonth={thisMonth} 
                  meeting={m}
                  calendarDays={calendarDays} 
                />
              </Link>
              )
            }
          </>
          ):(
          <>
          <div className="nothing-to-display">
            <p>No meetings to display</p>
            <Link to={"/createMeeting"}> yet!</Link>
          </div>
          </>
        )}
        {/* {meetingToRender.length === 0 && <p>No meetings</p>} */}
      </div>
    </div>
  )
}

export default MeetingsList
