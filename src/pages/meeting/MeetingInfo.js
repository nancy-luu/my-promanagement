import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument"; 
import dayjs from "dayjs";


const MeetingInfo = () => {
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const { id } = useParams();
  const { document: meeting, error} = useDocument("meetings", id)


  useEffect(() => {
    let startFormatted;
    let endFormatted;
    
    if (meeting) {
      const startDate = meeting.start.toDate();
      const endDate = meeting.end.toDate();
  
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  
      startFormatted = startDate.toLocaleString('en-US', options);
      endFormatted = endDate.toLocaleString('en-US', options);
  
      const sameWeekdayMonthDay = startDate.getDay() === endDate.getDay() &&
                                  startDate.getMonth() === endDate.getMonth() &&
                                  startDate.getDate() === endDate.getDate();
  
      if (sameWeekdayMonthDay) {
        const onlyTimeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        endFormatted = endDate.toLocaleString('en-US', onlyTimeOptions);
        setStart(startFormatted);
        setEnd(endFormatted);
      } else {
        setStart(startFormatted);
        setEnd(endFormatted); 
      }
    }
  
  }, [meeting]);


  return (
    <>
      {meeting && 
        <div>
          <h3>{meeting.title}</h3>
          <p>{meeting.description}</p>
          <div className="meeting-duration">
            <p>{start} - {end}</p>
          </div>
        </div>
      }
    </>
  )
}

export default MeetingInfo
