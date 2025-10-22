import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';
import { CourseList } from '../data/CourseList';
import { MenuList } from '../components/MenuList';
import { BottomNavigation } from '../components/BottomNavigation';
import { Course, MenuItem } from '../types';

type HomeScreenProps = {
  onLogout: () => void;
};

type NavigationTab = 'home' | 'edit' | 'menu';

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

 
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

 
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(''); // will validate before save
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // optional image URL
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

 

  // Get average price for a course(PART3)
  const getAveragePriceByCourse = (courseName: string): number => {
    const courseItems = getMenuItemsByCourse(courseName);
    if (!courseItems || courseItems.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < courseItems.length; i++) {
      total += courseItems[i].price;
    }
    return total / courseItems.length;
  };

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

  // Save or update menu item
  const handleSave = () => {
    if (!validateForm()) return;

    const menuItemPayload = {
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: Number(price),
      image: image.trim() || undefined,
    };

    if (editingId) {
      editMenuItem(editingId, menuItemPayload);
      Alert.alert('Success', 'Menu item updated successfully!');
    } else {
      addMenuItem(menuItemPayload);
      Alert.alert('Success', 'Menu item added successfully!');
    }

    handleClear();
    setActiveTab('home');
  };

  const handleClear = () => {
    setDishName('');
    setDescription('');
    setSelectedCourse('');
    setPrice('');
    setImage('');
    setEditingId(null);
  };

  // Open item in form for editing
  const handleEdit = (id: string) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    setDishName(item.dishName);
    setDescription(item.description);
    setSelectedCourse(item.course);
    setPrice(String(item.price));
    setImage((item as MenuItem).image ?? '');
    setEditingId(id);
    setActiveTab('edit');
  };

  // Delete item (confirm first)
  const handleDelete = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this menu item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteMenuItem(id);
          // If we were editing this item, clear the form
          if (editingId === id) {
            handleClear();
          }
        },
      },
    ]);
  };

  // Course item renderer for Horizontal FlatList
  const renderCourseItem = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.courseChip} activeOpacity={0.7}>
      <Text style={styles.courseChipText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Search results (trigger on button)
  const handleSearch = () => {
    setSearchTriggered(true);
    setActiveTab('menu');
  };

  const handleClearSearch = () => {
    setSearchTriggered(false);
    setSearchQuery('');
  };

  const filteredItems = searchTriggered && searchQuery.trim() !== '' ? searchMenuItems(searchQuery) : menuItems;



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Christoffel's Menu</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <View style={styles.homeSection}>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Avg price of</Text>
                <Text style={styles.summaryText}>Dessert</Text>
                <Text style={styles.summaryPrice}>
                  (R{getAveragePriceByCourse('Desserts').toFixed(0)})
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Avg price of</Text>
                <Text style={styles.summaryText}>Starter</Text>
                <Text style={styles.summaryPrice}>
                  (R{getAveragePriceByCourse('Starters').toFixed(0)})
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Avg price of</Text>
                <Text style={styles.summaryText}>Main</Text>
                <Text style={styles.summaryPrice}>
                  (R{getAveragePriceByCourse('Mains').toFixed(0)})
                </Text>
              </View>
            </View>

            <FlatList
              data={CourseList}
              renderItem={renderCourseItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.courseList}
            />

            <Text style={styles.menuTitle}>Prepared Menu</Text>

            {menuItems.length > 0 ? (
              <>
                <MenuList onEdit={userRole === 'chef' ? handleEdit : undefined} onDelete={userRole === 'chef' ? handleDelete : undefined} />

                <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Total Items: {menuItems.length}</Text>
                  <View style={styles.underline} />
                </View>
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No menu items yet. {userRole === 'chef' ? 'Switch to Edit tab to add items!' : 'Please check back later.'}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* EDIT TAB - visible only for chef */}
        {activeTab === 'edit' && userRole === 'chef' && (
          <View style={styles.managementSection}>
            <Text style={styles.sectionTitle}>Menu Management</Text>

            {/* Image URL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Image URL (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="https://example.com/image.jpg"
                value={image}
                onChangeText={setImage}
                placeholderTextColor="#999999"
              />
            </View>

            {/* Dish Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dish Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter dish name"
                value={dishName}
                onChangeText={setDishName}
                placeholderTextColor="#999999"
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#999999"
              />
            </View>

            {/* Course Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Course</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={selectedCourse} onValueChange={(v) => setSelectedCourse(String(v))} style={styles.picker}>
                  <Picker.Item label="Select a course" value="" />
                  {CourseList.map((course) => (
                    <Picker.Item key={course.id} label={course.name} value={course.name} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Price */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price (R)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#999999"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave} activeOpacity={0.8}>
                <Text style={styles.saveButtonText}>{editingId ? 'Update' : 'Save'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear} activeOpacity={0.8}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {editingId && <Text style={styles.editingText}>Editing menu item - Click Update to save changes</Text>}
          </View>
        )}

        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Browse Menu</Text>

            {/* Search row */}
            <View style={styles.searchRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Search menu items..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999999"
              />

              <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.8}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.searchButton, { marginLeft: 8, backgroundColor: 'rgba(0,0,0,0.08)' }]} onPress={handleClearSearch} activeOpacity={0.8}>
                <Text style={[styles.searchButtonText, { color: '#333' }]}>Clear</Text>
              </TouchableOpacity>
            </View>

            {searchTriggered ? (
              <View style={styles.searchResults}>
                <Text style={styles.searchResultsTitle}>Results ({filteredItems.length})</Text>
                {filteredItems.map((item) => (
                  <View key={item.id} style={styles.searchResultItem}>
                    <Text style={styles.searchResultName}>{item.dishName}</Text>
                    <Text style={styles.searchResultCourse}>{item.course}</Text>
                    <Text style={styles.searchResultPrice}>R{item.price.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <>
                <Text style={styles.menuTitle}>Full Menu</Text>
                <MenuList onEdit={userRole === 'chef' ? handleEdit : undefined} onDelete={userRole === 'chef' ? handleDelete : undefined} />
              </>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} userRole={userRole} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDF8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: 'rgba(152, 137, 50, 0.78)' },
  logoutButton: { backgroundColor: 'rgba(152, 137, 50, 0.78)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  logoutButtonText: { color: '#ffffff', fontWeight: '600' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 90 },

  homeSection: { padding: 16 },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, gap: 8 },
  summaryItem: { flex: 1, backgroundColor: 'rgba(152, 137, 50, 0.19)', padding: 12, borderRadius: 8, alignItems: 'center' },
  summaryLabel: { fontSize: 10, color: '#666666', marginBottom: 4 },
  summaryText: { fontSize: 12, fontWeight: '600', color: '#000000', marginBottom: 4 },
  summaryPrice: { fontSize: 11, color: '#666666' },

  courseList: { paddingVertical: 8, gap: 8 },
  courseChip: { backgroundColor: 'rgba(152, 137, 50, 0.19)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  courseChipText: { color: 'rgba(152, 137, 50, 0.78)', fontWeight: '600', fontSize: 14 },

  menuTitle: { fontSize: 20, fontWeight: '700', color: '#000000', textAlign: 'center', marginVertical: 16 },
  totalContainer: { marginTop: 16, paddingTop: 16, alignItems: 'center' },
  totalText: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 4 },
  underline: { width: 150, height: 1, backgroundColor: '#000000' },

  emptyContainer: { paddingVertical: 40, alignItems: 'center' },
  emptyText: { fontSize: 14, color: '#666666', textAlign: 'center' },

  managementSection: { padding: 16 },
  menuSection: { padding: 16 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#000000', marginBottom: 20 },

  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 8 },
  input: { backgroundColor: 'rgba(152, 137, 50, 0.19)', borderWidth: 1, borderColor: 'rgba(152, 137, 50, 0.3)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, color: '#000000' },
  textArea: { height: 100, textAlignVertical: 'top' },
  pickerContainer: { backgroundColor: 'rgba(152, 137, 50, 0.19)', borderWidth: 1, borderColor: 'rgba(152, 137, 50, 0.3)', borderRadius: 8, overflow: 'hidden' },
  picker: { height: 50 },

  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  button: { flex: 1, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  saveButton: { backgroundColor: 'rgba(152, 137, 50, 0.78)' },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  clearButton: { backgroundColor: 'rgba(152, 137, 50, 0.19)', borderWidth: 1, borderColor: 'rgba(152, 137, 50, 0.3)' },
  clearButtonText: { color: 'rgba(152, 137, 50, 0.78)', fontSize: 16, fontWeight: '700' },
  editingText: { marginTop: 12, fontSize: 14, color: 'rgba(152, 137, 50, 0.78)', textAlign: 'center', fontWeight: '600' },

  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  searchButton: { backgroundColor: 'rgba(152, 137, 50, 0.78)', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  searchButtonText: { color: '#ffffff', fontWeight: '700' },

  searchResults: { marginTop: 12 },
  searchResultsTitle: { fontSize: 16, fontWeight: '600', color: '#000000', marginBottom: 8 },
  searchResultItem: { backgroundColor: 'rgba(152, 137, 50, 0.19)', padding: 12, borderRadius: 8, marginBottom: 8 },
  searchResultName: { fontSize: 16, fontWeight: '600', color: '#000000' },
  searchResultCourse: { fontSize: 14, color: '#666666', marginTop: 4 },
  searchResultPrice: { fontSize: 14, color: 'rgba(152, 137, 50, 0.78)', marginTop: 4 },
});

