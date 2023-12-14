// import { useState } from 'react';
// import { months } from "../../util/generateDate";
// import dayjs from "dayjs";

// styles
import './Meeting.css';

const Meeting = ({ meeting }) => {

  return (
    <div className="meeting-container">
        <h4>Meetings Info</h4>
        <div>{meeting.title}</div>
    </div>
  )
}

export default Meeting
