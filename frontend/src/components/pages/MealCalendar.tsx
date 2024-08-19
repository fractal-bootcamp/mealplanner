import React, { useState } from "react";
import Calendar from "react-calendar";
import "./MealCalendar.css";
import DayComponent from "./DayComponent";
import { Day, sampleDay } from "../types/mealTypes";

const MealCalendar: React.FC<{ cart: any; setCart: any }> = ({
  cart,
  setCart,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log(date);
  };

  const CustomCalendarHeader = ({ view, label, onChange }) => {
    const handleMonthChange = (direction) => {
      const newDate = new Date(label);
      newDate.setMonth(newDate.getMonth() + direction);
      onChange(newDate);
    };

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthLabel = months[new Date(label).getMonth()];
    const yearLabel = new Date(label).getFullYear();

    return (
      <div className="custom-calendar-header">
        <button
          className="react-calendar__navigation__prev2-button"
          onClick={() => handleMonthChange(-12)}
        >
          &laquo;
        </button>
        <button
          className="react-calendar__navigation__prev-button"
          onClick={() => handleMonthChange(-1)}
        >
          &lsaquo;
        </button>
        <span className="react-calendar__navigation__label">{`${monthLabel} ${yearLabel}`}</span>
        <button
          className="react-calendar__navigation__next-button"
          onClick={() => handleMonthChange(1)}
        >
          &rsaquo;
        </button>
        <button
          className="react-calendar__navigation__next2-button"
          onClick={() => handleMonthChange(12)}
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="react-calendar">
      <div className="calendar-body">
        <h2 className="text-2xl font-bold mb-4 text-sky-800">meal calendar</h2>
        {selectedDate ? (
          <DayView
            day={sampleDay}
            onClose={() => setSelectedDate(null)}
            cart={cart}
            setCart={setCart}
            date={selectedDate}
          />
        ) : (
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            className="w-full h-3/4"
            view="month"
            formatMonthYearHeader={() => <CustomCalendarHeader />}
          />
        )}
      </div>
    </div>
  );
};

interface DayViewProps {
  day: Day;
  onClose: () => void;
  date: Date;
}

const DayView: React.FC<DayViewProps> = ({
  day,
  onClose,
  cart,
  setCart,
  date,
}) => (
  <div className="DayViewContainer">
    <div className="DayViewHeader">
      <button className="CloseButton" onClick={onClose}>
        Close
      </button>
    </div>
    <DayComponent
      day={day}
      cart={cart}
      setCart={setCart}
      date={date}
      onClose={onClose}
    />
  </div>
);

export default MealCalendar;
