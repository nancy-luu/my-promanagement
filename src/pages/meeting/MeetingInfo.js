import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument"; 
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from "react-router-dom";

// components
import Avatar from "../../components/Avatar"
import CheckIcon from "../../assets/check-icon.png"

// styles
import './MeetingInfo.css'

const MeetingInfo = () => {
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const { id } = useParams();
  const { user } = useAuthContext();
  const { document: meeting, error} = useDocument("meetings", id)
  const { removeUserFromMeeting, response: removeResponse } = useFirestore("meetings");

  const history = useHistory();


  useEffect(() => {
    let startFormatted;
    let endFormatted;
    
    if (meeting) {
      const startDate = meeting.start.toDate();
      const endDate = meeting.end.toDate();
  
      const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, };
  
      startFormatted = startDate.toLocaleString('en-US', options);
      endFormatted = endDate.toLocaleString('en-US', options);
  
      const sameWeekdayMonthDay = startDate.getDay() === endDate.getDay() &&
                                  startDate.getMonth() === endDate.getMonth() &&
                                  startDate.getDate() === endDate.getDate()
      ;


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


  const handleDeclineMeeting = () => {
    
    removeUserFromMeeting(meeting.id, user.uid);

    if (!removeResponse.error) {
      console.log(removeResponse)
      console.log("this is the response id: " + removeResponse.id);
      console.log(meeting)
      history.push(`/calendar`);
    }
  }

  return (
    <>
      {meeting && 
        <div className="meeting-info-container">
          <h3>{meeting.title}</h3>
          <p>{meeting.description}</p>
          <div className="meeting-duration">
            <p>{start} - {end}</p>
          </div>
          <div className="guest-count">
            <h4>{meeting.guestsInvitedList.length} guests</h4>
            <p>{meeting.guestsInvitedList.filter(guest => guest.accepted).length > 0 && 
                <>
                  {meeting.guestsInvitedList.filter(guest => guest.accepted).length} yes, 
                </>
              } {meeting.guestsInvitedList.filter(guest => !guest.accepted).length} awaiting</p>
          </div>
          <div className="meeting-guests-container">
            {meeting.guestsInvitedList.map(guest => 
              <div className="single-guest-container">
                <div className="guest-image-container">
                  <Avatar src={guest.photoURL}/>
                  {guest.accepted && <img className="check-icon" src={CheckIcon} alt="check icon"></img>}
                </div>
                <div className="guests-name">
                  <p>{guest.displayName}</p>
                  {guest.id === meeting.createdBy.id ? <h5>Organizer</h5> : <></>}
                </div>
              </div>
            )}
          </div>
          <div className="response">
            <div>
            <h4>Going?</h4>
            </div>
            <div className="btn-wrapper"> 
              <button className="btn">Yes</button>
              <button className="btn" onClick={handleDeclineMeeting}>No</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default MeetingInfo
