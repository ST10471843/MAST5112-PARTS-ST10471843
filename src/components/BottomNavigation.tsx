// Bottom Navigation Bar with basic icons (no SVG)
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type NavigationItem = 'home' | 'edit' | 'menu';

type BottomNavigationProps = {
  activeTab: NavigationItem;
  onTabChange: (tab: NavigationItem) => void;
  userRole: 'chef' | 'client' | null;
};

// Simple Icon Component using emojis or text
function Icon({ name, color }: { name: NavigationItem; color: string }) {
  let icon = '';

  switch (name) {
    case 'home':
      icon = '🏠';
      break;
    case 'edit':
      icon = '✏️';
      break;
    case 'menu':
      icon = '📋';
      break;
  }

  return <Text style={{ fontSize: 24, color }}>{icon}</Text>;
}

export function BottomNavigation({ activeTab, onTabChange, userRole }: BottomNavigationProps) {
  const activeColor = 'rgba(152, 137, 50, 0.78)';
  const inactiveColor = '#999999';

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('home')}
        activeOpacity={0.7}
      >
        <Icon name="home" color={activeTab === 'home' ? activeColor : inactiveColor} />
        <Text style={[styles.label, activeTab === 'home' && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Edit Tab - Only show for chef */}
      {userRole === 'chef' && (
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('edit')}
          activeOpacity={0.7}
        >
          <Icon name="edit" color={activeTab === 'edit' ? activeColor : inactiveColor} />
          <Text style={[styles.label, activeTab === 'edit' && styles.activeLabel]}>
            Edit
          </Text>
        </TouchableOpacity>
      )}

      {/* Menu Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('menu')}
        activeOpacity={0.7}
      >
        <Icon name="menu" color={activeTab === 'menu' ? activeColor : inactiveColor} />
        <Text style={[styles.label, activeTab === 'menu' && styles.activeLabel]}>
          Menu
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  activeLabel: {
    color: 'rgba(152, 137, 50, 0.78)',
    fontWeight: '600',
  },
});
