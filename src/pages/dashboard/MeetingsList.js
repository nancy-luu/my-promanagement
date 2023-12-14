import { useState, useEffect } from "react"
import { useMyMeetings } from '../../hooks/useMyMeetings'
import dayjs from 'dayjs';


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
    <div className="meetings-container">
      <h4>Schedule for {selectedDateObj.month} {selectedDateObj.day}, {selectedDateObj.year}</h4>
      <div className="meetings-form">
        {meetingToRender ? meetingToRender.map(m => 
          <Meeting 
            // thisMonth={thisMonth} 
            meeting={m}
            calendarDays={calendarDays} 
          />
          )
          :
         (<div>No meetings for today.</div>)
        }
      </div>
    </div>
  )
}

export default MeetingsList
