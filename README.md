# Code Quest Lightweight User Dashboard

A modern, lightweight React dashboard application built with Vite for fast development and optimal performance. This dashboard provides an intuitive interface for managing users, orders, and business data with real-time updates and responsive design.

## 🚀 Features

### Core Features
- **User Management**: View, create, edit, and delete user profiles
- **Order Management**: Track and manage customer orders with status updates
- **Data Visualization**: Interactive charts and graphs for business insights
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Real-time Updates**: Live data synchronization
- **Search & Filters**: Advanced filtering and search capabilities
- **Modal System**: Elegant modal components for forms and confirmations

### UI/UX Features
- **Modern Interface**: Clean, minimalist design with smooth animations
- **GSAP Animations**: Smooth transitions and micro-interactions
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Toast Notifications**: Real-time feedback for user actions

### Technical Features
- **Fast Performance**: Built with Vite for lightning-fast builds
- **Type Safety**: PropTypes validation for component props
- **Code Splitting**: Lazy loading for optimal bundle size
- **Hot Module Replacement**: Instant updates during development
- **ESLint Integration**: Code quality and consistency enforcement

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Elfawi/code-quest-lightweight-user-dashboard.git
   cd code-quest-lightweight-user-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   VITE_APP_TITLE=Code Quest Dashboard
   VITE_ENVIRONMENT=development
   ```

4. **Database Setup** (if using local backend)
   ```bash
   # Create PostgreSQL database
   createdb codequest_dashboard
   
   # Run database migrations
   npm run db:migrate
   
   # Seed initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📡 API Endpoints Used

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Customers Management
- `GET /api/customers` - Get all customers with pagination
- `GET /api/customers/:id` - Get specific customer by ID
- `PUT /api/customers/:id` - Update customer information
- `DELETE /api/customers/:id` - Delete customer

### Orders Management
- `GET /api/orders` - Get all orders with filters
- `GET /api/orders/:id` - Get specific order details
- `GET /api/orders/customer/:customerId` - Get orders by customer

### Foods/Products Management
- `GET /api/foods` - Get all food items/products
- `GET /api/foods/:id` - Get specific food item

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API service functions
├── utils/              # Utility functions
├── styles/             # Global styles and themes
├── context/            # React context providers

```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 🔧 Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **GSAP** - Animations library
- **React Hook Form** - Form management
- **PropTypes** - Props validation
- **ESLint** - Code linting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact the development team.

## 🔄 Version History

- **v1.0.0** - Initial release with core dashboard functionality
- **v1.1.0** - Added dark mode and enhanced animations
- **v1.2.0** - Improved performance and added new analytics features

---

Made with ❤️ by [Elfawi](https://github.com/Elfawi)