# Technical Documentation - Assignment 3

**Author**: Hussain Albaggal  
**Student ID**: s202253340  
**Assignment**: SWE363 - Assignment 3 (Advanced Functionality)  
**Date**: April 11, 2026
 
---

## Architecture Overview

The portfolio is built as a **responsive single-page application (SPA)** with a two-column layout:
- **Sidebar (Left)**: Fixed navigation, profile, and theme toggle
- **Main Content (Right)**: Scrollable container with all portfolio sections

### Design Pattern: Component-Based Architecture
- **CSS Variables**: Global theme management for light/dark modes
- **Semantic HTML5**: Proper accessibility (aria-labels, label elements, semantic tags)
- **Vanilla JavaScript**: No frameworks; pure DOM manipulation for filtering, validation, and theme persistence

---

## Assignment 3 Features - Technical Implementation

### 1. API Integration (GitHub Repositories)

- **Data Source**: GitHub REST API
- **Endpoint**: `https://api.github.com/users/Hoosn4/repos?sort=updated&per_page=6`
- **UI Location**: Live GitHub Repositories section
- **Logic**:
    - Shows a loading state while fetching
    - Renders repository cards with name, description, language, stars, forks
    - If the API fails or returns empty data, shows a user-friendly message and a retry button

### 2. Complex Logic (Filter + Sort + Level + Timer)

#### Project Filtering and Sorting
- **Filters**: Category (all/web/ml) and level (all/beginner/advanced)
- **Sorting**: Newest, oldest, name
- **Data Attributes**:
    - `data-category`
    - `data-level`
    - `data-date`
- **Logic**:
    - Applies combined filter rules
    - Sorts only the visible items
    - Updates a message summarizing the current selection

#### Session Timer
- **Element**: `#sessionTimer`
- **Logic**: Updates every second from a session start timestamp
- **Purpose**: Demonstrates multi-step logic and user feedback

### 3. State Management

#### Persistent Theme
- **Storage Key**: `portfolioTheme`
- **Values**: `light` or `dark`
- **Behavior**: Loads saved theme on page load and toggles on user action

#### Visitor Name
- **Storage Key**: `portfolioVisitorName`
- **Behavior**: Saves and displays the visitor name; defaults to Guest when invalid

#### Simulated Login/Logout
- **Storage Key**: `portfolioAuthStatus`
- **Behavior**: Toggles between Logged in / Logged out and persists the state

#### Show/Hide Projects
- **Storage Key**: `portfolioProjectsVisible`
- **Behavior**: Toggles the Projects section and persists visibility

#### Dynamic Greeting
- **Location**: `#dynamicGreeting` span in About section
- **Logic**: `updateGreeting()` function calculates local hour and sets text
  - 5am-12pm: "Good Morning"
  - 12pm-6pm: "Good Afternoon"  
  - 6pm-5am: "Good Evening"
- **Trigger**: Runs on page load; updates hourly if user visits long sessions

#### Project Filtering System
- **HTML Structure**: Filter buttons above projects with `data-filter` attributes ("all", "web", "ml")
- **Project Categorization**: Each `.project-item` has `data-category` ("web" or "ml")
- **JavaScript Logic**:
  - Clicking a filter button triggers `updateProjectVisibility(category)`
  - Adds/removes `.project-hidden` class for smooth CSS transitions
  - Shows "No projects found" message if category is empty
  - Active button state maintained with `.active` class
- **CSS Animation**: `.project-hidden` uses opacity and max-height transitions (0.35s ease)

#### Theme Toggle
- **HTML**: Button in sidebar with id="themeToggle" and aria-label for accessibility
- **Stored State**: localStorage key "portfolioTheme" (values: "light" or "dark")
- **Button Text**: Toggles between "🌙 Dark Mode" and "☀️ Light Mode"
- **CSS Approach**: Uses `:root` CSS variables that change in `body.dark-mode` state
- **Error Handling**: try/catch block prevents crashes if localStorage is disabled

---

### 4. Contact Form Validation (Advanced Checks)

- **Validation Rules**:
  - Name required, min length 2, letters/spaces/hyphen/apostrophe only
  - Email required and validated via regex
  - Message required and min length 10
- **Feedback**: Inline errors or success message
- **Reset Behavior**: Clears feedback when user edits input

---

### 5. Animations & Transitions

#### CSS Transitions Applied
1. **Theme Switch**: `body` background and text color transition (0.3s ease)
2. **Button Interactions**: 
   - Hover scale: `transform: scale(1.02)` (cards)
   - Filter buttons: `transform: translateY(-2px)` on hover
   - Submit button: `transform: translateY(-2px)` on hover
3. **Project Filtering**: Smooth fade out/in (opacity) with height collapse (0.35s ease)
4. **Form Validation**: Error/success boxes appear with background color transitions

#### JavaScript Animation Support
- Used Intersection Observer API for scroll-triggered section animations
- Smooth CSS classes applied to elements as they enter viewport
- No heavy JavaScript animations; CSS handles all transitions for performance

---

### 6. Error Handling & User Feedback

#### Form Validation Feedback
- **Invalid Fields**: Red background with error message
- **Success Message**: Green background with success confirmation
- **Empty State**: "No projects found" message when filter returns no results

#### User Communication Strategy
- **Always Provide Context**: Error messages explain what's wrong
- **Clear Next Steps**: Form clears on success; messages clear when typing resumes
- **Accessible Design**: All interactive elements have aria-labels; form labels are semantic

---

## Color Palette & Accessibility

### Light Mode
- **Background**: `#ffffff` (white)
- **Text**: `#1f2937` (dark gray-blue)
- **Primary Accent**: `#3b82f6` (blue)
- **Secondary Accent**: `#f59e0b` (amber/orange)
- **Contrast Ratio**: 14.5:1 (AAA level)

### Dark Mode
- **Background**: `#0f172a` (deep navy)
- **Text**: `#f1f5f9` (light slate)
- **Primary Accent**: `#60a5fa` (light blue)
- **Secondary Accent**: `#fbbf24` (light amber)
- **Contrast Ratio**: 14:1 (AAA level)

**Accessibility**: Updated hero and contact gradients for stronger contrast.

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Notes

- **CDN Optimization**: Uses preconnect for the Font Awesome CDN
- **Minimal Assets**: No heavy images; SVG profile graphic keeps payload small
- **Efficient DOM Updates**: Sorting and filtering reuse existing nodes instead of recreating
- **API Efficiency**: GitHub API fetch uses a small payload (limited to 6 repos)
