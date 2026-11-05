import { AlertIcon, HourglassIcon } from "./Icons";
import "./StatusPanel.css";

const ONE_DAY = 24 * 60 * 60 * 1000;

// A high priority task open for longer than this means "Falling behind"
const FALLING_BEHIND_DAYS = 5;

// Days since the task was created (the task id is the time it was created)
function getAgeInDays(task) {
  return Math.floor((Date.now() - task.id) / ONE_DAY);
}

function isToday(timestamp) {
  return new Date(timestamp).toDateString() === new Date().toDateString();
}

function StatusPanel({ tasks, activityLog }) {
  if (tasks.length === 0) {
    return (
      <section className="sp-panel">
        <span className="sp-sentence">No tasks yet. Add one below.</span>
      </section>
    );
  }

  // Count open tasks, open high priority tasks and the oldest ones
  let pendingCount = 0;
  let highOpenCount = 0;
  let oldestOpenAge = 0;
  let oldestHighAge = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === false) {
      pendingCount++;

      const age = getAgeInDays(tasks[i]);

      if (age > oldestOpenAge) {
        oldestOpenAge = age;
      }

      if ((tasks[i].priority || "Medium") === "High") {
        highOpenCount++;

        if (age > oldestHighAge) {
          oldestHighAge = age;
        }
      }
    }
  }

  // Tasks finished today, taken from the activity log
  let finishedToday = 0;

  for (let i = 0; i < activityLog.length; i++) {
    if (isToday(activityLog[i].id)) {
      if (activityLog[i].action === "Task completed") {
        finishedToday++;
      } else if (activityLog[i].action === "Task marked as pending") {
        finishedToday--;
      }
    }
  }

  if (finishedToday < 0) {
    finishedToday = 0;
  }

  // Health label
  let healthLabel = "Busy";
  let healthClass = "sp-warn";

  if (highOpenCount === 0) {
    healthLabel = "On track";
    healthClass = "sp-ok";
  } else if (oldestHighAge > FALLING_BEHIND_DAYS) {
    healthLabel = "Falling behind";
    healthClass = "sp-bad";
  }

  // Sentence
  let tasksLeftText = "All caught up.";

  if (pendingCount > 0) {
    tasksLeftText =
      pendingCount + (pendingCount === 1 ? " task left." : " tasks left.");
  }

  let finishedText = "Nothing finished today yet.";

  if (finishedToday > 0) {
    finishedText = "You finished " + finishedToday + " today.";
  }

  return (
    <section className="sp-panel">
      <div className="sp-main">
        <span className={"sp-pill " + healthClass}>
          <i className="sp-dot" />
          {healthLabel}
        </span>

        <span className="sp-sentence">
          {tasksLeftText} {finishedText}
        </span>
      </div>

      {(highOpenCount > 0 || oldestOpenAge >= 1) && (
        <div className="sp-chips">
          {highOpenCount > 0 && (
            <span className="sp-chip">
              <span className="sp-icon sp-icon-red">
                <AlertIcon />
              </span>
              {highOpenCount} high priority open
            </span>
          )}

          {oldestOpenAge >= 1 && (
            <span className="sp-chip">
              <span className="sp-icon sp-icon-amber">
                <HourglassIcon />
              </span>
              Oldest task: {oldestOpenAge}{" "}
              {oldestOpenAge === 1 ? "day" : "days"}
            </span>
          )}
        </div>
      )}
    </section>
  );
}

export default StatusPanel;
