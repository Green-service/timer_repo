
# ⏱️ Time Tracker - Mini Time Tracking Application

A beautiful, intuitive time tracking web application built with React, TypeScript, and Tailwind CSS. This project fulfills the Looped Automation technical challenge requirements and includes bonus features for an enhanced user experience.

## 🌟 Features

### Core Requirements ✅
- **Time Entry Form**: Create time entries with task name and hours worked
- **Time Entries List**: View all logged time entries with timestamps
- **Total Hours Display**: Real-time calculation of total hours worked
- **Input Validation**: Prevents empty task names, negative hours, and excessive entries

### Bonus Features 🚀
- **Edit/Delete Entries**: Full CRUD operations for time entries
- **Live Timer**: Start/stop timer functionality with real-time tracking
- **Persistent Storage**: Data persists using localStorage
- **Responsive Design**: Mobile-friendly interface
- **Beautiful UI**: Modern gradient design with smooth animations
- **Toast Notifications**: User feedback for all actions

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd time-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📱 Usage

### Adding Time Entries
1. Enter a task name in the "Add Time Entry" form
2. Specify the number of hours worked (supports decimals like 0.25 for 15 minutes)
3. Click the "+" button or press Enter to add the entry

### Using the Live Timer
1. Enter a task name in the timer section
2. Click the play button to start timing
3. Click "Stop & Save" to automatically create a time entry
4. Use the reset button to clear the timer without saving

### Managing Entries
- **Edit**: Click the edit icon to modify task name or hours
- **Delete**: Click the trash icon to remove an entry
- **View Total**: Total hours are calculated automatically and displayed prominently

## 🔧 Key Design Decisions & Assumptions

### Data Storage
- **localStorage**: Chosen for simplicity and immediate persistence without backend setup
- **Data Structure**: Each entry includes id, taskName, hours, and timestamp
- **Auto-save**: Changes are automatically persisted to localStorage

### User Experience
- **Validation**: Client-side validation prevents invalid entries (empty names, negative/excessive hours)
- **Responsive**: Mobile-first design that works on all screen sizes
- **Feedback**: Toast notifications provide immediate feedback for all user actions
- **Timer Precision**: Timer tracks seconds but converts to hours with 2 decimal precision

### Technical Choices
- **Component Structure**: Single-page application with all functionality in the main Index component
- **State Management**: Local React state sufficient for this scope
- **Styling**: Utility-first Tailwind CSS with shadcn/ui for consistent components
- **TypeScript**: Full type safety for better development experience

## 🎯 What I'd Improve With More Time

### Features
- **Categories/Projects**: Organize tasks by project or category
- **Date Range Filtering**: Filter entries by date ranges
- **Export Functionality**: Export data as CSV or PDF reports
- **Multiple Timers**: Run multiple timers simultaneously
- **Time Goals**: Set daily/weekly time goals with progress tracking

### Technical Improvements
- **Backend Integration**: Replace localStorage with proper database
- **User Authentication**: Multi-user support with secure authentication
- **Real-time Sync**: WebSocket or similar for real-time updates across devices
- **Offline Support**: Service worker for offline functionality
- **Advanced Analytics**: Charts and insights about time tracking patterns

### UI/UX Enhancements
- **Dark Mode**: Theme switching capability
- **Keyboard Shortcuts**: Power user features for faster interaction
- **Drag & Drop**: Reorder entries or batch operations
- **Advanced Notifications**: Browser notifications for timer reminders
- **Accessibility**: Enhanced screen reader support and keyboard navigation

## 📊 Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components
├── pages/
│   └── Index.tsx     # Main application component
├── lib/
│   └── utils.ts      # Utility functions
└── hooks/            # Custom React hooks
```

## 🧪 Testing the Application

### Manual Testing Checklist
- [ ] Add time entry with valid data
- [ ] Attempt to add entry with empty task name (should show error)
- [ ] Attempt to add entry with negative hours (should show error)
- [ ] Edit existing entry
- [ ] Delete entry
- [ ] Start and stop timer
- [ ] Verify data persists after page refresh
- [ ] Test responsive design on mobile device

### Validation Rules
- Task name: Cannot be empty or only whitespace
- Hours: Must be positive number, maximum 24 hours per entry
- Timer: Requires task name before starting

## 🚢 Deployment

This application can be easily deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Enable Pages in repository settings
- **Any static hosting service**

## 📝 License

This project is part of a technical challenge for Looped Automation.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
