import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  return (
    <>
      <header className="bg-cyan-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">BrighterSmile Dental Clinic</h1>
        <p className="text-lg">Your smile, our passion!</p>
      </header>

      <div className="min-h-screen bg-cyan-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-cyan-700 mb-4">
          Welcome to BrighterSmile Dental
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
          Your trusted dental care partner. Book appointments, check your
          schedule, and manage your visits online.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/appointment"
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            Book an Appointment
          </Link>

          <Link
            to="/login"
            className="border border-cyan-600 text-cyan-600 px-6 py-2 rounded hover:bg-cyan-100 transition"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="bg-cyan-100">
        <section className="max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-semibold text-cyan-600 mb-2">
            About Us
          </h2>
          <p className="text-base">
            Located in the heart of downtown, BrighterSmile Dental Clinic offers
            top-quality dental care in a friendly and comfortable environment.
            Our team of experienced professionals is committed to making your
            visit stress-free and effective.
          </p>
        </section>

        <section className="max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-semibold text-cyan-600 mb-4">
            Our Services
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {services.map(({ name }, i) => {
              return <li key={i}>{name}</li>;
            })}
          </ul>
        </section>

        <section className="bg-cyan-600 text-white text-center py-8 mt-6">
          <h2 className="text-2xl font-bold mb-2">
            Book Your Appointment Today
          </h2>
          <p className="mb-4">
            Call us at <strong>(02) 7788-8877</strong> or click below to
            schedule online.
          </p>
          <a
            href="/appointment"
            className="bg-white text-cyan-600 font-semibold px-6 py-2 rounded hover:bg-cyan-100 transition"
          >
            Book an Appointment
          </a>
        </section>

        <footer className="text-center text-sm py-4 bg-gray-200">
          &copy; 2025 BrighterSmile Dental Clinic | 123 Alabang-Zapote Road, Las
          Piñas City, Metro Manila
        </footer>
      </div>
    </>
  );
};

export default Homepage;
