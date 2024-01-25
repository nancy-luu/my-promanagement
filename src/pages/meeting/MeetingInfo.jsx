import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument"; 
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from "react-router-dom";

// components
import Avatar from "../../components/Avatar"
import CheckIcon from "../../assets/check-icon.png"
import DetailIcon from "../../assets/detail-icon.png"
import TimeIcon from "../../assets/time-icon.png"
import MeetingIcon from "../../assets/meeting-icon.png"
import DownArrow from "../../assets/down-arrow.png"
import TrashIcon from "../../assets/trash-icon.png" 


// styles
import './MeetingInfo.css'

const MeetingInfo = () => {
  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [showGuests, setShowGuests] = useState(false)
  const [guestsInvited, setGuestsInvited] = useState([])
  const { id } = useParams();
  const { user } = useAuthContext();
  const { document: meeting, error} = useDocument("meetings", id)
  const { acceptMeeting, removeUserFromMeeting, deleteDocument, response } = useFirestore("meetings");

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

    let sortedMeetingGuests = [];

    if(meeting){
      const alphabeticalGuestList = meeting.guestsInvitedList.sort((a, b) => {
        if(a.displayName < b.displayName){
          return -1;
        } else if (a.displayName > b.displayName) {
          return 1;
        }
        return 0;
      })

      sortedMeetingGuests = alphabeticalGuestList.sort((a, b) => {
        const aIsAttending = a.accepted
        const bIsAttending = b.accepted
  
        if(aIsAttending && !bIsAttending){
          return -1;
        } else if (!aIsAttending && bIsAttending){
          return 1;
        }
        return 0;
      })
      setGuestsInvited(sortedMeetingGuests)
    }
  
  }, [meeting]);

  const handleCancelMeeting = () => {
    deleteDocument(meeting.id);

    if (!response.error) {
      console.log(response)
      console.log("this is the response id: " + response.id);
      console.log(meeting)
      history.push(`/calendar`);
    }
  }

  const handleAcceptMeeting = () => {
    acceptMeeting(meeting.id, user.uid);

    if (!response.error) {
      console.log(response)
      console.log("this is the response id: " + response.id);
      console.log(meeting)
    }
  }

  const handleDeclineMeeting = () => {
    removeUserFromMeeting(meeting.id, user.uid);

    if (!response.error) {
      console.log(response)
      console.log("this is the response id: " + response.document.id);
      console.log(meeting)
      history.push(`/calendar`);
    }
  }

  const handleShowGuests = () => {
    if(!showGuests){
      setShowGuests(true)
    } else {
      setShowGuests(false)
    }
  }

  return (
    <div className="meeting-info-wrapper">
      {meeting && 
        <div className="meeting-info-container grid-common">
          <div className="header-section">
            <h3>{meeting.title}</h3>
            {user.uid === meeting.createdBy.id ? 
              <img src={TrashIcon} alt="trash icon" className="btn" onClick={handleCancelMeeting}/>
              :
              <></>
            }
          </div>
          <div className="detail-section">
            <img src={DetailIcon} alt="detail icon"/>
            <p>{meeting.description}</p>
          </div>
          <div className="time-section">
            <img src={TimeIcon} alt="time icon"/>
            <p>{start} - {end}</p>
          </div>
          <div className="guest-section" onClick={handleShowGuests}>
            <div className="guest-count-wrapper">
            <img src={MeetingIcon} alt="meeting guest icon" className="meeting-icon"/>
              <div className="guest-count">
                <h4>{meeting.guestsInvitedList.length} guests</h4>
                <p>{meeting.guestsInvitedList.filter(guest => guest.accepted).length > 0 && 
                    <>
                      {meeting.guestsInvitedList.filter(guest => guest.accepted).length} yes
                    </>
                    }
                    {meeting.guestsInvitedList.filter(guest => guest.accepted).length > 0 
                      && 
                      meeting.guestsInvitedList.filter(guest => !guest.accepted).length > 0 
                      ?
                      <>, </>
                      :
                      ''
                    }
                    {meeting.guestsInvitedList.filter(guest => !guest.accepted).length > 0 && 
                      <>
                        {meeting.guestsInvitedList.filter(guest => !guest.accepted).length} awaiting
                      </>
                    } 
                </p>
              </div>
            </div>
            <img src={DownArrow} alt="down arrow" className={`arrow ${showGuests ? 'up-arrow' : ''}`}/>
          </div>
          {showGuests && 
            <div className="meeting-guests-container">
              {guestsInvited.map(guest => 
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
          }
          <div className="response-section">
            <div>
            <h4>Going?</h4>
            </div>
            <div className="btn-wrapper"> 
                <button 
                  className={`btn ${meeting.guestsInvitedList.some(guest => guest.id === user.uid && guest.accepted === true) ? 'activated' : ''}`} 
                  onClick={handleAcceptMeeting}
                >Yes</button>
              <button className="btn" onClick={handleDeclineMeeting}>No</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default MeetingInfo
