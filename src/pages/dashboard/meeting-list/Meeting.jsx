import dayjs from "dayjs";

// styles
import './Meeting.css';

const Meeting = ({ meeting }) => {

  const startTime = (dayjs(meeting.start)).format('h:mm A');
  const endTime = (dayjs(meeting.end)).format('h:mm A');

  return (
    <div className="meeting-wrapper">
      <div className="meeting-container">
          <h4 className="meeting-title">{meeting.title}</h4>
          <p>{startTime} - {endTime}</p>
      </div>
      <p>{meeting.description}</p>
    </div>
  )
}

export default Meeting
