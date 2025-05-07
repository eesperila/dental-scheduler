import { useEffect, useState } from "react";

function Dashboard() {
  const [name, setName] = useState("Jane Doe");

  // get the stored user details
  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);
  return (
    <>
      <header className="bg-cyan-600 text-white py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Welcome, {name}</h1>
          <p className="text-sm">Here are your upcoming dental appointments</p>
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
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">May 10, 2025</td>
                  <td className="py-2 px-4 border-b">10:30 AM</td>
                  <td className="py-2 px-4 border-b">Teeth Cleaning</td>
                  <td className="py-2 px-4 border-b">Dr. Olivia Hart</td>
                  <td className="py-2 px-4 border-b text-green-600 font-medium">
                    Confirmed
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">May 15, 2025</td>
                  <td className="py-2 px-4 border-b">2:00 PM</td>
                  <td className="py-2 px-4 border-b">Dental Checkup</td>
                  <td className="py-2 px-4 border-b">Dr. Marcus Lin</td>
                  <td className="py-2 px-4 border-b text-yellow-600 font-medium">
                    Pending
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">May 22, 2025</td>
                  <td className="py-2 px-4 border-b">1:00 PM</td>
                  <td className="py-2 px-4 border-b">
                    Invisalign Consultation
                  </td>
                  <td className="py-2 px-4 border-b">Dr. Priya Shah</td>
                  <td className="py-2 px-4 border-b text-green-600 font-medium">
                    Confirmed
                  </td>
                </tr>
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
