# To-Do List Calendar App

This project is a To-Do List application presented in a calendar view where each day is a list of tasks. Users can add, delete, and mark tasks as completed. The application supports multiple profiles, each having their own list of tasks.

## Features

- Calendar view of tasks
- Modal window for managing tasks per day
- Multiple profiles support
- Monthly and weekly views
- Task data persistence
- Responsive design

## Technologies Used

- React
- TypeScript
- Context API
- Jest & React Testing Library
- IsDayOff Library

<img src="https://skillicons.dev/icons?i=react,ts,jest" />

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/eugenepokalyuk/react-airnet.git
    cd react-airnet
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```
4. **Open the application**:

   Open your browser and navigate to `http://localhost:3000`.


## Project Structure

```
src/
├── assets/
│   └── fonts
├── components/
│   ├── App ── App.tsx - Main application component
│   ├── Calendar ── Calendar.tsx - Calendar component
│   └── Modal ── Modal.tsx - Modal component for managing tasks
├── context/
│   ├── ProfileContext.tsx - Context for managing user profiles
│   └── TaskContext.tsx - Context for managing tasks
├── index.css
└── index.tsx
```

## Deployment

To build the application for production, run:

```bash
npm run build
```

The built files will be in the `build` directory, which can be deployed to any static hosting service.