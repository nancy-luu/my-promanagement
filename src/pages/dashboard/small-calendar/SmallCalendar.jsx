import { useState, useEffect } from "react";
import { dashboardImgs } from "../../../util/images";
import { generateDate, months } from "../../../util/generateDate";
import { classNameHelper } from "../../../util/classNameHelper";

// styles and images
import "./SmallCalendar.css";

const SmallCalendar = ({dateForComparison,setDateForComparison, currentDate, selectedDateObj, setSelectedDateObj, myMeetings}) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const [thisMonth, setThisMonth] = useState(currentDate);
const [calendarDays, setCalendarDays] = useState(generateDate(currentDate.month(), currentDate.year(), myMeetings));
    const [selectedDay, setSelectedDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();  

  useEffect(() => {
    setCalendarDays(generateDate(thisMonth.month(), thisMonth.year(), myMeetings));
  }, [thisMonth, myMeetings]);


  console.log(myMeetings)
  
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
    setCalendarDays(generateDate(newMonth, newYear, myMeetings));
  }

  const returnToToday = () => {
    setThisMonth(currentDate); 
    setCalendarDays(generateDate(currentDate.month(), currentDate.year(), myMeetings));
    return;
  }

  const changeSelectedDate = (date) => {
    setSelectedDay(date.$D);
    setSelectedMonth(months[date.$M]);
    setSelectedYear(date.$y);
    setSelectedDateObj({ day: date.$D, month: months[date.$M], year: date.$y });

  const formattedDate = date.set({
    year: date.$y,
    month: date.$M,
    date: date.$D
  });
  
  setDateForComparison(formattedDate);

    return;
  }

  console.log("CALENDAR DAYS")
  console.log(calendarDays)

  return (
    <div className="grid-one-item grid-common grid-c1">
        <div className="small-calendar-container">
            <div className="month-name-form">
                <h3>
                {months[thisMonth.month()]}, {thisMonth.year()}
                </h3>
                <div className="cal-arrow-form">
                    <img className="cal-arrow-left" src={dashboardImgs.calArrow} alt="calendar arrow icon" 
                        onClick={()=> changeCalendar(-1)}
                    />
                    <h4 
                        onClick={()=> returnToToday()}
                    >Today</h4>
                    <img className="cal-arrow-right" src={dashboardImgs.calArrow} alt="calenar arrow icon" 
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
                {calendarDays.map(({ date, currentMonth, today, hasMeeting }, index) => {

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
                            >
                            {date.date()}
                            {hasMeeting? <div className="has-meeting-dot"></div> : <></>}
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
    </div>
  );
};

export default SmallCalendar;
