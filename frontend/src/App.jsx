import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import PrintView from './pages/PrintView';
import CreateBingo from './pages/CreateBingo';
import BingoDetail from './pages/BingoDetail';
import SongTrackingPage from './pages/SongTrackingPage';
import Settings from './pages/Settings';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';

import Layout from './components/Layout';

import AuthCallback from './pages/AuthCallback';
import LivePreview from './pages/LivePreview';

const ProtectedRoute = ({ children, withLayout = true }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return withLayout ? <Layout>{children}</Layout> : children;
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
          path="/bingo/:id/track"
          element={
            <ProtectedRoute>
              <SongTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/print/:eventId"
          element={
            <ProtectedRoute withLayout={false}>
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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/preview" element={<LivePreview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
