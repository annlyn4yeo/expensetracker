import { useState } from "react";

export const LoginForm = ({ onClose }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "This field is required.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "This field is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Login data:", form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <h2 className="text-xl font-semibold text-center">Login</h2>

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

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  );
};
