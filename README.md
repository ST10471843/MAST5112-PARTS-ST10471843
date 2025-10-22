# Chef Christoffel Menu Management App

-**Student Name:** Nkhensani Bontle Mathebula
-**Student Number:** ST10471843
-**Course:** Mobile App Scripting (MAST5112)  

## Project Links

- GitHub Repository: https://github.com/ST10471843/MAST5112-PARTS-ST10471843.git
- YouTube Video : https://youtu.be/kVaI92xWjaM?si=jfEZWWJ-8Wug8PCr
  
---

## Project Overview

This is a mobile application developed for Christoffel, a private chef who provides personalized culinary experiences. The app allows the chef to manage his menu digitally, making it easy to update offerings for different clients and dining experiences.

## Built with:
- React Native
- TypeScript
- Expo

##  Purpose & Features

### Purpose
Christoffel needs a flexible digital menu management system because every night can bring a different dining experience. This app streamlines menu operations and enables him to deliver exceptional culinary experiences tailored to each client's preferences.

### Key Features (Part 2)

 #### Menu Management (Chef)
- Add new menu items with dish name, description, course, and price
- Edit existing menu items
- Delete menu items with confirmation
- Select from predefined course list (Starters, Mains, Desserts, Beverages)

#### Menu Display
- View prepared menu organized by courses
- See total number of menu items
- View average price per course
- Browse courses in horizontal list

#### Search Functionality
- Search menu items by name, description, or course
- View filtered results

#### Role-Based Access
- Chef: Full access to menu management
- Client: View-only access to prepared menu

#### User Interface
- Clean, professional design with custom color scheme
- Numeric keyboard for price entry
- Alert messages for errors and confirmations
- Bottom navigation with custom icons
- ScrollView layout with Home and Menu Management sections

---

##  Design Overview

### Navigation
Custom bottom navigation bar with three tabs:
- Home: View prepared menu and course summaries
- Edit:Menu management (Chef only)
- Menu: Search and browse full menu

### Screen Layout

- ScrollView containing both sections
- Top Half: Home content (prepared menu, course chips, totals)
- Bottom Half: Menu management (inputs, picker, buttons)

---

##  Navigation & Flow

### User Flow


Login Screen,
"Chef" or "Client"
    
Home Screen (3 tabs)
Home Tab: View prepared menu
Edit Tab: Manage menu items, Viewed by the chef only
Menu Tab: Search and browse


### Navigation Dependencies
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `react-native-screens`
- `react-native-safe-area-context`

---

## Technologies & Dependencies

### Core
- React Native
- TypeScript
- Expo

### Key Libraries
- `@react-native-picker/picker` - Course selection
- `@react-native-async-storage/async-storage`
- `@react-navigation/native` - Navigation
- `@react-navigation/native-stack`  - Stack navigation
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context`- Safe area handling
- `react-native-svg`  - Custom navigation icons

---

## File/Folder Structure

```

