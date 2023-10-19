import { NavLink } from 'react-router-dom';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';

const BigCalendar = () => {
  const localizer = dayjsLocalizer(dayjs)

  const currentDay = dayjs();
  const minTime = currentDay.set('hour', 8).set('minute', 0).set('second', 0);
  const maxTime = currentDay.set('hour', 19).set('minute', 0).set('second', 0);

  const testEvent = [
    { 
      start: dayjs('2023-10-17 09:30:00').toDate(), 
      end: dayjs('2023-10-18 10:30:00').toDate(),
      title: "Test Event1",
      attendees: ["Nancy", "Donna"]
    },
    { 
      start: dayjs('2023-10-17 10:30:00').toDate(), 
      end: dayjs('2023-10-17 11:30:00').toDate(),
      title: "Test Event2",
      attendees: ["Quade", "Ebri"]
    },
    { 
      start: dayjs('2023-10-17 10:00:00').toDate(), 
      end: dayjs('2023-10-17 11:00:00').toDate(),
      title: "Test Event3",
      attendees: ["Maria", "Edgar"]
    },
    { 
      start: dayjs('2023-10-17 11:30:00').toDate(), 
      end: dayjs('2023-10-17 12:30:00').toDate(),
      title: "Test Event4",
      attendees: ["Chris", "Jane"]
    }
  ]

  const handleEventClick = (event) => {
    console.log('Clicked event:', event);
    console.log(event.attendees);
  };

  const EventDisplay = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      {/* <p>Start: {localizer.format(event.start, 'YYYY-MM-DD HH:mm:ss')}</p>
      <p>End: {localizer.format(event.end, 'YYYY-MM-DD HH:mm:ss')}</p>
      <p>Attendees: {event.attendees.join(', ')}</p> */}
    </div>
  );

  const CustomToolbar = (toolbar) => {

    console.log(toolbar)
 
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <span className="rbc-btn-today">
            <button type="button" onClick={() => toolbar.onNavigate('TODAY')}>Today</button>
          </span>
        </span>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => toolbar.onNavigate('PREV')}>{'<'}</button>
          <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>{'>'}</button>
        </span>
          <span className="rbc-toolbar-label">
            {toolbar.label}
          </span>
        <span className="rbc-btn-group">
          {toolbar.views.map(viewName => (
            <button
              key={viewName}
              type="button"
              onClick={() => toolbar.onView(viewName)}
              className={viewName === toolbar.view ? 'rbc-active' : ''}
            >
              {viewName}
            </button>
          ))}
        </span>
      </div>
    );
  };

  return (
    <div>
        <Calendar
          localizer={localizer}
          events={testEvent}
          defaultView={"week"}
          views={["month", "week", "day"]}
          style={{ height: 600 }}
          min={minTime.toDate()}
          max={maxTime.toDate()}
          onSelectEvent={handleEventClick}
          components={{
            event: EventDisplay, // Use the custom EventDisplay component
            toolbar: CustomToolbar
          }}
        />
  </div>
  )
}

export default BigCalendar
