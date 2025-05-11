import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [colorMsg, setColorMsg] = useState("text-green-500");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    fetch(`${API_URL}/validateLogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("phone", data.user.phone);

          Swal.fire({
            title: "Account validated!",
            text: "Redirecting to dashboard..",
            icon: "success",
            timer: 1000, // Auto-close after 1 second
            showConfirmButton: false, // Hide the "OK" button
          }).then((result) => {
            navigate("/dashboard");
          });
        } else {
          Swal.fire({
            title: data.message,
            text: "You might have not signed up yet. Please click Sign Up to register.",
            icon: "success",
            showConfirmButton: false, // Hide the "OK" button
          });
        }
      })
      .catch((err) => {
        setMessage("There was an error encountered.");
        setColorMsg("text-red-400");
        // throw new Error(err.message);
      });
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("email") !== "")
      navigate("/dashboard");
  });

  return (
    <div className="bg-cyan-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
          Welcome to BrighterSmile!
        </h2>

        <p className={colorMsg}>{message}</p>
        <form method="POST" className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              required
              onChange={changeEmail}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              required
              onChange={changePassword}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded hover:bg-cyan-700 transition"
            >
              Log In
            </button>
          </div>

          <div className="text-sm text-center mt-3">
            {/* <a href="/forgotpassword" className="text-cyan-600 hover:underline">
              Forgot password?
            </a>
            {" | "} */}
            <a href="/" className="text-cyan-600 hover:underline">
              Go to Homepage
            </a>
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-cyan-600 hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
