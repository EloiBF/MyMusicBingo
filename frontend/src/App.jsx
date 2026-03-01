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
import Premium from './pages/Premium';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import ArticleCreator from './components/ArticleCreator';

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

const PublicRouteWithLayout = ({ children }) => {
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
        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <Premium />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<PublicRouteWithLayout><Terms /></PublicRouteWithLayout>} />
        <Route path="/privacy" element={<PublicRouteWithLayout><PrivacyPolicy /></PublicRouteWithLayout>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/create-article" element={<ArticleCreator />} />
        <Route path="/preview" element={<LivePreview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
