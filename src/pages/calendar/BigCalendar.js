import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useMyMeetings } from "../../hooks/useMyMeetings";
import { Link } from "react-router-dom";

const BigCalendar = () => {
  const [meetings, setMeetings]=useState([])
  const { myMeetings } = useMyMeetings();

  const localizer = dayjsLocalizer(dayjs)
  const currentDay = dayjs();
  const minTime = currentDay.set('hour', 8).set('minute', 0).set('second', 0);
  const maxTime = currentDay.set('hour', 19).set('minute', 0).set('second', 0);

    useEffect(() => {
        if(myMeetings){
          setMeetings(myMeetings)
        }
    }, [myMeetings])

  console.log(meetings);

  console.log("MY MEETINGS: ")
  console.log(myMeetings);

  const handleEventClick = (event) => {
    console.log('Clicked event:', event);
  };

  // Custom event display in Month View
  const EventDisplay = ({ event }) => (
    <Link to={`/meetings/${event.id}`}>
      <div>
        <div>{event.title}</div>
      </div>
    </Link>
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
          events={myMeetings}
          defaultView={"week"}
          views={["month", "week", "day"]}
          style={{ height: 550 }}
          min={minTime.toDate()}
          max={maxTime.toDate()}
          onSelectEvent={handleEventClick}
          components={{
            event: EventDisplay,
            toolbar: CustomToolbar
          }}
        />
  </div>
  )
}

export default BigCalendar
