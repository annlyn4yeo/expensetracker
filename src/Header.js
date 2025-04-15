import { useState } from "react";
import { Modal } from "./Modal";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export const Header = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsSignupOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="mb-6 flex justify-between items-center px-8 py-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
        <p className="text-gray-500">Track your income and expenses easily</p>
      </div>
      <div className="space-x-2">
        {user ? (
          <div className="flex items-center">
            <p className="mr-4">Hi, {user.name}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
            >
              Login
            </button>
          </>
        )}
      </div>

      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <SignupForm
          onClose={() => setIsSignupOpen(false)}
          onSignup={handleSignup}
        />
      </Modal>

      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      </Modal>
    </div>
  );
};
