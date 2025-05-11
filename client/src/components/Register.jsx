import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import Swal from "sweetalert2";

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (password == cPassword) {
        Swal.fire({
          title: "Do you want to continue?",
          text: "The information will be saved to the database.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#00ACC1",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, continue",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            const user = registerUser(name, email, phone, password);
            // Redirect to login page
            if (typeof user !== "undefined") {
              Swal.fire({
                title: "Account has been saved!",
                text: "Redirecting to login page..",
                icon: "success",
                timer: 1000, // Auto-close after 1 second
                showConfirmButton: false, // Hide the "OK" button
              }).then((result) => {
                navigate("/login");
              });
            } else console.log("There was an error encountered.");
          }
        });
      } else {
        Swal.fire({
          title: "Passwords did not match!",
          text: "Please double check your passwords.",
          icon: "warning",
          showConfirmButton: false, // Hide the "OK" button
        });
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeCPassword = (e) => {
    setCPassword(e.target.value);
  };

  return (
    <div className="bg-cyan-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
          Create Your Account
        </h2>

        <p className="text-red-400">{errorMsg}</p>
        <form
          action="#"
          method="POST"
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={changeName}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={changeEmail}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={changePhone}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={changePassword}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={cPassword}
              onChange={changeCPassword}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-700 transition"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-600 hover:underline font-medium"
          >
            Log in
          </a>
          {" | "}
          <a href="/" className="text-cyan-600 hover:underline">
            Back to Homepage
          </a>
        </p>
      </div>
    </div>
  );
}

const registerUser = async (name, email, phone, password) => {
  fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.user;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export default Register;
