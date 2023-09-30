// src/DateRangePicker.js
import { React } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: any;
  endDate: any;
  setStartDate: (date : Date) => void;
  setEndDate: (date : Date) => void;
}

const DateRangePicker = ({startDate, endDate, setStartDate, setEndDate} : DateRangePickerProps) => {

  const handleStartDateChange = (date : Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date : Date) => {
    setEndDate(date);
  };

  // const handleSubmit = () => {
  //   // Handle submission logic here, e.g., send the selected date range to a server
  //   console.log('Selected start date:', startDate);
  //   console.log('Selected end date:', endDate);
  // };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            required
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy"
            required
            className="form-control"
          />
        </div>
      </div>

    </>
  );
};

export default DateRangePicker;
