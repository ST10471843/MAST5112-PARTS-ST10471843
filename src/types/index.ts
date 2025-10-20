export type Course = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
};

export type MenuContextType = {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  editMenuItem: (id: string, item: Omit<MenuItem, 'id'>) => void;
  searchMenuItems: (query: string) => MenuItem[];
  getMenuItemsByCourse: (courseName: string) => MenuItem[];
  userRole: 'chef' | 'customer' | null;
};
