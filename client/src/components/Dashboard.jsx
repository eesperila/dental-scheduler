import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { API_URL } from "../config";
import Swal from "sweetalert2";

function Dashboard() {
  const name = localStorage.getItem("name");
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  // get the stored appointment details
  useEffect(() => {
    getAppointments();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "The current session will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00ACC1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); // Clear auth token
        localStorage.removeItem("name"); // Clear auth token
        localStorage.removeItem("userId"); // Clear auth token
        localStorage.removeItem("email"); // Clear auth token
        navigate("/login"); // Redirect to login page
      }
    });
  };

  const getAppointments = () => {
    const email = localStorage.getItem("email");
    fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      });
  };

  const cancelAppointment = (e, id) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00ACC1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancel Appointment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/appointments/cancel/${id ? id : ""}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Refreshing the dashboard page.");
            Swal.fire(
              "Deleted!",
              "The appointment has been cancelled.",
              "success"
            );
            navigate("/dashboard");
            getAppointments();
          });
      }
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
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Dentist</th>
                  <th className="py-2 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {appointments.map(
                  ({ _id, dateTime, service, dentist, phone }, i) => {
                    const dateSched = new Date(dateTime);
                    const formattedDate = format(dateSched, "MMM dd, yyyy");
                    const formattedTime = format(dateSched, "hh:mm a");

                    return (
                      <tr className="hover:bg-gray-50" key={i}>
                        <td className="py-2 px-4 border-b">{formattedDate}</td>
                        <td className="py-2 px-4 border-b">{formattedTime}</td>
                        <td className="py-2 px-4 border-b">{phone}</td>
                        <td className="py-2 px-4 border-b">{service.name}</td>
                        <td className="py-2 px-4 border-b">
                          {dentist.name}, {dentist.title}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <a
                            href={`/appointments/edit/${_id}`}
                            className="text-cyan-600 hover:underline"
                            title="Edit appointment"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>Edit
                          </a>
                          &nbsp;&nbsp;&nbsp;
                          <a
                            href={`/appointments/cancel/${_id}`}
                            className="text-red-600 hover:underline"
                            title="Cancel appointment"
                            onClick={(e) => cancelAppointment(e, `${_id}`)}
                          >
                            <i className="fa-solid fa-trash"></i>Cancel
                          </a>
                        </td>
                      </tr>
                    );
                  }
                )}

                {appointments.length === 0 && (
                  <tr className="hover:bg-gray-50">
                    <td
                      colSpan="6"
                      className="py-2 px-4 border-b border-l border-r text-center"
                    >
                      No scheduled appointments.{" "}
                      {/* <a
                        href="/appointment"
                        className="text-red-600 hover:underline"
                      >
                        Book Now!
                      </a> */}
                    </td>
                  </tr>
                )}
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
