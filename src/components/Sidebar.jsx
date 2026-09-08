function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      id: "new-order",
      label: "New Order",
      icon: "🛒",
    },
    {
      id: "history",
      label: "Order History",
      icon: "📋",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "📊",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">☕</div>

        <div>
          <h2>CHAA BAGAAN</h2>
          <p>Business Manager</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-help">
          <span>☕</span>

          <div>
            <strong>CHAA BAGAAN</strong>
            <small>Manage your business</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;