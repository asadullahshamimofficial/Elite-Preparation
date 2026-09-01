import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import FiqhApp from './pages/FiqhApp';
import BalaghatPage from './pages/BalaghatPage';
import AdminPanel from './pages/AdminPanel';
import StudentProfile from './pages/StudentProfile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModal />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<HomePage />} />

          {/* Student Profile & Dashboard */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />

          {/* Protected Study Series Routes */}
          <Route
            path="/alim/fiqh-1st-paper"
            element={
              <ProtectedRoute>
                <FiqhApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alim/balagat-and-mantiq"
            element={
              <ProtectedRoute>
                <BalaghatPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Alias Routes */}
          <Route
            path="/fiqh-1st-paper"
            element={
              <ProtectedRoute>
                <FiqhApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/balagat-and-mantiq"
            element={
              <ProtectedRoute>
                <BalaghatPage />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Control Panel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