├── App.tsx                          # Main entry point
├── package.json                     # Dependencies
├── app.json                         # Expo configuration
├── tsconfig.json                    # TypeScript config
├── /src
│   ├── /components
│   │   ├── MenuList.tsx            # SectionList component for menu
│   │   └── BottomNavigation.tsx    # Bottom nav with custom icons
│   ├── /screens
│   │   ├── FakeLoginScreen.tsx     # Role selection screen
│   │   └── HomeScreen.tsx          # Main screen (Home + Management)
│   ├── /context
│   │   └── MenuContext.tsx         # Global state (Context API)
│   ├── /data
│   │   └── CourseList.ts           # Predefined course array
│   └── /types
│       └── index.ts                # TypeScript type definitions
```

---

## 📷 Screenshots

1. **Login Screen**:
2. **Home Tab - Prepared Menu**:
3. **Edit Tab - Menu Management**:
4. **Menu Tab - Search**:

---

## Video Demonstration

**YouTube Link:** https://youtu.be/kVaI92xWjaM?si=jfEZWWJ-8Wug8PCr or incase it doesnt open: https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fyoutu.be%2FkVaI92xWjaM%3Fsi%3D-fSIdnNRNQhiMs80&data=05%7C02%7CST10471843%40vcconnect.edu.za%7C49f112239a364400dfc308de11a4bf4e%7Ce10c8f44f469448fbc0dd781288ff01b%7C0%7C0%7C638967596473910659%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=OlWJ9K32YEveen2cX8eXHifwlV%2Bkq1Meo0TdYpycrtU%3D&reserved=0 

### Video Content:
- App login
- Chef role demonstration
- Adding menu items
- Testing validation (errors)
- Editing and deleting items
- Search functionality
- Client role (view-only)


---

##  Changelog

### 2025-01-20 

**Initial Setup**
- Created project structure using Expo
- Installed all required dependencies
- Set up TypeScript configuration

**Management**
- Created `MenuContext.tsx` with global state
- Implemented add, edit, delete, search functions
- Added `getMenuItemsByCourse` for course filtering

**Data & Types**
- Created `CourseList.ts` with predefined courses array
- Defined TypeScript types for MenuItem and Course
- Implemented type-safe context

**Components**
- Built `MenuList.tsx` using SectionList for course organization
- Created `BottomNavigation.tsx` with custom SVG icons
- Implemented role-based rendering (Chef vs Client)

**Screens**
- `FakeLoginScreen.tsx`: Role selection with custom styling
- `HomeScreen.tsx`: Combined Home and Menu Management sections
  - Top half: Prepared menu display
  - Bottom half: Menu management (Chef only)
  - ScrollView layout as per requirements

### 2025-10-22
**Features Implemented**
- Form inputs (TextInput for name, description, price)
- Picker component for course selection
- Numeric keyboard for price input
- Save and Clear buttons (TouchableOpacity)
- Alert messages for validation and confirmations
- Search functionality with filtered results
- Total items count with underline effect
- Average price per course calculation
- Horizontal course FlatList (visual only)
- SectionList for organized menu display


**UI/UX**
- Applied custom color scheme
- Custom navigation icons from Figma
- Consistent spacing and typography
- Professional, clean design

---

## Challenges, Learnings & Reflections

### Challenges Faced

**1. SectionList Implementation**
- Challenge: Organizing menu items by course dynamically
- Solution: Used for loops with if statements to filter courses with items
- Learning: Understanding data transformation for SectionList structure

**2. Form Validation**
- Challenge: Ensuring all fields are valid before saving
- Solution: Created `validateForm()` function with Alert messages
- Learning: User feedback is crucial for good UX

**3. Numeric Keyboard**
- Challenge: Restricting price input to numbers only
- Solution: Used `keyboardType="numeric"` prop
- Learning: React Native provides mobile-specific input types

**4. Role-Based Rendering**
- Challenge: Hiding menu management from clients
- Solution: Global userRole variable passed through Context
- Learning: Conditional rendering based on user permissions

### What I Would Do Differently

- Add more comprehensive error handling
- Add loading states for better feedback
- Consider adding animations for better UX

## List of figures: 

-**Login Screen**: <img width="330" height="500" alt="image" src="https://github.com/user-attachments/assets/e00eb48c-8695-4fbf-b0ec-ec896ff761d0" />
---
-**Home Screen before added items**: <img width="331" height="500" alt="image" src="https://github.com/user-attachments/assets/04a0a4fb-5968-467a-b32e-7ee6b146e8fc" />
---
- **View Menu Screen before menu items**: <img width="324" height="500" alt="image" src="https://github.com/user-attachments/assets/4229a2c5-f309-4ced-be43-37947a339a21" />
---
- **Menu Management Screen**: <img width="333" height="500" alt="image" src="https://github.com/user-attachments/assets/0600bae0-f29f-4816-aa27-e14dc2ca54f5" />
---
-**Home Screen with Menu item Chefs View**: <img width="328" height="500" alt="image" src="https://github.com/user-attachments/assets/19629791-4603-4757-87e6-4ee7c9d554f8" />

---
-**Menu Screen with item chefs view**: <img width="327" height="500" alt="image" src="https://github.com/user-attachments/assets/5844735c-3d7d-4bc8-875c-7f90de03b0bf" />
---
-**Navigation bar**: <img width="331" height="65" alt="image" src="https://github.com/user-attachments/assets/ac19596d-817f-4680-81d0-2f5b1b217d61" />

---
-**Menu Screen with item clients view**: <img width="331" height="500" alt="image" src="https://github.com/user-attachments/assets/db1aa42f-fcd2-4db9-bcd1-434904450551" />

---
-**Error Handling**: <img width="326" height="500" alt="image" src="https://github.com/user-attachments/assets/cfad6c7d-bced-43e9-8709-fa025335c520" />

---
-**Search Functionality**: <img width="328" height="500" alt="image" src="https://github.com/user-attachments/assets/74d718df-0ccf-4c89-b03a-29a52a6fffa9" />

---
-**Navigation ba for Client**: <img width="330" height="500" alt="image" src="https://github.com/user-attachments/assets/de50d4d4-61c8-461c-a846-410de304f7e0" />

---

## References

-Expo Software Inc., 2025. Expo . Available at: https://expo.dev
 (Accessed on: 20 October 2025).

-Facebook Inc., 2025. @react-native-picker/picker . Available at: https://github.com/react-native-picker/picker
 (Accessed on: 21 October 2025).

-Facebook Inc., 2025. @react-navigation/stack ]. Available at: https://reactnavigation.org/docs/stack-navigator
 (Accessed on: 22 October 2025).

-Lucide Icons Contributors, 2025. lucide-react. Available at: https://lucide.dev
 (Accessed on: 20October 2025).

-Meta Platforms Inc., 2025. React . Available at: https://react.dev
 (Accessed on: 22 October 2025).

-Meta Platforms Inc., 2025. React Native . Available at: https://reactnative.dev
 (Accessed on: 20 October 2025).

-NPM Inc., 2025. npm . Available at: https://www.npmjs.com
 (Accessed on: 22 October 2025).

-OpenJS Foundation, 2025. Node.js . Available at: https://nodejs.org
 (Accessed on: 22 October 2025).

-React Native Community, 2025. @react-native-community/masked-view . Available at: https://github.com/react-native-masked-view/masked-view
 (Accessed on: 22 October 2025).

-React Native Community, 2025. react-native-safe-area-context. Available at: https://github.com/th3rdwave/react-native-safe-area-context
 (Accessed on: 20 October 2025).

-React Navigation Contributors, 2025. React Navigation (Version . Available at: https://reactnavigation.org
 (Accessed on: 20 October 2025).

-Shadcn UI Contributors, 2025. shadcn/ui . Available at: https://ui.shadcn.com
 (Accessed on: 21 October 2025).

-TypeScript Team, Microsoft Corporation, 2025. TypeScript. Available at: https://www.typescriptlang.org
 (Accessed on: 20 October 2025).

