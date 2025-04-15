import { useState } from "react";
import axios from "axios";

export const SignupForm = ({ onClose, onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~^-]{6,}$/.test(
      password
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    if (form.email && !isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (form.password && !isStrongPassword(form.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain both letters and numbers.";
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );
      onClose();
      onSignup(data);
    } catch (err) {
      console.error(
        "❌ Error registering user:",
        err.response?.data || err.message
      );
      setErrors({ email: "User registration failed. Try another email." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>

      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Create Account
      </button>
    </form>
  );
};
