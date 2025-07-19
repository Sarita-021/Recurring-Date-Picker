# Recurring Date Picker

A modern, intuitive, and highly customizable recurring date picker component built with React, Vite, and styled with a hybrid approach of Tailwind CSS and custom stylesheets. This project provides a seamless user experience for setting up complex recurring schedules.

---

## ✨ Key Features

* **Intuitive Stepper UI**: Guides the user through a simple 3-step process: Date Range -> Recurrence -> Preview.
* **Flexible Recurrence Rules**:
    * **Daily**: Repeats every N days.
    * **Weekly**: Repeats on specific days of the week (e.g., Mon, Wed, Fri) every N weeks.
    * **Monthly**: Repeats on the same date of the month OR on a specific ordinal weekday (e.g., the third Friday of the month).
    * **Yearly**: Repeats on the same date each year.
* **Interactive Date Range Selection**:
    * Easy-to-use calendar inputs for start and end dates.
    * "Quick Pick" buttons for common start dates (Today, Tomorrow, etc.).
    * "End Date Preset" buttons for common durations (1 Month, 6 Months, 1 Year, etc.).
* **Live Preview**:
    * Instantly see all generated dates as you adjust the rules.
    * Toggle between a visual **Calendar View** and a detailed **List View**.
* **Modern & Responsive Design**: A clean, polished interface that works beautifully on all screen sizes.
* **Zero Dependencies for Icons**: All icons are included as inline SVG components, ensuring fast load times and no need for external libraries.

---

## 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**:
    * [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
    * **Custom CSS Modules/Sheets** for component-specific styling and theming (`src/styles`).
* **Language**: JavaScript (ES6+) + JSX

---

## 📂 Project Structure

The project is organized into logical directories to keep the codebase clean and maintainable.

<img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/f1e05085-7ae3-40b9-ae3d-335a46ca73b4" />



---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (v14 or later)
* npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sarita-021/Recurring-Date-Picker.git
    cd Recurring-Date-Picker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port specified in your console) to see the application running.

---

## 🎨 Styling Approach

This project uses a powerful hybrid styling strategy:

1.  **Tailwind CSS**: Used for the overall layout, grid, flexbox, and utility classes directly within the JSX for rapid development.
2.  **Custom CSS Files**: Located in `src/styles`, these files provide more complex, component-specific styles and a centralized theme using CSS variables (`variables.css`). This approach keeps the JSX clean while allowing for sophisticated and maintainable styling.

---

## 🔮 Future Improvements

* **Integrate a Date Library**: Replace the custom date logic with a robust library like `date-fns` or `day.js` to handle timezones and edge cases more effectively.
* **Add More Recurrence Patterns**: Implement more complex rules, such as "the last weekday of the month."
* **Accessibility (a11y)**: Enhance keyboard navigation and add ARIA attributes for better screen reader support.
* **State Management**: For larger applications, consider integrating a state management library like Zustand or Redux Toolkit.

---

## ✍️ Author

* **Sarita**
