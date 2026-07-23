import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useLogoutMutation } from "../../api/apiSlice";
import { logout } from "../../features/auth/authSlice";
import NotificationBell from "../notifications/NotificationBell";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutApi();
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "am" : "en");
  };

  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff" || isAdmin;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          {t("appName")}
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">
            {t("home")}
          </Link>
          <Link to="/cars" className="hover:underline">
            {t("cars")}
          </Link>
          {user && (
            <>
              <Link to="/bookings" className="hover:underline">
                {t("bookings")}
              </Link>
              <Link to="/profile" className="hover:underline">
                {t("profile")}
              </Link>
              {isStaff && (
                <Link to="/staff/dashboard" className="hover:underline">
                  {t("staff")}
                </Link>
              )}
              {isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/cars"
                    className="hover:underline font-semibold"
                  >
                    Car Management
                  </Link>
                  <Link to="/admin/bookings" className="hover:underline">
                    Bookings
                  </Link>
                  <Link to="/admin/booked-cars" className="hover:underline">
                    Booked Cars
                  </Link>
                  <Link to="/admin/verifications" className="hover:underline">
                    Verifications
                  </Link>
                  <Link to="/admin/users" className="hover:underline">
                    Users
                  </Link>
                  <Link to="/admin/coupons" className="hover:underline">
                    Coupons
                  </Link>
                </>
              )}
            </>
          )}
          <button
            onClick={toggleLanguage}
            className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            {i18n.language === "en" ? "አማርኛ" : "English"}
          </button>
          <NotificationBell />
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-blue-600 hover:bg-gray-100"
            >
              {t("logout")}
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-secondary text-blue-600 hover:bg-gray-100"
            >
              {t("login")}
            </Link>
          )}
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2">
          <Link
            to="/"
            className="block hover:underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            to="/cars"
            className="block hover:underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("cars")}
          </Link>
          {user && (
            <>
              <Link
                to="/bookings"
                className="block hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("bookings")}
              </Link>
              <Link
                to="/profile"
                className="block hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("profile")}
              </Link>
              {isStaff && (
                <Link
                  to="/staff/dashboard"
                  className="block hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("staff")}
                </Link>
              )}
              {isAdmin && (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/cars"
                    className="block hover:underline font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Car Management
                  </Link>
                  <Link
                    to="/admin/bookings"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Bookings
                  </Link>
                  <Link
                    to="/admin/booked-cars"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Booked Cars
                  </Link>
                  <Link
                    to="/admin/verifications"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Verifications
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/coupons"
                    className="block hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Coupons
                  </Link>
                </>
              )}
            </>
          )}
          <button
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
            className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm block w-full text-left"
          >
            {i18n.language === "en" ? "አማርኛ" : "English"}
          </button>
          <NotificationBell />
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-secondary text-blue-600 hover:bg-gray-100 block w-full text-left"
            >
              {t("logout")}
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-secondary text-blue-600 hover:bg-gray-100 block w-full text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("login")}
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
