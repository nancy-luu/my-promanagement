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
        arrayOfDate.push({ 
            currentMonth: false, // to track style change
            date: firstDateOfMonth.day(i),
        })
    }


    // gettign every day of current month into arrayOfDate
    for(let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            // check if one of the days matches dayjs current day
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
        });
    }

    // getting days after current month end to fill up the rest of the 42 cells in the calendar 
    const remainingDays = 42 - arrayOfDate.length;

    for ( let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remainingDays; i++) {
		arrayOfDate.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
		});
	}

    return arrayOfDate;
}


export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];