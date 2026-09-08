function MobileNav({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: "⌂",
    },
    {
      id: "new-order",
      label: "Order",
      icon: "🛒",
    },
    {
      id: "history",
      label: "Orders",
      icon: "📋",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  return (
    <nav className="mobile-nav">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-item ${
            activePage === item.id ? "active" : ""
          }`}
          onClick={() => setActivePage(item.id)}
        >
          <span>{item.icon}</span>
          <small>{item.label}</small>
        </button>
      ))}
    </nav>
  );
}

export default MobileNav;