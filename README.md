# Todo React App

A Todo application built using React, Redux, Redux Saga, and Ant Design. This app allows users to manage their tasks effectively with features like adding, editing, deleting, marking tasks as complete, and searching through tasks.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Customization](#customization)
- [Contributions](#contributions)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You need to have Node.js version `16.20.2` or later installed. You can download it from [nodejs.org](https://nodejs.org/).

- **npm**: npm is installed automatically with Node.js. Make sure you have it available in your terminal.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pasan-Kottearachchi/todo-react-app
   cd todo-react-app
    ```
   
2. **Install the dependencies:**

   Run the following command in the root directory to install all necessary dependencies:

   ```bash
   npm install
   ```

    This command will install the following dependencies as listed in the `package.json` file:

-   **React**: `^18.3.1`
-   **Redux**: `^5.0.1`
-   **Redux Saga**: `^1.3.0`
-   **Ant Design**: `^5.20.0`
-   **React Redux**: `^9.1.2`
-   **Redux Saga Routines**: `^3.2.3`
-   **Awesome Debounce Promise**: `^2.1.0`
-   **@ant-design/icons**: `^5.4.0`
-   **@reduxjs/toolkit**: `^2.2.7`
-   **moment**: `^2.30.1`
-   **web-vitals**: `^2.1.4`

Development dependencies include testing libraries and tools:

-   **@testing-library/jest-dom**: `^5.17.0`
-   **@testing-library/react**: `^13.4.0`
-   **@testing-library/user-event**: `^13.5.0`

Ensure you have these dependencies installed correctly for the project to function as expected.


## Running the Application

Once the dependencies are installed, you can run the application with the following command:

`npm run start`

This command will start the development server and open the application in your default web browser at `http://localhost:3000`.

## Project Structure

Here is a brief overview of the project's structure:

```
todo-react-app/
├── components/
│   ├── TaskNameCell.js
│   └── AddTaskForm.js
│   └── ...
├── pages/
│   ├── HomeScreen.js
│   └── ...
├── store/
│   ├── reducers/
│   │   ├── tasksReducer.js
│   │   └── ...
│   ├── routines/
│   │   ├── tasksRoutines.js
│   │   └── ...
│   ├── sagas/
│   │   ├── tasksSaga.js
│   │   └── ...
│   └── store.js
├── styles/
│   ├── index.css
│   └── ...
├── utils/
│   ├── debounce.js
│   └── ...
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
└── README.md
``` 

## Available Scripts

In the project directory, you can run the following scripts:

-   **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

-   **`npm test`**: Launches the test runner in interactive watch mode.

-   **`npm run build`**: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

-   **`npm run eject`**: This command will remove the single build dependency from your project. **Note**: Once you eject, you can’t go back!


## Dependencies

This project uses the following major dependencies:

-   **React**: `^18.3.1`
-   **Redux**: `^5.0.1`
-   **Redux Saga**: `^1.3.0`
-   **Ant Design**: `^5.20.0`
-   **React Redux**: `^9.1.2`
-   **Redux Saga Routines**: `^3.2.3`
-   **Awesome Debounce Promise**: `^2.1.0`

## Customization

-   **Styling**: The project uses Ant Design for UI components. You can customize styles by modifying the `styles/` directory or overriding Ant Design's default styles.

-   **Fonts**: To apply the Google font "Inter" across the application, import the font in your main CSS file or `index.html`:



    <!-- Inside public/index.html -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" />
   

    /* In your CSS file */
    body {
      font-family: 'Inter', sans-serif;
    }`

-   **API Integration**: Modify the `store/sagas` and `store/routines` to customize API endpoints and data handling logic according to your backend.