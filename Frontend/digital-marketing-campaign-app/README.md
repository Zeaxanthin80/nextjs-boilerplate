# Digital Marketing Campaign App

This project is a web application designed to help entrepreneurs and small businesses create and manage digital marketing campaigns. The application features a user-friendly interface with essential functionalities for user authentication and campaign management.

## Project Structure

The project is organized as follows:

```
digital-marketing-campaign-app
├── src
│   ├── index.html          # Main entry point of the application (Landing page)
│   ├── pages
│   │   ├── login.html      # Login page for user authentication
│   │   ├── signup.html     # Signup page for new users
│   │   └── dashboard.html   # Dashboard for users after logging in
│   ├── css
│   │   ├── main.css        # General styles for the application
│   │   ├── landing.css     # Styles specific to the landing page
│   │   ├── auth.css        # Styles for authentication pages (login and signup)
│   │   └── components.css   # Styles for reusable components
│   ├── js
│   │   ├── app.js          # Main JavaScript logic for the application
│   │   ├── auth.js         # Functions related to authentication
│   │   └── validation.js    # Functions for validating user input
│   └── assets
│       ├── images
│       │   └── logo.png    # Logo image for the landing page
│       └── icons           # Directory for icon images
├── package.json            # npm configuration file
└── README.md               # Documentation for the project
```

## Features

- **Landing Page**: A welcoming page with the application logo and a start button.
- **User Authentication**: 
  - **Login Page**: Allows users to log in using their username and password.
  - **Signup Page**: Enables new users to create an account by providing their name, email, phone number, and password.
- **Dashboard**: A user dashboard that provides access to campaign management features.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd digital-marketing-campaign-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in your web browser to view the application.

## Usage Guidelines

- Ensure that you have a modern web browser for the best experience.
- Follow the prompts on the login and signup pages to access the dashboard.
- Use the dashboard to manage your digital marketing campaigns effectively.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.