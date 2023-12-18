import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument"; 
import dayjs from "dayjs";


const MeetingInfo = () => {
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const { id } = useParams();
  const { document: meeting, error} = useDocument("meetings", id)

  
  // const startTime = (dayjs(meeting.start)).format('h:mm A');
  // const endTime = (dayjs(meeting.end)).format('h:mm A');

  useEffect(() => {
    let startTime;
    let endTime;
    if(meeting){
       startTime = (dayjs(meeting.start)).format('h:mm A');
       endTime = (dayjs(meeting.end)).format('h:mm A');
    }
    setStart(startTime)
    setEnd(endTime)
  }, [meeting])

  // useEffect(() => {
  //   let startTime;
  //   let endTime;
  //   if(meeting){
  //     startTime = meeting.start.toDate().toString();
  //     endTime = meeting.end.toDate().toString()
  //   }
  //   setStart(startTime)
  //   setEnd(endTime)
  // }, [meeting])

  console.log("start")
  console.log(start)


  return (
    <>
      {meeting && 
        <div>
          <h3>{meeting.title}</h3>
          <p>{meeting.description}</p>
          <div className="meeting-duration">
            <p>{start}</p>
            <p>{end}</p>
          </div>
        </div>
      }
    </>
  )
}

export default MeetingInfo
