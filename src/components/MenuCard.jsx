function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <div className="menu-card-image">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
        />
      </div>

      <div className="menu-card-info">
        <span className="menu-category">
          {item.category}
        </span>

        <h3>{item.name}</h3>

        {item.description && (
          <p className="menu-description">
            {item.description}
          </p>
        )}

        <div className="menu-card-bottom">
          <strong>৳{item.price}</strong>

          <button
            className="add-button"
            type="button"
            aria-label={`Add ${item.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;