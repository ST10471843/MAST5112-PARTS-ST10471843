import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem, MenuContextType } from '../types';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuProviderProps = {
  children: ReactNode;
  userRole: 'chef' | 'client' | null;
};

export function MenuProvider({ children, userRole }: MenuProviderProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Add menu item
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
  };

  // Delete menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Edit menu item
  const editMenuItem = (id: string, updatedItem: Omit<MenuItem, 'id'>) => {
    setMenuItems(
      menuItems.map(item =>
        item.id === id ? { ...updatedItem, id } : item
      )
    );
  };

  // Search menu items
  const searchMenuItems = (query: string): MenuItem[] => {
    const lowerQuery = query.toLowerCase();
    return menuItems.filter(
      item =>
        item.dishName.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.course.toLowerCase().includes(lowerQuery)
    );
  };

  // Get menu items by course
  const getMenuItemsByCourse = (courseName: string): MenuItem[] => {
    return menuItems.filter(item => item.course === courseName);
  };

  const value: MenuContextType = {
    menuItems,
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    searchMenuItems,
    getMenuItemsByCourse,
    userRole,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu(): MenuContextType {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
