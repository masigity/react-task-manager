import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./DashboardCharts.css";

const STATUS_COLOURS = {
  Completed: "#78816a",
  Pending: "#b4b2a9",
};

const PRIORITY_COLOURS = {
  Low: "#78816a",
  Medium: "#d9b866",
  High: "#b65b50",
};

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

  const statusData = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  // Open (not completed) tasks per priority
  const priorityData = ["Low", "Medium", "High"].map((name) => ({
    name: name,
    count: tasks.filter(
      (task) => !task.completed && (task.priority || "Medium") === name
    ).length,
  }));

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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius="68%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="#ffffff"
                strokeWidth={3}
                isAnimationActive={false}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLOURS[entry.name]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>

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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priorityData}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#e5e5df" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: "#deded8" }}
                tick={{ fontSize: 11, fill: "#85857d" }}
              />
              <YAxis
                allowDecimals={false}
                domain={[0, (max) => Math.max(max, 1)]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#85857d" }}
              />
              <Tooltip
                cursor={{ fill: "#eeeeea" }}
                contentStyle={{ fontSize: 12 }}
              />
              <Bar
                dataKey="count"
                name="Tasks"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
                isAnimationActive={false}
              >
                {priorityData.map((entry) => (
                  <Cell key={entry.name} fill={PRIORITY_COLOURS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default DashboardCharts;
