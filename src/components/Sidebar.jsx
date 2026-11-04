
function Sidebar({ currentPage, onChangePage }) {
  return (
    <aside className="sidebar">
      <nav>
        <button
          className={
            currentPage === "dashboard"
              ? "sidebar-link active"
              : "sidebar-link"
          }
          onClick={function () {
            onChangePage("dashboard");
          }}
          type="button"
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className={
            currentPage === "activity"
              ? "sidebar-link active"
              : "sidebar-link"
          }
          onClick={function () {
            onChangePage("activity");
          }}
          type="button"
        >
          <span>◷</span>
          Activity Log
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
