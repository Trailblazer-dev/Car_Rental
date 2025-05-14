# CarHire Frontend

This is the frontend application for the CarHire project - a car rental service that allows users to browse, book, and manage car rentals.

## MVP Features Implemented

- ✅ User authentication (login/signup)
- ✅ Car browsing and filtering
- ✅ Car detail views
- ✅ Responsive design for all device sizes
- ✅ Integration with the Django backend API

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - API requests
- **TailwindCSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Backend server running (see backend setup instructions)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/car_rental.git
   cd car_rental/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

```
frontend/
├── src/
│   ├── assets/         # Static assets (images, etc.)
│   ├── components/     # Reusable UI components
│   │   ├── cars/       # Car-related components
│   │   └── layout/     # Layout components (navbar, footer)
│   ├── pages/          # Application pages
│   │   ├── auth/       # Authentication pages
│   │   └── cars/       # Car-related pages
│   ├── services/       # API services
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Public assets
└── ...config files     # Various configuration files
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Backend Integration

The frontend connects to a Django REST API backend. Key integration points:

- Authentication using JWT tokens
- Car data fetching and filtering
- Booking management

## Next Steps

Planned features for future development:

1. User dashboard for managing bookings
2. Payment integration
3. Owner portal for car owners to list vehicles
4. Admin dashboard
5. Reviews and ratings system

## Original Vite Documentation

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
