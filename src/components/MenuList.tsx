// MenuList component - displays menu items organized by course in a SectionList
import React from 'react'; 
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useMenu } from '../context/MenuContext';
import { CourseList } from '../data/CourseList';

type MenuListProps = {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function MenuList({ onEdit, onDelete }: MenuListProps) {
  const { getMenuItemsByCourse, userRole } = useMenu();

  // Prepare section data for SectionList
  const getSectionData = () => {
    const sections = [];

    for (let i = 0; i < CourseList.length; i++) {
      const course = CourseList[i];
      const courseItems = getMenuItemsByCourse(course.name) ?? [];

      if (courseItems.length > 0) {
        sections.push({
          title: course.name,
          data: courseItems,
        });
      }
    }

    return sections;
  };

  return (
    // Inside MenuList, wherever you render the FlatList or SectionList
    <SectionList
      sections={getSectionData()}
      nestedScrollEnabled  // <--- add this here
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>

          {userRole === 'chef' && (onEdit || onDelete) && (
            <View style={styles.actions}>
              {onEdit && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => onEdit(item.id)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              {onDelete && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No menu items yet.{' '}
            {userRole === 'chef'
              ? 'Add your first item below!'
              : 'Please check back later.'}
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: 'rgba(152, 137, 50, 0.19)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemContent: {
    marginBottom: 8,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(152, 137, 50, 0.78)',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    backgroundColor: 'rgba(152, 137, 50, 0.78)',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d4183d',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
