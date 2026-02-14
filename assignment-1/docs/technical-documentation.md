# Technical Documentation

**Author**: Hussain Albaggal  
**Date**: February 14, 2026

## Architecture
The portfolio is built as a responsive single-page application (SPA) using a modern two-column layout:
- **Sidebar (Left)**: A fixed-position navigation and profile container using CSS Flexbox (280px width on desktop).
- **Main Content (Right)**: A scrollable container for all portfolio sections that adapts to the remaining width.

## Components
### HTML Structure
Uses semantic HTML5 elements including `<aside>` for the sidebar, `<main>` for content, and `<section>` for individual portfolio parts.

### CSS Styling
- **Color Palette**: Sophisticated Deep Purple (#574964), Peach (#FFDAB3), and Slate Gray (#2c3e50).
- **Layout**: CSS Flexbox is used for the main container and internal section alignment.
- **Responsiveness**: Mobile-first approach with media queries at 768px and 1024px to stack elements on smaller screens.

### JavaScript Functionality
- **Smooth Scrolling**: Implemented for all navigation links using `scrollIntoView`.
- **Scroll Animations**: Uses the `IntersectionObserver` API to trigger fade-in and slide-up effects as sections enter the viewport.
- **Form Validation**: Client-side validation using regex to check email formats and ensuring all fields are filled before submission.

## Setup & Setup Instructions
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. No external build tools or frameworks are required.

## Performance & Quality
-  Optimized assets for fast loading.
-  Semantic HTML for accessibility.
-  Clean, commented code following DRY principles.