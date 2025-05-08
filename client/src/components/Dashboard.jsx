import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Dashboard() {
  const name = localStorage.getItem("name");
  const [appointments, setAppointments] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigate = useNavigate();

  // get the stored appointment details
  useEffect(() => {
    getAppointments(localStorage.getItem("email"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    localStorage.removeItem("name"); // Clear auth token
    localStorage.removeItem("userId"); // Clear auth token
    localStorage.removeItem("email"); // Clear auth token
    navigate("/login"); // Redirect to login page
  };

  const getAppointments = (email) => {
    fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      });
  };

  return (
    <>
      <header className="bg-cyan-600 text-white py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {name}</h1>
          <p className="text-sm">Here are your upcoming dental appointments</p>
        </div>
        <div>
          <Link
            to="/profile"
            className="bg-cyan-600 text-white font-medium px-6 py-2 rounded hover:text-amber-200 transition"
          >
            Manage Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-cyan-600 font-medium px-4 py-1 rounded hover:bg-cyan-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyan-600 mb-4">
            Appointment Schedule
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead className="bg-cyan-100 text-cyan-700">
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Dentist</th>
                  {/* <th className="py-2 px-4 border-b">Status</th> */}
                </tr>
              </thead>
              <tbody className="text-sm">
                {appointments.map(({ dateTime, serviceId, dentistId }, i) => {
                  // const schedule = new Date(dateTime);
                  // const year = schedule.getFullYear();
                  // const month = schedule.getMonth();
                  // const day = schedule.getDate().toString().padStart(2, "0");

                  // const dateSched = `${months[month]} ${day}, ${year}`;
                  // const timeSched = "10:30 AM";

                  const dateSched = new Date(dateTime);
                  const formattedDate = format(dateSched, "MMM dd, yyyy");
                  const formattedTime = format(dateSched, "hh:mm a");

                  return (
                    <tr className="hover:bg-gray-50" key={i}>
                      <td className="py-2 px-4 border-b">{formattedDate}</td>
                      <td className="py-2 px-4 border-b">{formattedTime}</td>
                      <td className="py-2 px-4 border-b">{serviceId}</td>
                      <td className="py-2 px-4 border-b">{dentistId}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-600 py-6 mt-10">
        &copy; 2025 BrighterSmile Dental Clinic | 123 Alabang-Zapote Road, Las
        Piñas City, Metro Manila
      </footer>
    </>
  );
}

export default Dashboard;
