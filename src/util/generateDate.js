import dayjs from "dayjs";

export const generateDate = ( month = dayjs().month(), year = dayjs().year(), myMeetings) => {

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

    const checkIfDayHasMeeting = (date, myMeetings) => {
        if (myMeetings) {
            return myMeetings.some(meeting => dayjs(meeting.start).isSame(date, 'day'));
        }
    };
 
    // getting every day of current month into arrayOfDate
    for(let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        const currentDate = firstDateOfMonth.date(i);
        arrayOfDate.push({
            currentMonth: true,
            date: firstDateOfMonth.date(i),
            today: firstDateOfMonth.date(i).isSame(dayjs(), 'day'),
            hasMeeting: checkIfDayHasMeeting(currentDate, myMeetings),
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