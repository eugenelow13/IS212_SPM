// src/DateRangePicker.js
import DatePicker from 'react-datepicker';
import React from 'react';
import { Form, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  startDate: any;
  endDate: any;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }: DateRangePickerProps) => {

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  // const handleSubmit = () => {
  //   // Handle submission logic here, e.g., send the selected date range to a server
  //   console.log('Selected start date:', startDate);
  //   console.log('Selected end date:', endDate);
  // };

  return (
    <>
      <Col>
        <Form.Label htmlFor="start_date" style={{ display: "block" }}>Start Date:</Form.Label>
        <DatePicker
          id="start_date"
          name="start_date"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          required
          className="form-control"
          wrapperClassName="w-100"
        />
      </Col>
      <Col>
        <Form.Label htmlFor="end_date" style={{ display: "block" }}>End Date:</Form.Label>
        <DatePicker
          id="end_date"
          name="end_date"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          required
          className="form-control"
          wrapperClassName="w-100"
        />
      </Col>
    </>
  );
};

export default DateRangePicker;
