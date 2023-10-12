import isLastDayOfMonth from "date-fns/esm/fp/isLastDayOfMonth/index.js";
import dayjs from "dayjs";

export const generateDate = ( 
    
    month = dayjs().month(),
    
    year = dayjs().year()

) => {

    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");

    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // dates before calendar start
    for(let i = 0; i < firstDateOfMonth.day(); i++){
        arrayOfDate.push(firstDateOfMonth.day(i))
    }


    // gettign every day of current month into arrayOfDate
    for(let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push(firstDateOfMonth.date(i));
    }

    // getting days after current month end to fill up the rest of the 42 cells in the calendar 
    const remainingDays = 42 - arrayOfDate.length;

    for(let i = lastDateOfMonth.date()+1; i <= lastDateOfMonth.date()+remainingDays; i++) {
        arrayOfDate.push(lastDateOfMonth.date(i));
    }

    return [arrayOfDate];
}