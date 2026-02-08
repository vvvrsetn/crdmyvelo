import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomePage from './pages/home';
import RecordsPage from './pages/records';
import ProfilePage from './pages/profile';
import LessonDetailsPage from './pages/lesson-details';
import LoginAuthentication from './pages/login-authentication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/lesson/:lessonId" element={<LessonDetailsPage />} />
        <Route path="/login" element={<LoginAuthentication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
