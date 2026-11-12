import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { toDayKey, getTaskDayKey } from "./taskDates";
import "./Calendar.css";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function Calendar({ tasks, selectedDay, onSelectDay }) {
  // The month being shown (always the 1st of that month)
  const [viewDate, setViewDate] = useState(function () {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const todayKey = toDayKey(new Date());

  const monthName = viewDate.toLocaleDateString("en-GB", { month: "long" });

  // Count how many tasks belong to each day
  const countsByDay = {};

  for (let i = 0; i < tasks.length; i++) {
    const dayKey = getTaskDayKey(tasks[i]);
    countsByDay[dayKey] = (countsByDay[dayKey] || 0) + 1;
  }

  // The week starts on Monday, so work out how many empty cells come first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const emptyCells = (new Date(year, month, 1).getDay() + 6) % 7;

  const cells = [];

  for (let i = 0; i < emptyCells; i++) {
    cells.push(<span className="cal-empty" key={"empty-" + i} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayKey = toDayKey(new Date(year, month, day));
    const count = countsByDay[dayKey] || 0;

    let className = "cal-day";

    if (count > 0) {
      className += " cal-level-" + Math.min(count, 3);
    }

    if (dayKey === todayKey) {
      className += " cal-today";
    }

    if (dayKey === selectedDay) {
      className += " cal-selected";
    }

    if (count === 0) {
      cells.push(
        <span className={className} key={dayKey}>
          {day}
        </span>
      );
    } else {
      const label =
        day + " " + monthName + ": " + count + (count === 1 ? " task" : " tasks");

      cells.push(
        <button
          key={dayKey}
          className={className}
          type="button"
          title={label}
          aria-label={label}
          aria-pressed={dayKey === selectedDay}
          onClick={function () {
            // Clicking the selected day again clears it
            onSelectDay(dayKey === selectedDay ? null : dayKey);
          }}
        >
          {day}
          <small>{count}</small>
        </button>
      );
    }
  }

  function showPreviousMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function showNextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  let selectedText = "";

  if (selectedDay) {
    selectedText = new Date(selectedDay + "T00:00:00").toLocaleDateString(
      "en-GB",
      { day: "numeric", month: "short", year: "numeric" }
    );
  }

  return (
    <section className="cal-panel">
      <div className="cal-header">
        <h3 className="cal-title">
          {monthName} {year}
        </h3>

        <div className="cal-nav">
          <button
            type="button"
            onClick={showPreviousMonth}
            title="Previous month"
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            onClick={showNextMonth}
            title="Next month"
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="cal-grid">
        {WEEKDAYS.map(function (weekday) {
          return (
            <span className="cal-weekday" key={weekday}>
              {weekday}
            </span>
          );
        })}

        {cells}
      </div>

      <div className="cal-footer">
        {selectedDay ? (
          <>
            <span>Showing tasks from {selectedText}</span>
            <button
              className="cal-clear"
              type="button"
              onClick={function () {
                onSelectDay(null);
              }}
            >
              Clear
            </button>
          </>
        ) : (
          <span>Click a day to list its tasks</span>
        )}
      </div>
    </section>
  );
}

export default Calendar;
