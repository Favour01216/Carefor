# Care For

## Overview

This healthcare platform streamlines patient registration, appointment scheduling, and medical record management. It offers a robust and responsive system for both patients and administrators, incorporating modern technologies like Next.js, Appwrite, and Twilio.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **Next.js**: A React framework for building fast, server-side rendered applications.
- **Appwrite**: A backend server for web and mobile developers, used for authentication, database management, and file storage.
- **TypeScript**: A typed superset of JavaScript that enhances code quality and development efficiency.
- **TailwindCSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **ShadCN**: A library of reusable UI components.
- **Twilio**: A cloud communications platform used for sending SMS notifications.
- **Sentry**: A performance monitoring and error tracking software used to improve application stability.

## Features

### Patient Side

- **Register as a Patient**: Users can sign up and create a personal profile as a patient.
- **Book a New Appointment**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.
- **Receive SMS Notifications**: Patients receive SMS notifications to confirm their appointment details.

### Admin Side

- **Manage Appointments**: Administrators can efficiently view and handle all scheduled appointments.
- **Confirm/Schedule Appointments**: Admins can confirm and set appointment times to ensure they are properly scheduled.
- **Cancel Appointments**: Administrators have the ability to cancel any appointment as needed.

### Additional Features

- **Complete Responsiveness**: The application works seamlessly on all device types and screen sizes.
- **File Upload Using Appwrite Storage**: Users can upload and store files securely within the app.
- **Performance Monitoring Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/healthcare-platform.git
   cd healthcare-platform
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Appwrite**:

   - Ensure you have an Appwrite server running.
   - Create a new project in Appwrite and configure the required services like Authentication, Database, and Storage.
   - Update your `.env.local` file with your Appwrite project credentials.

4. **Set up Twilio**:

   - Sign up for a Twilio account.
   - Obtain your Twilio Account SID and Auth Token.
   - Update your `.env.local` file with Twilio credentials.

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Access the application**:
   Open your browser and go to `http://localhost:3000`.

## Usage

### Patient Workflow

1. Register as a patient.
2. Log in to your account.
3. Book a new appointment by selecting your preferred doctor and time slot.
4. Receive a confirmation SMS with your appointment details.

### Admin Workflow

1. Log in as an administrator.
2. View all scheduled appointments.
3. Confirm or cancel appointments as necessary.
4. Use the admin dashboard to manage patient records and appointments.

## Project Structure

```plaintext
├── public          # Public assets including images and icons
├── Components      # Contains ui, forms, tables, buttons code
├── lib             # Contains validations etc..
├── types           #
├── utils           # Utility functions
├── constants       #
├── Public          # assets likes icons images and gifs
├── app
│   ├── admin       # admin tsx page
│   ├── patient     # new-appointment and register tsx pages
├── .env.local      # Environment variables
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
