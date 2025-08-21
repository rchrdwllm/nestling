# Nestling LMS

An all-in-one Learning Management System designed to streamline educational operations, offering comprehensive tools for course management, project tracking, secure communication, and analytics. Built specifically for Leave a Nest organization, particularly the Philippine branch, but adaptable for other educational institutions.

## 📚 Overview

Nestling LMS is a modern, web-based learning management system that provides a complete educational platform for instructors, students, and administrators. The system offers intuitive course management, real-time communication, project tracking with Gantt charts, and comprehensive analytics to enhance the learning experience.

## ✨ Key Features

### 🎓 **Course Management**
- Create and manage courses with modular content structure
- Support for multiple content types: lessons, assignments, and file uploads
- Course enrollment and access control
- Assignment submission and grading system
- Discussion forums for each course
- Real-time announcements and notifications

### 👥 **User Management**
- Multi-role support: Students, Instructors, and Administrators
- User registration with email verification
- Profile management and customization
- Activity tracking and analytics
- Comprehensive user logs and audit trails

### 📊 **Project Management**
- Interactive Gantt chart timeline view
- Project creation and task assignment
- Collaborative project tracking
- Progress monitoring and reporting
- Project status and priority management

### 💬 **Communication System**
- Real-time messaging between users
- Push notifications for important updates
- Universal announcements system
- Support ticket system with priority levels
- Integrated help center with FAQ

### 📈 **Analytics & Reporting**
- User activity dashboards
- Course engagement metrics
- Assignment submission tracking
- Monthly active user reports
- Comprehensive system logs

### 🔧 **Administrative Tools**
- User management and role assignment
- System-wide settings and configuration
- Content moderation and archiving
- Backup and data management utilities
- Support ticket management

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.1.6, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Firebase Firestore
- **Authentication**: NextAuth.js with Firebase integration
- **Real-time**: Pusher for live updates
- **File Storage**: Cloudinary for media management
- **Email**: Resend for transactional emails
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF for reports
- **Notifications**: Web Push API for browser notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager
- Firebase project with Firestore enabled
- Cloudinary account for file storage
- Pusher account for real-time features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rchrdwllm/nestling.git
   cd nestling
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Firebase Configuration
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY=your_firebase_private_key

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Pusher Configuration
   NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_app_key
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_SECRET=your_pusher_secret
   NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster

   # Email Configuration (Resend)
   RESEND_API_KEY=your_resend_api_key

   # Push Notifications
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
   VAPID_PRIVATE_KEY=your_vapid_private_key
   ```

4. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore database
   - Set up authentication with email/password provider
   - Download the service account key and place it as `service-account.json` in the root

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Data Seeding (Optional)

To populate the database with sample data:

```bash
# Seed course contents
cd seed
npx ts-node seed-contents.ts
```

## 📁 Project Structure

```
nestling/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── calendar/          # Calendar functionality
│   ├── courses/           # Course management
│   ├── dashboard/         # User dashboards
│   ├── help/              # Help and support
│   ├── inbox/             # Messaging system
│   ├── logs/              # System logs
│   ├── notifications/     # Notification center
│   ├── people/            # User management
│   ├── profile/           # User profiles
│   ├── projects/          # Project management
│   └── support-tickets/   # Support system
├── components/            # Reusable React components
│   ├── shared/            # Shared components
│   ├── ui/                # UI component library
│   └── wrappers/          # Context wrappers
├── constants/             # Application constants
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── schemas/               # Zod validation schemas
├── server/                # Server actions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 👤 User Roles and Permissions

### **Students**
- Enroll in courses and access course materials
- Submit assignments and view grades
- Participate in discussions and messaging
- Track personal progress and calendar
- Create support tickets

### **Instructors**
- Create and manage courses
- Grade assignments and provide feedback
- Manage course discussions and announcements
- View student analytics and progress
- Handle course-related support tickets

### **Administrators**
- Full system access and configuration
- User management and role assignment
- System analytics and reporting
- Manage all courses and content
- Handle all support tickets and system issues

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run dev-https` - Start development server with HTTPS
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

### Code Quality

- ESLint configuration for Next.js
- TypeScript for type safety
- Tailwind CSS for consistent styling
- Prettier for code formatting (recommended)

## 📱 Features Overview

### **Dashboard**
- Role-specific dashboard views
- Quick access to recent activities
- Pending tasks and deadlines
- System notifications and announcements

### **Course System**
- Modular course structure
- Rich content editor with TipTap
- File upload and media management
- Assignment creation and grading
- Student progress tracking

### **Project Management**
- Interactive Gantt chart view
- Drag-and-drop task scheduling
- Team collaboration features
- Project status tracking
- Resource allocation

### **Communication**
- Real-time messaging system
- Push notifications
- Email integration
- Discussion forums
- Support ticket system

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is developed for Leave a Nest Philippines, Inc. All rights reserved.

## 📧 Contact

For technical support or inquiries about Nestling LMS:

**Leave a Nest Philippines, Inc.**
- **Office Address**: Unit 2103, Orient Square Bldg., F. Ortigas Jr. Rd., Ortigas Center, Pasig City 1600
- **Operations Location**: Philippines

For development-related questions, please create an issue in this repository.

---

**Nestling LMS** - Empowering education through technology 🚀
