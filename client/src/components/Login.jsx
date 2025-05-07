import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = loginUser(email, password);
      // Redirect to dashboard page
      if (typeof user !== "undefined") {
        navigate("/dashboard");
      } else console.log("There was an error encountered.");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-cyan-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-cyan-600 text-center mb-6">
          Welcome to BrighterSmile!
        </h2>

        <p className="text-red-400">{errorMsg}</p>
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
            <a href="/forgotpassword" className="text-cyan-600 hover:underline">
              Forgot password?
            </a>
            {" | "}
            <a href="/" className="text-cyan-600 hover:underline">
              Back to Homepage
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

const loginUser = async (email, password) => {
  fetch("http://localhost:5000/api/validateLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      return data.user;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

export default Login;
