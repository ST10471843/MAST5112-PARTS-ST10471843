import React, { useState } from 'react';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
};

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Add new item
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems([...menuItems, newItem]);
  };

  // Delete item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Edit item
  const editMenuItem = (id: string, updatedItem: Omit<MenuItem, 'id'>) => {
    setMenuItems(
      menuItems.map(item =>
        item.id === id ? { ...updatedItem, id } : item
      )
    );
  };

  // Search
  const searchMenuItems = () => {
    const query = searchQuery.toLowerCase();
    return menuItems.filter(
      item =>
        item.dishName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.course.toLowerCase().includes(query)
    );
  };

  // Get by course
  const getMenuItemsByCourse = (courseName: string) => {
    return menuItems.filter(item => item.course === courseName);
  };

  // Filtered results
  const displayedItems = searchMenuItems();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu Manager</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search menu..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add Example Button */}
      <button onClick={() => addMenuItem({ dishName: 'Pasta', description: 'Creamy Alfredo', course: 'Main' })}>
        Add Example Dish
      </button>

      {/* List Items */}
      <ul>
        {displayedItems.map(item => (
          <li key={item.id}>
            <b>{item.dishName}</b> - {item.description} ({item.course})
            <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
