import { Link } from "react-router-dom";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

// Header with date for date pagination and DatePicker calendar use

// DatePicker code modified from whats provided at https://reactdatepicker.com/

function DayHeader({displayDate, setDisplayDate, minDate, maxDate, handleDateChangeL, handleDateChangeR}) {

    return(
    <div className="post-header">
          <h2 className="date">
            <div className="day">
              <Link onClick={handleDateChangeL}>{" < "}</Link>
              {format(displayDate, "EEEE")}
              <Link onClick={handleDateChangeR}>{" > "}</Link>
            </div>
            <DatePicker
              className="datePicker"
              minDate={minDate}
              maxDate={maxDate}
              popperPlacement="auto"
              selected={displayDate}
              onChange={(date) => setDisplayDate(date)}
            />
          </h2>
        </div>

)}

export default DayHeader;