import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMeQuery } from "./api/apiSlice";
import { setUser, logout } from "./features/auth/authSlice";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Spinner from "./components/common/Spinner";

// Lazy load pages for performance
const HomePage = lazy(() => import("./pages/customer/HomePage"));
const CarListPage = lazy(() => import("./pages/customer/CarListPage"));
const CarDetailPage = lazy(() => import("./pages/customer/CarDetailPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/auth/VerifyEmailPage"));
const VerifyEmailPending = lazy(
  () => import("./pages/auth/VerifyEmailPending"),
);
const PaymentSuccessPage = lazy(
  () => import("./pages/customer/PaymentSuccessPage"),
);
const NotFoundPage = lazy(() => import("./pages/shared/NotFoundPage"));
const ProfilePage = lazy(() => import("./pages/customer/ProfilePage"));
const ProfileCompletionPage = lazy(
  () => import("./pages/customer/ProfileCompletionPage"),
);
const MyBookingsPage = lazy(() => import("./pages/customer/MyBookingsPage"));
const BookingDetailPage = lazy(
  () => import("./pages/customer/BookingDetailPage"),
);
const BookingPage = lazy(() => import("./pages/customer/BookingPage"));
const EditBookingPage = lazy(() => import("./pages/customer/EditBookingPage"));
const PaymentPage = lazy(() => import("./pages/customer/PaymentPage"));
const SupportPage = lazy(() => import("./pages/customer/SupportPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminCarManagement = lazy(
  () => import("./pages/admin/AdminCarManagement"),
);
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminUserDetails = lazy(() => import("./pages/admin/AdminUserDetails"));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons"));
const AdminTickets = lazy(() => import("./pages/admin/AdminTickets"));
const AdminReports = lazy(() => import("./pages/admin/AdminReports"));
const AdminBookingManagement = lazy(
  () => import("./pages/admin/AdminBookingManagement"),
);
const AdminBookedCars = lazy(() => import("./pages/admin/AdminBookedCars"));
const AdminVerifications = lazy(
  () => import("./pages/admin/AdminVerifications"),
);
const StaffDashboard = lazy(() => import("./pages/staff/StaffDashboard"));
const StaffBookings = lazy(() => import("./pages/staff/StaffBookings"));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetMeQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (data) dispatch(setUser(data.user));
    if (error) dispatch(logout());
  }, [data, error, dispatch]);

  if (isLoading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
        <p className="ml-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            }
          >
            <Routes>
              {/* Public */}
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarListPage />} />
              <Route path="/cars/:id" element={<CarDetailPage />} />
              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <RegisterPage /> : <Navigate to="/" />}
              />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />
              <Route
                path="/verify-email/:token"
                element={<VerifyEmailPage />}
              />
              <Route
                path="/verify-email-pending"
                element={<VerifyEmailPending />}
              />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="*" element={<NotFoundPage />} />

              {/* Protected Customer */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/profile/complete"
                  element={<ProfileCompletionPage />}
                />
                <Route path="/bookings" element={<MyBookingsPage />} />
                <Route path="/bookings/:id" element={<BookingDetailPage />} />
                <Route
                  path="/bookings/:id/edit"
                  element={<EditBookingPage />}
                />
                <Route path="/book/:id" element={<BookingPage />} />
                <Route path="/payment/:bookingId" element={<PaymentPage />} />
                <Route path="/support" element={<SupportPage />} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/cars" element={<AdminCarManagement />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route
                  path="/admin/users/:userId"
                  element={<AdminUserDetails />}
                />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
                <Route path="/admin/tickets" element={<AdminTickets />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route
                  path="/admin/bookings"
                  element={<AdminBookingManagement />}
                />
                <Route
                  path="/admin/booked-cars"
                  element={<AdminBookedCars />}
                />
                <Route
                  path="/admin/verifications"
                  element={<AdminVerifications />}
                />
              </Route>

              {/* Staff */}
              <Route element={<ProtectedRoute roles={["staff", "admin"]} />}>
                <Route path="/staff/dashboard" element={<StaffDashboard />} />
                <Route path="/staff/bookings" element={<StaffBookings />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
