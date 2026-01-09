import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from "date-fns";

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>();

  // Get month boundaries
  const startDay = startOfMonth(currentDate);
  const endDay = endOfMonth(currentDate);

  // Expand to full weeks (so calendar starts on Sunday & ends on Saturday)
  const calendarStart = startOfWeek(startDay, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(endDay, { weekStartsOn: 0 });

  // All days from start → end
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-md border-slate-100 shadow-sm">
      {/* Header with Month & Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ◀
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center gap-1">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 rounded cursor-pointer
              ${!isSameMonth(day, currentDate) ? "text-gray-400" : ""}
              ${
                isSameDay(day, new Date()) || isSameDay(selectedDate, day)
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-100"
              }
            `}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
