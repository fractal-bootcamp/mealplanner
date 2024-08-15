import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const MealCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onClickDay = (date: Date) => {
    setSelectedDate(date);
  };

  const closeSelectedDate = () => {
    setSelectedDate(null);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 w-full">
      <h2 className="text-2xl font-bold">Meal Calendar</h2>
      <Calendar onChange={onChange} value={value} onClickDay={onClickDay} />
      {selectedDate && (
        <div className="mt-4 p-4 border rounded-lg relative">
          <button
            onClick={closeSelectedDate}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <p>Selected date: {selectedDate.toDateString()}</p>
          {/* Add more content for the selected date here */}
        </div>
      )}
    </div>
  );
};

export default MealCalendar;
