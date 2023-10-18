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
    // Don't allow the user to select a start date that is before the current date and alert them
    if (date < new Date(new Date().setDate(new Date().getDate() - 1))){
      alert('Start date cannot be before the current date.');
      return;
    }

    // Don't allow the user to select a start date that is after the end date if the end date is already selected and alert them
    if (endDate && date > endDate){
      alert('Start date cannot be after the end date.');
      return;
    }

    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    // Don't allow the user to select an end date that is before the current date and alert them
    if (date < new Date(new Date().setDate(new Date().getDate() - 1))){
      alert('End date cannot be before the current date.');
      return;
    }

    // Don't allow the user to select an end date that is before the start date if the start date is already selected and alert them
    if (startDate && date < startDate){
      alert('End date cannot be before the start date.');
      return;
    }

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
        <Form.Label htmlFor="start_date" style={{ display: "block" }}>
          Start Date <span className='text-danger'>*</span>
        </Form.Label>
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
          autoComplete="off"
        />
      </Col>
      <Col>
        <Form.Label htmlFor="end_date" style={{ display: "block" }}>
          End Date <span className='text-danger'>*</span>
        </Form.Label>
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
          autoComplete="off"
        />
      </Col>
    </>
  );
};

export default DateRangePicker;
