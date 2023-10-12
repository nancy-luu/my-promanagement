import { generateDate } from "../../util/generateDate";

// styles
import "./SmallCalendar.css";

const SmallCalendar = () => {
  console.log(generateDate());

  return (
    <div className="small-calendar-container">
      {/* <h1 className='text-xl'>HELLO</h1> */}
    </div>
  );
};

export default SmallCalendar;
