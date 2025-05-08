import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const id = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  const [message, setMessage] = useState("");
  const [colorMsg, setColorMsg] = useState("text-green-500");
  const [name, setName] = useState(localStorage.getItem("name"));
  const [phone, setPhone] = useState(localStorage.getItem("phone"));
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const navigate = useNavigate();

  const updateUser = async (id, name, email, phone, password) => {
    fetch(`http://localhost:5000/api/profileupdate/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile:updateUser", data);
        if (data.status) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("phone", data.user.phone);

          // Redirect to dashboard page
          setMessage("Redirecting..");
          setColorMsg("text-green-500");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          setMessage(data.message);
          setColorMsg("text-red-400");
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (password === cpassword) updateUser(id, name, email, phone, password);
      else {
        setMessage("Passwords do not match.");
        setColorMsg("text-red-400");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const changeName = (e) => {
    setName(e.target.value);
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
          Manage Your Profile
        </h2>

        <p className={colorMsg}>{message}</p>
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
              disabled
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
              value={cpassword}
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
              Update
            </button>
          </div>
          <div className="text-sm text-center mt-3">
            <a href="/dashboard" className="text-cyan-600 hover:underline">
              Back to Dashboard page
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
