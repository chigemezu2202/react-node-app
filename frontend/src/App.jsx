import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import SignUpPage from "./pages/SignUpPage";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/resetPassword";
import { useAuthStore } from "./store/authStore";


//Hack: Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  //Hack: Protect routes with authentication required
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //Hack: Protect routes with  verification required
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

//Hack: Redirect Authenticated User to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // Hack: Guard against cases where user might be undefined/null
  if (isAuthenticated &&  user.isVerified) {
    // Hack: Redirect the verified and authenticated user to the home page
    return <Navigate to="/" replace />;
  }
  //Hack: If not authenticated or user is not verified, render the children
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-green-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        {/** //Hack: Forgot Password Route  */}
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/** //Hack: Reset Password Route  */}
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />

        {/** //Hack: Page Not Found Route  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
