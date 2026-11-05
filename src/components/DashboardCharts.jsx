import "./DashboardCharts.css";

const STATUS_COLOURS = {
  Completed: "#78816a",
  Pending: "var(--pending, #b4b2a9)",
};

const PRIORITY_COLOURS = {
  Low: "#78816a",
  Medium: "#d9b866",
  High: "#b65b50",
};

// Doughnut geometry (SVG viewBox is 120 x 120)
const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DashboardCharts({ tasks }) {
  if (tasks.length === 0) {
    return (
      <section className="dc-panel">
        <p className="dc-empty">Add a task to see your charts.</p>
      </section>
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionRate = Math.round((completedCount / tasks.length) * 100);
  const completedLength = (completedCount / tasks.length) * CIRCUMFERENCE;

  // Open (not completed) tasks per priority
  const priorityData = ["Low", "Medium", "High"].map((name) => ({
    name: name,
    count: tasks.filter(
      (task) => !task.completed && (task.priority || "Medium") === name
    ).length,
  }));

  // Y-axis scale for the bar chart
  const maxCount = Math.max(...priorityData.map((item) => item.count), 1);
  const step = maxCount <= 4 ? 1 : Math.ceil(maxCount / 4);
  const topValue = maxCount <= 4 ? maxCount : step * 4;
  const ticks = [];

  for (let value = 0; value <= topValue; value += step) {
    ticks.push(value);
  }

  const priorityLabel = priorityData
    .map((item) => `${item.name} ${item.count}`)
    .join(", ");

  return (
    <section className="dc-panel">
      {/* Doughnut: completed and pending */}
      <div className="dc-chart">
        <h3 className="dc-title">Completed and pending</h3>

        <div className="dc-legend">
          <span>
            <i
              className="dc-swatch"
              style={{ background: STATUS_COLOURS.Completed }}
            />
            Completed {completedCount}
          </span>
          <span>
            <i
              className="dc-swatch"
              style={{ background: STATUS_COLOURS.Pending }}
            />
            Pending {pendingCount}
          </span>
        </div>

        <div className="dc-chart-box">
          <svg
            className="dc-donut"
            viewBox="0 0 120 120"
            role="img"
            aria-label={`${completedCount} of ${tasks.length} tasks completed`}
          >
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              style={{ stroke: STATUS_COLOURS.Pending }}
              strokeWidth="16"
            >
              <title>{`Pending: ${pendingCount}`}</title>
            </circle>

            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke={STATUS_COLOURS.Completed}
              strokeWidth="16"
              strokeDasharray={`${completedLength} ${CIRCUMFERENCE}`}
              transform="rotate(-90 60 60)"
            >
              <title>{`Completed: ${completedCount}`}</title>
            </circle>
          </svg>

          <div className="dc-center">
            <strong>{completionRate}%</strong>
            <span>done</span>
          </div>
        </div>
      </div>

      {/* Bar chart: open tasks by priority */}
      <div className="dc-chart">
        <h3 className="dc-title">Pending by priority</h3>

        <div className="dc-legend">
          <span>Open tasks only</span>
        </div>

        <div className="dc-chart-box">
          <div
            className="dc-bars"
            role="img"
            aria-label={`Pending tasks by priority: ${priorityLabel}`}
          >
            <div className="dc-plot">
              {ticks.map((tick) => (
                <div
                  className="dc-grid"
                  key={tick}
                  style={{ bottom: `${(tick / topValue) * 100}%` }}
                >
                  <span>{tick}</span>
                </div>
              ))}

              <div className="dc-bar-row">
                {priorityData.map((item) => (
                  <div
                    className="dc-bar-col"
                    key={item.name}
                    title={`${item.name}: ${item.count} pending`}
                  >
                    <span className="dc-bar-value">{item.count}</span>
                    <div
                      className="dc-bar"
                      style={{
                        height: `${(item.count / topValue) * 100}%`,
                        background: PRIORITY_COLOURS[item.name],
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="dc-axis">
              {priorityData.map((item) => (
                <span key={item.name}>{item.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardCharts;
