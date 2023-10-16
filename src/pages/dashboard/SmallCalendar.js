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
  const [selectedDay, setSelectedDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedDateObj, setSelectedDateObj] = useState({day: currentDate.$D, month: months[currentDate.month()], year: currentDate.$y});    

  const changeCalendar = (x) => {
    let newMonth = thisMonth.month() + x;
    let newYear = thisMonth.year(); // Preserve the current year

    // Check if the newMonth goes beyond the current year
    if (newMonth < 0) {
        newYear--;
        newMonth = 11; // Go to December of the previous year
    } else if (newMonth > 11) {
        newYear++;
        newMonth = 0; // Go to January of the next year
    }

    setThisMonth(thisMonth.month(newMonth).year(newYear));
    setCalendarDays(generateDate(newMonth, newYear));
  }

  const returnToToday = () => {
    setThisMonth(currentDate); 
    setCalendarDays(generateDate(currentDate.month()));
    return;
  }

  const changeSelectedDate = (date) => {
    setSelectedDay(date.$D);
    setSelectedMonth(months[date.$M]);
    setSelectedYear(date.$y);
    setSelectedDateObj({ day: date.$D, month: months[date.$M], year: date.$y });
    console.log(date)
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
                    <h4 
                        onClick={()=> returnToToday()}
                    >Today</h4>
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

                    const isSelected =
                    date.$D === selectedDay &&
                    months[date.$M] === selectedMonth && // Compare the selected month
                    date.$y === selectedYear; // Compare the selected ye

                return (
                    <>
                        {currentMonth ? 
                            <div
                            key={index}
                            className={classNameHelper(
                                currentMonth ? "day" : "day-outside-month",
                                today ? "day-current" : " ",
                                isSelected ? "day-selected" : ""
                            )}
                            onClick={(e) => changeSelectedDate(date)}
                            // onClick={(e) => console.log(date)}

                            >
                            {date.date()}
                            </div>
                        :
                            <div
                            key={index}
                            className={classNameHelper(
                                currentMonth ? "day" : "day-outside-month",
                                today ? "day-current" : " ",
                            )}
                            >
                            {date.date()}
                            </div>
                        }
                    </>
                );
                })}
            </div>
        </div>
        <MeetingsList 
            selectedDateObj={selectedDateObj}
            calendarDays={calendarDays} 
        />
    </div>
  );
};

export default SmallCalendar;
