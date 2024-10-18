# Simple Todo App

A simple Todo application built with React, allowing users to create, edit, and delete tasks while managing their to-do list effectively.

## Table of Contents

- [Simple Todo App](#simple-todo-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Create, edit, and delete tasks.
- Mark tasks as completed or pending.
- Persistent data storage using Firebase Firestore.
- Responsive design for usability on different devices.

## Technologies Used

- **React** - JavaScript library for building user interfaces.
- **Firebase Firestore** - NoSQL cloud database for real-time data storage.
- **FontAwesome** - Icons for a better user interface.
- **CSS** - For styling the application.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alexandrearabian/simple-todo
   ```
2. **Navigate to the project directory:**
    ```bash
    cd online-resume
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Run the project:**
    ```bash
    npm start
    ```
5. **Set up Firebase:**

    Create a Firebase project at `https://console.firebase.google.com`.
    Obtain your Firebase config and replace the configuration in FirebaseConfig.jsx.

6. **View the application:**
    Open your browser and navigate to `http://localhost:5173/` (or the URL provided in the terminal).

## Usage

- Add a new task using the input field.
- Click on a task to edit its name.
- Click the close button to exit task detail view.
- Mark tasks as completed or pending.

## Contributing

1. **Fork the repository.**

2. **Create your feature branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a pull request.**

## License

License

This project is licensed under the MIT License. See the LICENSE file for details.
