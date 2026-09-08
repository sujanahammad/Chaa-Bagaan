import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/config";

import {
  subscribeToMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menuService";

function MenuManagement() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Tea",
    price: "",
    image: "",
    description: "",
    available: true,
  });

  useEffect(() => {
    let unsubscribeMenu = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        if (unsubscribeMenu) unsubscribeMenu();

        unsubscribeMenu = subscribeToMenuItems(
          currentUser.uid,
          (menuItems) => {
            setItems(menuItems);
            setLoading(false);
          },
          (error) => {
            console.error("Error loading menu:", error);
            setLoading(false);
          }
        );
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeMenu) unsubscribeMenu();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Tea",
      price: "",
      image: "",
      description: "",
      available: true,
    });

    setEditingItem(null);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Item name দিন।");
      return;
    }

    if (!formData.price) {
      alert("Item price দিন।");
      return;
    }

    if (!formData.image.trim()) {
      alert("Image URL দিন।");
      return;
    }

    try {
      setSaving(true);

      const itemData = {
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        image: formData.image.trim(),
        description: formData.description.trim(),
        available: formData.available,
      };

      if (editingItem) {
        await updateMenuItem(user.uid, editingItem.id, itemData);
      } else {
        await addMenuItem(user.uid, itemData);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Menu item save করতে সমস্যা হয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    setFormData({
      name: item.name || "",
      category: item.category || "Tea",
      price: item.price || "",
      image: item.image || "",
      description: item.description || "",
      available: item.available !== false,
    });

    setShowForm(true);
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(`"${item.name}" delete করতে চান?`);

    if (!confirmed) return;

    try {
      await deleteMenuItem(user.uid, item.id);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Item delete করতে সমস্যা হয়েছে।");
    }
  };

  const toggleAvailability = async (item) => {
    try {
      await updateMenuItem(user.uid, item.id, {
        available: !item.available,
      });
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Availability update করতে সমস্যা হয়েছে।");
    }
  };

  if (loading) {
    return (
      <div className="menu-management-loading">
        <div className="loading-spinner"></div>
        <p>Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="menu-management">
      <div className="management-header">
        <div>
          <span className="section-label">MENU MANAGEMENT</span>
          <h2>Manage Menu</h2>
          <p>Add and manage your food and drinks.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingItem(null);
            setFormData({
              name: "",
              category: "Tea",
              price: "",
              image: "",
              description: "",
              available: true,
            });
            setShowForm(true);
          }}
        >
          + Add Item
        </button>
      </div>

      {showForm && (
        <div className="menu-form-card">
          <div className="form-header">
            <div>
              <h3>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h3>
              <p>Add the details of your menu item.</p>
            </div>

            <button
              className="close-button"
              onClick={resetForm}
              type="button"
            >
              ×
            </button>
          </div>

          <form className="menu-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Chicken Burger"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Tea">Tea</option>
                  <option value="Food">Food</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price (৳)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group form-group-full">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description of the item"
                  rows="3"
                />
              </div>

              <div className="availability-control">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                  />
                  <span>Available for orders</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingItem
                  ? "Update Item"
                  : "Save Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <div className="empty-management">
          <div className="empty-management-icon">🍵</div>
          <h3>Your menu is empty</h3>
          <p>Add your first menu item to get started.</p>

          <button
            className="primary-button"
            onClick={() => setShowForm(true)}
          >
            + Add First Item
          </button>
        </div>
      ) : (
        <div className="management-grid">
          {items.map((item) => (
            <div
              className={`management-card ${
                !item.available ? "unavailable" : ""
              }`}
              key={item.id}
            >
              <div className="management-image">
                <img src={item.image} alt={item.name} />

                {!item.available && (
                  <span className="unavailable-badge">Unavailable</span>
                )}
              </div>

              <div className="management-info">
                <span className="menu-category">{item.category}</span>
                <h3>{item.name}</h3>

                {item.description && <p>{item.description}</p>}

                <strong>৳{item.price}</strong>

                <div className="management-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="availability-button"
                    onClick={() => toggleAvailability(item)}
                  >
                    {item.available ? "Disable" : "Enable"}
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuManagement;