
function ActivityLog({ activityLog, onClearLog }) {
  if (activityLog.length === 0) {
    return (
      <section className="activity-section">
        <div className="activity-header">
          <h2>Activity Log</h2>
        </div>

        <p className="empty-message">
          No activity recorded yet.
        </p>
      </section>
    );
  }

  return (
    <section className="activity-section">
      <div className="activity-header">
        <h2>Activity Log</h2>

        <button
          className="clear-log-button"
          onClick={onClearLog}
          type="button"
        >
          Clear Log
        </button>
      </div>

      <div className="activity-list">
        {activityLog.map(function (activity) {
          return (
            <div className="activity-row" key={activity.id}>
              <div className="activity-information">
                <span className="activity-action">
                  {activity.action}
                </span>

                <span className="activity-task-title">
                  {activity.taskTitle}
                </span>
              </div>

              <span className="activity-time">
                {activity.date}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ActivityLog;
