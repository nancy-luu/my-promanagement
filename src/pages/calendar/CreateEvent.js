import { useState, useEffect } from 'react';
import { useCollecton } from '../../hooks/useCollection';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from "dayjs";


// styles
import './CalendarDash.css'

const CreateEvent = () => {

    const currentDate = dayjs();
    const endPlaceHolder = dayjs().add(1, 'hour');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start, setStart] = useState(currentDate.toDate());
    const [end, setEnd] = useState(endPlaceHolder.toDate());
    const [guests, setGuests] = useState('');

    // console.log(currentDate.toDate())

  return (
    <div className="create-event-container">
        <h3>Shedule New Meeting</h3>
        <form>
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
                <input 
                    placeholder="Add description"
                    required 
                    type="text" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </label>
            <label>
                <div className="start-end-input-container">
                    <DateTimePicker
                        value={dayjs(start)}
                        onChange={(newValue) => setStart(newValue.toDate())}
                        InputProps={{ sx: { "& .MuiSvgIcon-root": { color: "blue" } } }}
                    />
                    <p>to</p>
                    <DateTimePicker
                        value={dayjs(end)}
                        onChange={(newValue) => setEnd(newValue.toDate())}
                    />
                </div>
            </label>
        </form>
    </div>
  )
}

export default CreateEvent
