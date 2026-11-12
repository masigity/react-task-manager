// Turn a date into a day key such as "2026-11-09" (local time, so a task
// never jumps to another day because of time zones)
export function toDayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}

// Which day does a task belong to?
// Step 1: the day it was created (the task id is the time it was created).
// Later steps only need to change this function, for example to use a
// due date or a completion date. The calendar does not need to change.
export function getTaskDayKey(task) {
  return toDayKey(new Date(task.id));
}
