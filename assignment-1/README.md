
# Hussain Albaggal - Software Engineering Portfolio
## **Assignment 3: Advanced Functionality**

> A responsive and interactive portfolio upgraded with advanced logic, API integration, and state management.

---

## Project Overview
This project extends the Assignment 1 and 2 portfolio with advanced features: external API data, multi-step logic, persistent user state, and performance-focused improvements.

## Assignment 3 Requirements Checklist

| Requirement | Implementation Status | Features Added |
| :--- | :---: | :--- |
| **API Integration** | ✅ | Live GitHub repositories from the GitHub REST API with retry handling |
| **Complex Logic** | ✅ | Project filter + sort + level logic, advanced form validation, session timer |
| **State Management** | ✅ | Persistent theme, simulated login/logout, saved visitor name, hide/show projects |
| **Performance** | ✅ | Preconnect for CDN, efficient DOM updates, no heavy assets |
| **AI Integration** | ✅ | Documented workflow and edits in `docs/ai-usage-report.md` |

---

## Tech Stack
* **Structure:** Semantic HTML5 with accessible labels
* **Styling:** CSS3 custom properties and responsive layout
* **Logic:** Vanilla JavaScript (ES6+) with DOM APIs
* **Icons:** Font Awesome 6.4

---

## Project Structure
```text
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## Installation & Running Locally

### Prerequisites
* A modern web browser (Chrome, Firefox, Safari, or Edge).

### Steps to Run

**1. Open the project**
* **Directly:** Double-click `index.html` in your file explorer.
* **Local Server (Recommended):**

```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000`

---

## Features & User Guide

### 1. Live GitHub Repositories (API Integration)
* Fetches the latest public repositories from the GitHub API.
* Shows a user-friendly error message with a retry button if the API fails.

### 2. Project Filtering + Sorting + Levels (Complex Logic)
* Filter by category, choose level (Beginner/Advanced), and sort by date or name.
* A summary message updates based on the selected options.

### 3. Advanced Contact Form
* Validates required fields, email format, name characters, and message length.
* Shows clear feedback and resets on success.

### 4. Session Timer
* Displays time spent on the site in minutes and seconds.

### 5. State Management
* Remembers theme choice, visitor name, login status, and project visibility using localStorage.

---

## AI Integration Summary
AI tools were used to accelerate development and ensure correct logic. Full details are in `docs/ai-usage-report.md`.

---

## Contact Information
* **Name:** Hussain Albaggal
* **Email:** s202253340@kfupm.edu.sa
* **LinkedIn:** https://www.linkedin.com/in/hussain-albaggal
* **GitHub:** https://github.com/Hoosn4

