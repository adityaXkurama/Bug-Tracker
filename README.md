# Task Tracker App 🐞🧑‍💻

A full-featured task/bug tracker web application built using **React**, **Vite**, **Zustand**, and **Tailwind CSS**. It supports **role-based access** for Developers and Managers, time tracking, task approvals, sorting/filtering, data visualization, and a built-in dark mode toggle. ⚡

---

## 🚀 Features

- 🔐 **Role-Based Authentication** (Developer / Manager)
- 🧾 **Task Management** (Create, Update, Delete)
- ⏱ **Time Tracking** (Start/Stop timers for each task)
- 📊 **Manager Dashboard** with approval workflows
- 📈 **Task Trend Chart** visualization
- 🌓 **Dark Mode** toggle
- 🔎 **Sort and Filter** tasks by priority, date, and status
- 🎯 Built with Vite + Zustand + Tailwind CSS for speed and scalability

---

## 🛠 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **State Management:** Zustand
- **Routing & Auth:** React Router + Zustand store
- **Visualization:** Recharts (for Task Trend Graph)
- **Build Tool:** Vite

---

## 📦 Installation (Run Locally)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adityaXkurama/Bug-Tracker.git
   cd Bug-Tracker
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
   
3. **Start the Development Server**
   ```bash
   npm run dev
   ```
4. **Start the Development Server**
   ```bash
   Open in Browser
   ```

## 📌 Assumptions Made
- **Mock Authentication Only**  
User login is simulated using Zustand state with hardcoded credentials. No actual backend or database is used for authentication in this version.

- **Roles are Predefined:**  
Only two roles exist—Developer and Manager. Each role determines access and functionality in the app (e.g., developers can create/update tasks, while managers can approve or reopen them).

- **Tasks are Stored In-Memory:**  
Please do not refresh the website as all the task data, time logs, and user actions of the website will be lost as they are stored in Zustand state. This can be avoided by intergrating a backend database in future

- **Time Tracking is Local:**  
Task timers are handled locally in the browser using real-time tracking. There’s no server-side timer support or persistence after a refresh.

- **Assignee Logic is Simple:**  
Tasks are assigned by manually entering a name. There's no user selection UI or validation based on existing users.

- **Single Project Context:**  
The system is designed for a single project scope. There is currently no support for managing multiple projects or organizations.

## 🌟 Areas to Highlight

- **Dark Mode Toggle:**  
Seamless dark/light mode switch using Zustand + Tailwind’s dark: utilities. Applies across all dashboards.


- **Zustand for Global State:**  
Zustand is used for lightweight, scalable state management—no Redux boilerplate. Stores include authStore, taskStore, and themeStore.

- **Task Approval Workflow:**  
Managers can approve or reopen tasks submitted by developers with one-click buttons for quick actions.

- **Responsive Design:**  
Built with Tailwind CSS, the UI is responsive and accessible across device sizes.



