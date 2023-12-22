import { useState, useEffect } from 'react';
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import Flatpickr from 'react-flatpickr';
import Select from "react-select";

// styles
import './CalendarDash.css'
import 'flatpickr/dist/flatpickr.css';

const CreateMeeting = () => {
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const { addMeetingDocument, response } = useFirestore("meetings");
  const { addTest, response: testResponse } = useFirestore("test");

  const history = useHistory();

    const currentDate = dayjs();
    const endPlaceHolder = dayjs().add(1, 'hour');

    const [title, setTitle] = useState('');
    const [start, setStart] = useState(currentDate.toDate());
    const [end, setEnd] = useState(endPlaceHolder.toDate());
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);
    const [guests, setGuests] = useState([]);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (documents) {
          const options = documents.map((user) => {
            return { value: user, label: user.displayName, img: user.photoURL };
          });
          setUsers(options); 
        }
    }, [documents]);


    const handleSubmitMeeting = async (e) => {
        e.preventDefault();
        setFormError(null)
        // console.log(title, start, end, description, guests)

        if(!start || !end){
            setFormError("Please choose a start and end for your meeting.")
            return;
        }
        if(guests.length < 1){
          setFormError("Please invite guests to your meeting.")
          return;
        }

      const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      };

      const guestsInvitedList = guests.map((g) => {
        return {
          displayName: g.value.displayName,
          photoURL: g.value.photoURL,
          id: g.value.id,
          accepted: false
        }
      })

      const meeting = {
        title,
        start,
        end,
        description,
        guestsInvitedList,
        createdBy
      }

      await addMeetingDocument(meeting);

      if (!response.error) {
        console.log(response)
        console.log("this is the response id: " + response.id);
        console.log(meeting)
        history.push(`/calendar`);
      }
    }

  return (
    <div className="create-event-wrapper">
      <div className="create-event-container">
          <h3>Shedule New Meeting</h3>
          <form onSubmit={handleSubmitMeeting}>
              <label>
                  <input 
                      placeholder="Add title"
                      required 
                      type="text" 
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                  />
              </label>
              <label>
                  <div className="start-end-input-container">
                      <Flatpickr
                          value={start}
                          options={{
                              enableTime: true,
                              altInput: true,
                          }}
                          onChange={(selectedDates) => setStart(selectedDates[0])}
                          />
                      <p>to</p>
                      <Flatpickr
                          value={end}
                          options={{
                              enableTime: true,
                              altInput: true,
                          }}
                          onChange={(selectedDates) => setEnd(selectedDates[0])}
                          />
                  </div>
              </label>
              <label>
                  <textarea 
                      placeholder="Add description"
                      required 
                      type="text" 
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                  />
              </label>
              <label>
              <span>Invite:</span>
              <Select
                isMulti
                value={guests}
                onChange={(option) => setGuests(option)}
                options={users}
                formatOptionLabel={user => (
                  <div className="assigned-user-option">
                    <img src={user.img} className="avatar" alt="user-avatar" />
                    <p>{user.label}</p>
                  </div>
                )}
                // select customize only here - not in css 
                theme={(theme) => ({
                  ...theme,
                  borderRadius: '5px',
                  colors: {
                  ...theme.colors,
                    text: 'orangered',
                    primary25: 'orange',
                    primary: 'orange',
                  },
                })}
              />
            </label>
            <button className="btn">Add</button>

            {formError && <p className="error">{formError}</p>}
          </form>
      </div>
    </div>
  )
}

export default CreateMeeting
