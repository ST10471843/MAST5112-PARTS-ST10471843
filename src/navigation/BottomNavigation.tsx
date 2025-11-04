import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type NavigationItem = 'home' | 'edit' | 'menu';

type BottomNavigationProps = {
  activeTab: NavigationItem;
  onTabChange: (tab: NavigationItem) => void;
  userRole: 'chef' | 'client' | null;
};

export function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={30} height={24} viewBox="0 0 30 24" fill="none">
      <Path
        d="M5 10L15 2L25 10V22H19V15H11V22H5V10Z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

// Edit Icon Component
export function EditIcon({ color }: { color: string }) {
  return (
    <Svg width={30} height={24} viewBox="0 0 30 24" fill="none">
      <Path
        d="M6.25 19H8.03125L20.25 9.225L18.4688 7.8L6.25 17.575V19ZM3.75 21V16.75L20.25 3.575C20.5 3.39167 20.776 3.25 21.0781 3.15C21.3802 3.05 21.6979 3 22.0312 3C22.3646 3 22.6875 3.05 23 3.15C23.3125 3.25 23.5833 3.4 23.8125 3.6L25.5313 5C25.7813 5.18333 25.9635 5.4 26.0781 5.65C26.1927 5.9 26.25 6.15 26.25 6.4C26.25 6.66667 26.1927 6.92083 26.0781 7.1625C25.9635 7.40417 25.7813 7.625 25.5313 7.825L9.0625 21H3.75ZM19.3438 8.525L18.4688 7.8L20.25 9.225L19.3438 8.525Z"
        fill={color}
      />
    </Svg>
  );
}

// Menu Icon Component
export function MenuIcon({ color }: { color: string }) {
  return (
    <Svg width={30} height={24} viewBox="0 0 30 24" fill="none">
      <Path
        d="M3 6H27M3 12H27M3 18H27"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
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
        <HomeIcon color={activeTab === 'home' ? activeColor : inactiveColor} />
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
          <EditIcon color={activeTab === 'edit' ? activeColor : inactiveColor} />
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
        <MenuIcon color={activeTab === 'menu' ? activeColor : inactiveColor} />
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
