# React Assignment - MUI Integration

## Tech Stack
- React
- Material UI (MUI)
- Vite

## Setup Instructions
1. npm install
2. npm run dev

## Project Structure

react-user-dashboard/
|--- src/
|    |--- assets/         # Static assets
|    |--- components/     # Reusable UI
|    |     |--- AddEditTask.jsx
|    |     |--- ProfileCard.jsx
|    |     |--- TaskItem.jsx
|    |     |--- TaskList.jsx
|    |
|    |--- context/        # React Context for state management
|    |    |--- TaskContext.jsx
|    |
|    |--- services/       # API / service layer
|    |    |--- taskService.js
|    |
|    |--- tests/          # Unit tests
|    |    |--- TaskList.test.jsx
|    |
|    |--- App.jsx         # Root component
|    |--- App.css
|    |--- index.css
|    |--- main.jsx        # Application entry point
|    |--- setupTests.js   # Jest setup
|    |--- theme.js        # MUI theme configuration
|    |
|--- .gitignore
|--- babel.config.js
|--- index.html
|--- jest.config.js
|--- package.json
|--- package-lock.json
|--- vite.config.js
|--- README.md

## Features
- Profile Card: Hardcode sample user data (name, email, photo URL) - Utilities to copy email address or mail directly.
- Task List: 
    - Lists all tasks fetched from a REST API (GET https://jsonplaceholder.typicode.com/todos?userId=1)
    - A new task can be added (Restricted to add a title atleast of 3 characters)
    - Existing task names can be edited.
    - Tasks can be toggled to completed with green tick or incomplete with grey tick.
- Responsive design
- Keyboard navigation is added wherever possible.
- Jest test cases

## Screenshots
### Dashboard Dark mode
![Dashboad-Dark](screenshots/MainPage_DarkMode.png)

### Dashboard Light mode
![Dashboad-Light](screenshots/MainPage_LightMode.png)

### Adding New Task
![Add-New-Task](screenshots/Add_Task_Entry.png)

### New Task added
![New-Task_Added](screenshots/New_Task_Added.png)

### Task Toggled to Completed
![Task-Toggle](screenshots/Task_Toggled.png)

### Editing Task
![Edit-Task](screenshots/Task_Edit.png)

### Task Editted
![Task_Editted](screenshots/Task_Editted.png)

### Test cases Passed
![Task_Cases_Passed](screenshots/TestCases_Passed.png)

## Notes
Assignment submission for evaluation