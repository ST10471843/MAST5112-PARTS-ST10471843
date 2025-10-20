import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  SectionList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { CourseList } from '../data/CourseList';

type HomeScreenProps = {
  onLogout: () => void;
};

export function HomeScreen({ onLogout }: HomeScreenProps) {
  const {
    menuItems,
    addMenuItem,
    deleteMenuItem,
    editMenuItem,
    searchMenuItems,
    getMenuItemsByCourse,
    userRole,
  } = useMenu();

  // Form state
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate average price for each course
  const getAveragePriceByCourse = (courseName: string): number => {
    const courseItems = getMenuItemsByCourse(courseName);
    if (courseItems.length === 0) return 0;

    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return total / courseItems.length;
  };

  // Validate form
  const validateForm = (): boolean => {
    if (dishName.trim() === '') {
      Alert.alert('Error', 'Please enter a dish name');
      return false;
    }
    if (description.trim() === '') {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (selectedCourse === '') {
      Alert.alert('Error', 'Please select a course');
      return false;
    }
    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price (numeric value greater than 0)');
      return false;
    }
    return true;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) return;

    const menuItem = {
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: Number(price),
    };

    if (editingId) {
      editMenuItem(editingId, menuItem);
      Alert.alert('Success', 'Menu item updated successfully!');
    } else {
      addMenuItem(menuItem);
      Alert.alert('Success', 'Menu item added successfully!');
    }

    handleClear();
  };

  // Handle clear
  const handleClear = () => {
    setDishName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (id: string) => {
    const item = menuItems.find((item) => item.id === id);
    if (item) {
      setDishName(item.dishName);
      setDescription(item.description);
      setSelectedCourse(item.course);
      setPrice(item.price.toString());
      setEditingId(id);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMenuItem(id);
            if (editingId === id) {
              handleClear();
            }
          },
        },
      ]
    );
  };

  // Prepare section data for SectionList
  const getSectionData = () => {
    return CourseList.map((course) => ({
      title: course.name,
      data: getMenuItemsByCourse(course.name),
    })).filter((section) => section.data.length > 0);
  };

  // Filter items based on search
  const filteredItems = searchQuery
    ? searchMenuItems(searchQuery)
    : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chef Christoffel's Menu</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Top Half: Home Content - Prepared Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prepared Menu</Text>

          {/* Course Price Summary */}
          <View style={styles.courseSummary}>
            <View style={styles.courseSummaryItem}>
              <Text style={styles.courseSummaryLabel}>Any price of</Text>
              <Text style={styles.courseSummaryText}>Dessert</Text>
              <Text style={styles.courseSummaryPrice}>
                (R{getAveragePriceByCourse('Desserts').toFixed(0)})
              </Text>
            </View>
            <View style={styles.courseSummaryItem}>
              <Text style={styles.courseSummaryLabel}>Any price of</Text>
              <Text style={styles.courseSummaryText}>Appetizer</Text>
              <Text style={styles.courseSummaryPrice}>
                (R{getAveragePriceByCourse('Starters').toFixed(0)})
              </Text>
            </View>
            <View style={styles.courseSummaryItem}>
              <Text style={styles.courseSummaryLabel}>Any price of</Text>
              <Text style={styles.courseSummaryText}>Main</Text>
              <Text style={styles.courseSummaryPrice}>
                (R{getAveragePriceByCourse('Mains').toFixed(0)})
              </Text>
            </View>
          </View>

          <Text style={styles.menuTitle}>3 Course Menu</Text>

          {/* Menu Display - SectionList organized by courses */}
          {menuItems.length > 0 ? (
            <View>
              <SectionList
                sections={getSectionData()}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.courseTitle}>{title}</Text>
                )}
                renderItem={({ item }) => (
                  <View style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                      <Text style={styles.menuItemName}>{item.dishName}</Text>
                      <Text style={styles.menuItemDescription}>
                        {item.description}
                      </Text>
                      <Text style={styles.menuItemPrice}>
                        R{item.price.toFixed(2)}
                      </Text>
                    </View>
                    {userRole === 'chef' && (
                      <View style={styles.menuItemActions}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => handleEdit(item.id)}
                        >
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDelete(item.id)}
                        >
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              />

              {/* Total Items Count with underlined text */}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                  Total Items: {menuItems.length}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No menu items yet.{' '}
                {userRole === 'chef'
                  ? 'Add your first item below!'
                  : 'Please check back later.'}
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Half: Menu Management - Only for Chef */}
        {userRole === 'chef' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu Management</Text>

            {/* Dish Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dish Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter dish name"
                value={dishName}
                onChangeText={setDishName}
              />
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Course Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCourse}
                  onValueChange={(itemValue) => setSelectedCourse(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a course" value="" />
                  {CourseList.map((course) => (
                    <Picker.Item
                      key={course.id}
                      label={course.name}
                      value={course.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Price Input - Numeric Keyboard */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price (R)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>
                  {editingId ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleClear}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {editingId && (
              <Text style={styles.editingText}>
                Editing menu item - Click Update to save changes
              </Text>
            )}

            {/* Search Functionality */}
            <View style={styles.searchSection}>
              <Text style={styles.label}>Search Menu</Text>
              <TextInput
                style={styles.input}
                placeholder="Search by name or description..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {searchQuery !== '' && (
                <View style={styles.searchResults}>
                  <Text style={styles.searchResultsTitle}>
                    Search Results ({filteredItems.length})
                  </Text>
                  {filteredItems.map((item) => (
                    <View key={item.id} style={styles.searchResultItem}>
                      <Text style={styles.searchResultName}>
                        {item.dishName}
                      </Text>
                      <Text style={styles.searchResultCourse}>
                        {item.course}
                      </Text>
                      <Text style={styles.searchResultPrice}>
                        R{item.price.toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDF8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D1C4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C9A961',
  },
  logoutButton: {
    backgroundColor: '#8B9456',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5C4A3C',
    marginBottom: 16,
  },
  courseSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  courseSummaryItem: {
    flex: 1,
    backgroundColor: '#F5F5E8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  courseSummaryLabel: {
    fontSize: 12,
    color: '#8B8167',
    marginBottom: 4,
  },
  courseSummaryText: {
    fontSize: 14,
    color: '#5C4A3C',
    marginBottom: 4,
  },
  courseSummaryPrice: {
    fontSize: 12,
    color: '#8B8167',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C4A3C',
    textAlign: 'center',
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5C4A3C',
    marginTop: 16,
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: '#F5F5E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemContent: {
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A3C',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8B8167',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B9456',
  },
  menuItemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#8B9456',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
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
  totalContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#D4D1C4',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A3C',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#8B8167',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A3C',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5E8',
    borderWidth: 1,
    borderColor: '#D4D1C4',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#5C4A3C',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#F5F5E8',
    borderWidth: 1,
    borderColor: '#D4D1C4',
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#8B9456',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#F5F5E8',
  },
  clearButtonText: {
    color: '#5C4A3C',
    fontSize: 16,
    fontWeight: '600',
  },
  editingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#8B9456',
    textAlign: 'center',
  },
  searchSection: {
    marginTop: 24,
  },
  searchResults: {
    marginTop: 12,
  },
  searchResultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A3C',
    marginBottom: 8,
  },
  searchResultItem: {
    backgroundColor: '#F5F5E8',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A3C',
  },
  searchResultCourse: {
    fontSize: 14,
    color: '#8B8167',
    marginTop: 4,
  },
  searchResultPrice: {
    fontSize: 14,
    color: '#8B9456',
    marginTop: 4,
  },
});
