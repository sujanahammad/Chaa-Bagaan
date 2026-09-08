import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "new-order":
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">🛒</div>
            <h2>New Order</h2>
            <p>
              The new order system will be added in Section 4.
            </p>
          </div>
        );

      case "history":
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">📋</div>
            <h2>Order History</h2>
            <p>
              Order history will be added in Section 7.
            </p>
          </div>
        );

      case "reports":
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">📊</div>
            <h2>Reports</h2>
            <p>
              Sales and reports will be added in Section 8.
            </p>
          </div>
        );

      case "settings":
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">⚙</div>
            <h2>Settings</h2>
            <p>
              Business settings will be added in Section 9.
            </p>
          </div>
        );

      default:
        return <MenuDashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <header className="top-header">
          <div>
            <span className="welcome-text">Welcome back</span>
            <h1>CHAA BAGAAN</h1>
          </div>

          <button className="profile-button">
            👤
          </button>
        </header>

        <section className="page-content">
          {renderPage()}
        </section>
      </main>

      <MobileNav
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </div>
  );
}

function MenuDashboard() {
  const categories = [
    "All",
    "Tea",
    "Food",
    "Snacks",
    "Drinks",
  ];

  const sampleItems = [
    {
      name: "CHAA BAGAAN Special Tea",
      category: "Tea",
      price: 100,
      icon: "☕",
    },
    {
      name: "Regular Milk Tea",
      category: "Tea",
      price: 40,
      icon: "🍵",
    },
    {
      name: "Chicken Burger",
      category: "Food",
      price: 150,
      icon: "🍔",
    },
    {
      name: "French Fries",
      category: "Snacks",
      price: 100,
      icon: "🍟",
    },
    {
      name: "Chicken Nuggets",
      category: "Snacks",
      price: 120,
      icon: "🍗",
    },
    {
      name: "Cold Coffee",
      category: "Drinks",
      price: 120,
      icon: "🥤",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? sampleItems
      : sampleItems.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="menu-dashboard">
      <div className="menu-heading">
        <div>
          <span className="section-label">BUSINESS MENU</span>
          <h2>Menu</h2>
          <p>Select an item to start an order.</p>
        </div>

        <div className="menu-count">
          <strong>{sampleItems.length}</strong>
          <span>Items</span>
        </div>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div className="menu-card" key={item.name}>
            <div className="menu-card-image">
              <span>{item.icon}</span>
            </div>

            <div className="menu-card-info">
              <span className="menu-category">
                {item.category}
              </span>

              <h3>{item.name}</h3>

              <div className="menu-card-bottom">
                <strong>৳{item.price}</strong>

                <button className="add-button">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;