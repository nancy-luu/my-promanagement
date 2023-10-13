import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "../../util/generateDate";
import { classNameHelper } from "../../util/classNameHelper";
import CalArrow from '../../assets/cal-arrow-hover.png';


import MeetingsList from './MeetingsList'


// styles
import "./SmallCalendar.css";

const SmallCalendar = () => {
//   console.log(generateDate());

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentDate = dayjs();

  const [thisMonth, setThisMonth] = useState(currentDate);
  const [calendarDays, setCalendarDays] = useState(generateDate());
  const [selectedDay, setSelectedDay] = useState()

  console.log(currentDate);

  const changeCalendar = (x) => {
    setThisMonth(thisMonth.month(thisMonth.month()+x))
    setCalendarDays(generateDate(thisMonth.month()+x))
    return;
  }

  return (
    <div>
        <div className="small-calendar-container">
            <div className="month-name-form">
                <h3>
                {months[thisMonth.month()]}, {thisMonth.year()}
                </h3>
                <div className="cal-arrow-form">
                    <img className="cal-arrow-left" src={CalArrow} alt="calendar arrow icon" 
                        onClick={()=> changeCalendar(-1)}
                    />
                    <h4>Today</h4>
                    <img className="cal-arrow-right" src={CalArrow} alt="calenar arrow icon" 
                        onClick={()=> changeCalendar(+1)}
                    />
                </div>
            </div>
            <div className="day-name-form">
                {days.map((day, index) => {
                return (
                    <h4 className="day-name" key={index}>
                    {day}
                    </h4>
                );
                })}
            </div>
            <div className="days-form">
                {calendarDays.map(({ date, currentMonth, today }, index) => {
                return (
                    <div
                    key={index}
                    className={classNameHelper(
                        currentMonth ? "day" : "day-outside-month",
                        today ? "day-current" : " ",
                        currentMonth && date.$D === selectedDay ? "day-selected" : ""
                    )}
                    onClick={(e) => setSelectedDay(date.$D)}
                    >
                    {date.date()}
                    </div>
                );
                })}
            </div>
        </div>
        <MeetingsList 
            thisMonth={thisMonth} 
            calendarDays={calendarDays} 
            selectedDay={selectedDay}
        />
    </div>
  );
};

export default SmallCalendar;
