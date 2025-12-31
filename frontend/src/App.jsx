import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import PrintView from './pages/PrintView';
import CreateBingo from './pages/CreateBingo';
import BingoDetail from './pages/BingoDetail';
import Settings from './pages/Settings';

import Layout from './components/Layout';

import AuthCallback from './pages/AuthCallback';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBingo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bingo/:id"
          element={
            <ProtectedRoute>
              <BingoDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bingo/:id/edit"
          element={
            <ProtectedRoute>
              <CreateBingo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/print/:eventId"
          element={
            <ProtectedRoute>
              <PrintView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
