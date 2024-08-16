import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DayComponent from "./DayComponent";
import { Day, sampleDay } from "../types/mealTypes";

const MealCalendar: React.FC = ({ cart, setCart }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Meal Calendar</h2>
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
        />
      )}
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
  <div className="relative">
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

// TODO: Calculate all ingredients for either a recipe, meal, or day
// Week, Day, Meal, Recipe, Individual ingredial

// const ingredientTotal = Ingredient: []
