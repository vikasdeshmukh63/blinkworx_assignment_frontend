# Order Management System Frontend

A modern, responsive order management system built with React, TypeScript, and Vite. The application allows users to create, read, update, and delete orders while managing product associations.

## Features

* **Order Management**
  * Create, read, update, and delete orders
  * Real-time order search functionality
  * Product association management

* **Modern Tech Stack**
  * Built with React 18 and TypeScript
  * Fast development using Vite
  * State management with TanStack Query (React Query)
  * Styled using Tailwind CSS

* **User Experience**
  * Responsive design for all devices
  * Offline/Online status notifications
  * Skeleton loading states
  * Toast notifications for user feedback

* **Development Experience**
  * Comprehensive error handling
  * Code quality tools (ESLint, Prettier)
  * Git hooks with Husky
  * Conventional commit messages

## Tech Stack

* Framework: React 18 with TypeScript
* Build Tool: Vite
* State Management: TanStack Query (React Query)
* Styling: Tailwind CSS
* HTTP Client: Axios
* Routing: React Router DOM
* Form Handling: Custom hooks
* Code Quality: ESLint, Prettier, Husky
* Notifications: React Toastify

## Prerequisites

* Node.js (v14.0.0 or higher)
* npm (v6.0.0 or higher)

## Project Structure

```
project/
├── src/
│   ├── api/        # API service calls
│   ├── components/ # Reusable UI components
│   ├── config/     # Configuration files
│   ├── constants/  # Constants and enums
│   ├── hooks/      # Custom React hooks
│   ├── pages/      # Page components
│   ├── types/      # TypeScript interfaces
│   └── App.tsx     # Main application component
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```
   VITE_BASE_URL=your_api_base_url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run lint` - Run ESLint
* `npm run format` - Format code with Prettier
* `npm run preview` - Preview production build

## Key Components

### Order Management
* Create new orders with multiple products
* View and search existing orders
* Update order details and associated products
* Delete orders with confirmation

### Error Handling
* Comprehensive error handling with toast notifications
* Network status monitoring
* Retry mechanisms for failed API calls

### Performance Optimizations
* Debounced search functionality
* Memoized values and callbacks
* Skeleton loading states
* React Query for efficient data caching

## Best Practices

* Custom hooks for reusable logic
* TypeScript for type safety
* Component composition
* Responsive design patterns
* Error boundary implementation
* Loading state handling