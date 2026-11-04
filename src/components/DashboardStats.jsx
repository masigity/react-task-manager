
function DashboardStats({
  totalTasks,
  completedTasks,
  pendingTasks,
  completionRate,
}) {
  return (
    <section className="dashboard-stats">
      <div className="stat-item">
        <span className="stat-value">{totalTasks}</span>
        <span className="stat-label">Total Tasks</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{completedTasks}</span>
        <span className="stat-label">Completed</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">{pendingTasks}</span>
        <span className="stat-label">Pending</span>
      </div>

      <div className="stat-item">
        <span className="stat-value">
          {completionRate}%
        </span>
        <span className="stat-label">Completion Rate</span>
      </div>

      <div className="stats-progress">
        <div
          className="stats-progress-fill"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </section>
  );
}

export default DashboardStats;
