# Nestling - Learning Management System

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-v15.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-%23FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=white)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, web-based Learning Management System designed for **Leave a Nest, Philippines**, providing an intuitive platform for education and course management.

</div>

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## About

Nestling is a comprehensive Learning Management System (LMS) built specifically for Leave a Nest, Philippines. The platform offers a robust solution for managing courses, content, students, and instructors with a focus on user experience and educational effectiveness.

### Mission

To provide an accessible, efficient, and engaging learning environment that supports the educational goals of Leave a Nest Philippines and facilitates seamless knowledge transfer between instructors and students.

## Features

### 🎓 Course Management

- **Course Creation & Organization**: Create and structure courses with modules and content
- **Course Catalog**: Browse and enroll in available courses
- **Progress Tracking**: Monitor learner progress and performance
- **Course Analytics**: View enrollment statistics and course performance metrics

### 👥 User Management

- **Multi-role Support**: Admin, Instructor, Student roles with role-specific dashboards
- **Secure Authentication**: NextAuth.js powered authentication with encrypted credentials
- **Profile Management**: Comprehensive user profiles with privacy controls
- **Permission Management**: Granular access controls based on roles

### 📚 Content Management

- **Rich Content Editor**: WYSIWYG editor for creating engaging course materials
- **Multimedia Support**: Upload and embed images, documents, and media
- **Interactive Modules**: Organize content in structured modules and lessons
- **Assessment Tools**: Create and manage quizzes, assignments, and evaluations

### 💬 Communication

- **Discussion Forums**: Course-specific discussion boards for peer learning
- **Messaging System**: Real-time messaging between users
- **Announcements**: Important updates and notifications delivery
- **Notifications**: Push notifications and alerts for course activities

### 📊 Analytics & Reporting

- **Learning Analytics**: Track student engagement and performance
- **Course Statistics**: Detailed insights on course popularity and completion rates
- **Activity Monitoring**: Monitor user activities and login patterns
- **Performance Reports**: Generate detailed reports on learning outcomes

### 🔒 Security & Privacy

- **AES Encryption**: Advanced encryption for sensitive user data
- **Secure Authentication**: Robust login and session management
- **Role-based Access**: Fine-grained permissions for different user types
- **Data Protection**: Compliance with privacy standards and regulations

## Technologies Used

### Frontend

- **[Next.js 15.1.6](https://nextjs.org/)**: React-based full-stack framework with App Router, Server Actions, and streaming capabilities
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed JavaScript superset
- **[React 19](https://react.dev/)**: Modern UI library for building user interfaces

### Styling & UI Components

- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Radix UI Primitives](https://www.radix-ui.com/)**: Accessible UI primitives
- **[Lucide React](https://lucide.dev/)**: Beautifully crafted icons
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable components built with Radix and Tailwind

### Backend & Database

- **[Firebase](https://firebase.google.com/)**: Backend infrastructure and real-time database
- **[NextAuth.js](https://next-auth.js.org/)**: Authentication solution
- **[Zustand](https://github.com/pmndrs/zustand)**: State management library

### Data Management

- **[React Hook Form](https://react-hook-form.com/)**: Forms with easy validation
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation
- **[TanStack Query](https://tanstack.com/query)**: Server state management
- **[React Table](https://react-table.tanstack.com/)**: Flexible table and data grid

### Rich Content

- **[Tiptap](https://tiptap.dev/)**: Headless editor framework for creating custom rich text editors
- **[React PDF](https://github.com/wojtekmaj/react-pdf)**: PDF viewing and manipulation
- **[jsPDF](https://github.com/MrRio/jsPDF)**: Client-side PDF generation

### Real-time & Communication

- **[Pusher](https://pusher.com/)**: Real-time messaging and notifications
- **[Web Push](https://web-push-crypto-keys-generator.netlify.app/)**: Web Push protocol implementation

### Utilities & Libraries

- **[date-fns](https://date-fns.org/)**: Modern date utility library
- **[Recharts](http://recharts.org/)**: Declarative charting library
- **[Lodash](https://lodash.com/)**: Utility library for common programming tasks
- **[React Hotkeys Hook](https://github.com/JohannesKlauss/react-hotkeys-hook)**: Hook for keyboard shortcuts

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun
- A Firebase project with Firestore enabled
- Cloudinary account for image hosting

### Setup Steps

1. Clone the repository:

```bash
git clone https://github.com/leave-a-nest/nestling.git
cd nestling
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Create a `.env.local` file in the root directory with the following environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Encryption Key (32-character AES key)
AES_ENCRYPTION_KEY=

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Pusher Configuration
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=

# Resend API Key (for email functionality)
RESEND_API_KEY=

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Create a Firebase project and enable:

   - Firestore Database
   - Authentication (Email/Password, Google)
   - Storage
   - Add the Firebase configuration to your environment variables

5. Set up Cloudinary for image storage and processing

6. Configure Pusher for real-time messaging

## Development

### Running the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun (with Turbopack)
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### HTTPS Development Server

For HTTPS development (useful for testing certain features):

```bash
npm run dev-https
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Authentication routes
│   ├── about/              # About page
│   ├── api/                # API routes
│   ├── calendar/           # Calendar functionality
│   ├── courses/            # Course management
│   │   ├── @admin/         # Admin course views
│   │   ├── @instructor/    # Instructor course views
│   │   └── @student/       # Student course views
│   ├── dashboard/          # User dashboards
│   ├── help/               # Help & support
│   ├── inbox/              # Messaging system
│   ├── logs/               # Activity logs
│   ├── notifications/      # Notification center
│   ├── people/             # Community features
│   ├── profile/            # User profiles
│   ├── projects/           # Project management
│   └── support-tickets/    # Support system
├── components/            # React components
│   ├── admin-access/      # Admin-specific components
│   ├── instructor-access/ # Instructor components
│   ├── student-access/    # Student components
│   ├── shared/            # Shared components
│   ├── ui/                # UI components
│   └── wrappers/          # Context wrappers
├── lib/                   # Library functions
├── schemas/               # Validation schemas
├── types/                 # TypeScript type definitions
├── assets/                # Static assets
├── constants/             # Application constants
├── public/                # Public assets
└── ...
```

## Architecture

### Frontend Architecture

- **Next.js App Router**: Leverages the latest Next.js routing and data fetching capabilities
- **Server Components**: Data fetching happens on the server for optimal performance
- **Client Components**: Interactive elements built with React client components
- **Component Architecture**: Organized by role (admin, instructor, student) and feature domains

### Backend Architecture

- **Firebase Firestore**: NoSQL database for storing courses, users, content, and activities
- **Firebase Authentication**: Secure user authentication and session management
- **Server Actions**: Next.js 14+ server actions for mutations and complex server-side operations
- **Caching Strategy**: Implements Next.js caching for improved performance
- **Security Rules**: Firebase security rules for protecting data access

### Data Flow

1. **Authentication**: NextAuth.js handles user authentication with Firebase
2. **API Requests**: Server actions and API routes communicate with Firebase
3. **Real-time Updates**: Pusher enables real-time communication and notifications
4. **File Storage**: Cloudinary for secure image and file uploads
5. **Encryption**: AES encryption for sensitive user data

## Contributing

We welcome contributions to Nestling! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write TypeScript type definitions for all new functionality
- Add appropriate unit tests for new features
- Ensure all tests pass before submitting a PR
- Update documentation as needed

### Code Standards

- Use semantic commit messages
- Write meaningful test cases
- Follow accessibility guidelines (WCAG 2.1 AA)
- Maintain responsive design across all screens

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
