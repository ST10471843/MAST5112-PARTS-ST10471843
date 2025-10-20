import React, { useState } from 'react';
import { MenuProvider } from './src/context/MenuContext';
import { FakeLoginScreen } from './src/screens/FakeLoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'chef' | 'customer' | null>(null);

  const handleLogin = (role: 'chef' | 'customer') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <MenuProvider userRole={userRole}>
      {!isLoggedIn ? (
        <FakeLoginScreen onLogin={handleLogin} />
      ) : (
        <HomeScreen onLogout={handleLogout} />
      )}
    </MenuProvider>
  );
}
