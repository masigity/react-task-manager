
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ActivityLog from "./components/ActivityLog";
import { SearchIcon } from "./components/Icons";
import DashboardCharts from "./components/DashboardCharts";

import "./App.css";

function App() {
  // Load tasks from localStorage
  const [tasks, setTasks] = useState(function () {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");

      if (savedTasks) {
        return JSON.parse(savedTasks);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Could not load tasks:", error);
      return [];
    }
  });

  // Save tasks whenever they change
  useEffect(function () {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);


  // Load activity log from localStorage
  const [activityLog, setActivityLog] = useState(function () {
    try {
      const savedActivityLog = localStorage.getItem("taskflow-activity");

      if (savedActivityLog) {
        return JSON.parse(savedActivityLog);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Could not load activity log:", error);
      return [];
    }
  });

  // Save activity log whenever it changes
  useEffect(function () {
    localStorage.setItem(
      "taskflow-activity",
      JSON.stringify(activityLog)
    );
  }, [activityLog]);


  // Current page
  const [currentPage, setCurrentPage] = useState("dashboard");


  // Search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");


  // Add a record to the activity log
  function addActivity(action, taskTitle) {
    const newActivity = {
      id: Date.now(),
      action: action,
      taskTitle: taskTitle,
      date: new Date().toLocaleString("en-GB"),
    };

    setActivityLog(function (previousActivityLog) {
      const updatedActivityLog = [
        newActivity,
        ...previousActivityLog,
      ];

      return updatedActivityLog;
    });
  }


  // Add task
  function addTask(title, priority) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: priority,
    };

    setTasks([...tasks, newTask]);

    addActivity("Task added", title);
  }


  // Complete or mark task as pending
  function toggleTask(taskId) {
    let selectedTask = null;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        selectedTask = tasks[i];
        break;
      }
    }

    if (selectedTask === null) {
      return;
    }

    const updatedTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        const updatedTask = {
          id: tasks[i].id,
          title: tasks[i].title,
          completed: !tasks[i].completed,
          priority: tasks[i].priority,
        };

        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(tasks[i]);
      }
    }

    setTasks(updatedTasks);

    if (selectedTask.completed === false) {
      addActivity("Task completed", selectedTask.title);
    } else {
      addActivity("Task marked as pending", selectedTask.title);
    }
  }


  // Delete task
  function deleteTask(taskId) {
    let selectedTask = null;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        selectedTask = tasks[i];
        break;
      }
    }

    if (selectedTask === null) {
      return;
    }

    const updatedTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== taskId) {
        updatedTasks.push(tasks[i]);
      }
    }

    setTasks(updatedTasks);

    addActivity("Task deleted", selectedTask.title);
  }


  // Edit task
  function editTask(taskId, newTitle, newPriority) {
    let oldTask = null;

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        oldTask = tasks[i];
        break;
      }
    }

    if (oldTask === null) {
      return;
    }

    const updatedTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        const updatedTask = {
          id: tasks[i].id,
          title: newTitle,
          completed: tasks[i].completed,
          priority: newPriority,
        };

        updatedTasks.push(updatedTask);
      } else {
        updatedTasks.push(tasks[i]);
      }
    }

    setTasks(updatedTasks);

    addActivity("Task edited", newTitle);
  }


  // Clear activity log
  function clearActivityLog() {
    setActivityLog([]);
  }


  // Task statistics
  const totalTasks = tasks.length;

  let completedTasks = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      completedTasks++;
    }
  }

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);


  // Count tasks for priority filters
  const tasksForPriorityCount = [];

  for (let i = 0; i < tasks.length; i++) {
    if (filterStatus === "Pending") {
      if (tasks[i].completed === false) {
        tasksForPriorityCount.push(tasks[i]);
      }
    } else if (filterStatus === "Completed") {
      if (tasks[i].completed === true) {
        tasksForPriorityCount.push(tasks[i]);
      }
    } else {
      tasksForPriorityCount.push(tasks[i]);
    }
  }

  let lowPriorityCount = 0;
  let mediumPriorityCount = 0;
  let highPriorityCount = 0;

  for (let i = 0; i < tasksForPriorityCount.length; i++) {
    const taskPriority = tasksForPriorityCount[i].priority || "Medium";

    if (taskPriority === "Low") {
      lowPriorityCount++;
    } else if (taskPriority === "Medium") {
      mediumPriorityCount++;
    } else if (taskPriority === "High") {
      highPriorityCount++;
    }
  }


  // Filter tasks
  const filteredTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const currentTask = tasks[i];

    const matchesSearch = currentTask.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesStatus = false;

    if (filterStatus === "All") {
      matchesStatus = true;
    } else if (filterStatus === "Pending" && currentTask.completed === false) {
      matchesStatus = true;
    } else if (filterStatus === "Completed" && currentTask.completed === true) {
      matchesStatus = true;
    }

    let matchesPriority = false;

    if (filterPriority === "All") {
      matchesPriority = true;
    } else if ((currentTask.priority || "Medium") === filterPriority) {
      matchesPriority = true;
    }

    if (matchesSearch && matchesStatus && matchesPriority) {
      filteredTasks.push(currentTask);
    }
  }


  return (
    <div className="app">
      <Header />

      <div className="main-layout">

        <Sidebar
          currentPage={currentPage}
          onChangePage={setCurrentPage}
        />

        <main className="main-content">

          {currentPage === "dashboard" && (
            <section className="tasks-section">
              <DashboardCharts tasks={tasks} />

              <h2>My Tasks</h2>

              {/* Search and filters panel */}
              <div className="filter-panel">

              <div className="search-box">
                <SearchIcon />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search tasks"
                  value={searchTerm}
                  onChange={function (event) {
                    setSearchTerm(event.target.value);
                  }}
                />
              </div>

              {/* Status filters */}
              <div className="filter-container">
                <span>Status:</span>
                {["All", "Pending", "Completed"].map(function (status) {
                  let count = 0;

                  if (status === "All") {
                    count = tasks.length;
                  } else if (status === "Pending") {
                    count = pendingTasks;
                  } else {
                    count = completedTasks;
                  }

                  return (
                    <button
                      key={status}
                      className={
                        filterStatus === status
                          ? "filter-button active"
                          : "filter-button"
                      }
                      onClick={function () {
                        setFilterStatus(status);
                      }}
                    >
                      {status}
                      <span className="filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>


              {/* Priority filters */}
              <div className="priority-filter-container">
                <span>Priority:</span>

                {[
                  { name: "All", count: tasksForPriorityCount.length },
                  { name: "Low", count: lowPriorityCount },
                  { name: "Medium", count: mediumPriorityCount },
                  { name: "High", count: highPriorityCount },
                ]
                  .filter(function (priority) {
                    return priority.name === "All" || priority.count > 0;
                  })
                  .map(function (priority) {
                    return (
                      <button
                        key={priority.name}
                        className={
                          filterPriority === priority.name
                            ? "filter-button active"
                            : "filter-button"
                        }
                        onClick={function () {
                          setFilterPriority(priority.name);
                        }}
                      >
                        {priority.name}
                        <span className="filter-count">{priority.count}</span>
                      </button>
                    );
                  })}
              </div>

              </div>


              <TaskForm onAddTask={addTask} />

              <TaskList
                tasks={filteredTasks}
                searchTerm={searchTerm}
                filterStatus={filterStatus}
                filterPriority={filterPriority}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
              />
            </section>
          )}


          {currentPage === "activity" && (
            <ActivityLog
              activityLog={activityLog}
              onClearLog={clearActivityLog}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
