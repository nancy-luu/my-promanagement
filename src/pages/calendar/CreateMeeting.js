import { useState, useEffect } from 'react';
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import dayjs from "dayjs";
import Flatpickr from 'react-flatpickr';
import Select from "react-select";

// styles
import './CalendarDash.css'
import 'flatpickr/dist/flatpickr.css';

const CreateMeeting = () => {

    const currentDate = dayjs();
    const endPlaceHolder = dayjs().add(1, 'hour');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(currentDate.toDate());
    const [end, setEnd] = useState(endPlaceHolder.toDate());
    const [guests, setGuests] = useState('');
    const [formError, setFormError] = useState(null);



    const { documents } = useCollection("users");
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (documents) {
          const options = documents.map((user) => {
            return { value: user, label: user.displayName, img: user.photoURL };
          });
          setUsers(options); 
        }
    }, [documents]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(title, start, end, description, guests)

        if(!start || !end){
            setFormError("Please choose a start and end for your meeting.")
        }
        if(guests.length < 1){
          setFormError("Please invite guests to your meeting.")
        }
    }

  return (
    <div className="create-event-container">
        <h3>Shedule New Meeting</h3>
        <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setStart(e)}
                    />
                    <p>to</p>
                    <Flatpickr
                        value={end}
                        options={{
                            enableTime: true,
                            altInput: true,
                        }}
                        onChange={(e) => setEnd(e)}
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
  )
}

export default CreateMeeting
