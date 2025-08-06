# Todo App Mobile

A beautiful and functional Todo app built with React Native and Expo, featuring authentication, advanced task management, and modern UI/UX.

## Features

### 🔐 Authentication & Onboarding
- ✅ **Social Login** - Google OAuth integration with Expo AuthSession
- ✅ **Demo Mode** - Try the app without signing in
- ✅ **Error Handling** - Clear error states and user feedback
- ✅ **Session Persistence** - Stay logged in between app sessions

### 📝 Task Management (CRUD)
- ✅ **Create Tasks** - Add todos with title, description, and due dates
- ✅ **Read & List** - View all tasks with filtering and search
- ✅ **Update Tasks** - Edit task details and mark as complete
- ✅ **Delete Tasks** - Remove tasks with swipe gestures or buttons
- ✅ **Task Status** - Track "open" and "complete" states

### 🎨 User Experience
- ✅ **Search & Filter** - Find tasks by keyword and filter by status
- ✅ **Smooth Animations** - Animated task interactions and transitions
- ✅ **Pull-to-Refresh** - Refresh task list with gesture
- ✅ **Swipe-to-Delete** - Intuitive swipe gestures for task removal
- ✅ **Due Date Tracking** - Visual indicators for overdue and upcoming tasks
- ✅ **Empty States** - Helpful messages when no tasks exist

### 🔧 Technical Features
- ✅ **State Management** - Zustand for efficient state handling
- ✅ **Local Storage** - AsyncStorage for data persistence
- ✅ **Crash Reporting** - Error tracking infrastructure (ready for Sentry/Crashlytics)
- ✅ **Modern Architecture** - Component-based structure with hooks
- ✅ **Cross-platform** - Works on iOS, Android, and Web

## Screenshots

The app features:
- **Home Screen**: Displays all todos with completion status and delete options
- **Add Todo Screen**: Clean interface for adding new tasks
- **Floating Action Button**: Quick access to add new todos
- **Empty State**: Encouraging message when starting fresh

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Screen navigation and authentication flow
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **Expo AuthSession** - OAuth authentication
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **Expo Vector Icons** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TodoAppMobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Usage

### Authentication
1. **Demo Mode**: Tap "Try Demo Mode" to use the app without signing in
2. **Google Login**: Tap "Continue with Google" for full authentication
3. **Logout**: Tap the logout icon in the top-right corner

### Managing Tasks
1. **Add Todo**: Tap the floating action button (+) and fill in the form
2. **Complete Todo**: Tap the circle next to any todo to toggle completion
3. **Delete Todo**: Swipe left on a todo or tap the trash icon
4. **Search**: Use the search bar to find specific tasks
5. **Filter**: Use the tabs to view All, Open, or Complete tasks

### Task Details
- **Title**: Required field for task name
- **Description**: Optional detailed description
- **Due Date**: Optional deadline (format: YYYY-MM-DD)
- **Status**: Automatically tracks completion state

### Gestures
- **Pull to Refresh**: Pull down the list to refresh
- **Swipe to Delete**: Swipe left on any todo to delete it
- **Tap to Complete**: Tap the checkbox to mark as complete

## Project Structure

```
TodoAppMobile/
├── App.js                    # Main app component with auth flow
├── screens/
│   ├── OnboardingScreen.js   # Authentication and welcome screen
│   ├── HomeScreen.js         # Todo list with search and filters
│   └── AddTodoScreen.js      # Enhanced todo creation form
├── components/
│   ├── TodoItem.js           # Individual todo with animations
│   ├── SearchBar.js          # Search functionality
│   └── FilterTabs.js         # Status filtering tabs
├── store/
│   ├── authStore.js          # Authentication state management
│   └── todoStore.js          # Todo state management
├── utils/
│   └── crashReporting.js     # Error tracking infrastructure
├── assets/                   # App icons and images
├── package.json              # Dependencies and scripts
└── README.md                # This file
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start on Android device/emulator
- `npm run ios` - Start on iOS device/simulator
- `npm run web` - Start in web browser

## Data Persistence

Todos are automatically saved to the device's local storage using AsyncStorage. This means:
- Todos persist between app sessions
- No internet connection required
- Data is stored locally on the device

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository. 