import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

const BigCalendar = () => {
  const localizer = dayjsLocalizer(dayjs)


  const events = [
    { 
      start: dayjs('2023-10-17 09:30:00').toDate(), 
      end: dayjs('2023-10-17 10:30:00').toDate(),
      title: "TEST EVENT"
    }
  ]

  return (
    <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
  </div>
  )
}

export default BigCalendar
