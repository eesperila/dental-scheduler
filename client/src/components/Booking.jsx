import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format, toZonedTime } from "date-fns-tz";
import Swal from "sweetalert2";

function Booking() {
  const [dentists, setDentists] = useState([]);
  const [services, setServices] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dentistId, setDentist] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [serviceId, setService] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const getDentists = () => {
    fetch("http://localhost:5000/api/dentists")
      .then((res) => res.json())
      .then((data) => {
        setDentists(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const getServices = () => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const getAppointment = () => {
    fetch(`http://localhost:5000/api/appointment/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const { name, email, phone, serviceId, dentistId, dateTime } =
            data.appointment;

          let schedDate = toZonedTime(dateTime, "Asia/Manila");
          schedDate = format(schedDate, "yyyy-MM-dd HH:mm", {
            timeZone: "Asia/Manila",
          });

          setFullname(name);
          setEmail(email);
          setPhone(phone);
          setService(serviceId);
          setDentist(dentistId);
          setDateTime(schedDate);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    checkAppointment();
    getDentists();
    getServices();
    getAppointment();
  }, []);

  const checkAppointment = () => {
    if (id) {
      fetch(`http://localhost:5000/api/appointment/${id}`)
        .then((res) => {
          if (res.status === 404 || res.status === 400) {
            navigate("*");
          }
          return res.json();
        })
        .then((data) => {});
    }
  };

  const bookAppointment = async (
    fullname,
    email,
    phone,
    dentistId,
    dateTime,
    serviceId
  ) => {
    fetch(`http://localhost:5000/api/book/${id ? id : ""}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        email,
        phone,
        dentistId,
        dateTime,
        serviceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This appointment will be saved to the database.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00ACC1",
        cancelButtonColor: "#d33",
        confirmButtonText: "Book Appointment",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          const appointment = bookAppointment(
            fullname,
            email,
            phone,
            dentistId,
            dateTime,
            serviceId
          );
          // Redirect to homepage / dashboard page
          if (typeof appointment !== "undefined") {
            const dateSched = new Date(dateTime);
            const formattedDate = format(dateSched, "MMM dd, yyyy");
            const formattedTime = format(dateSched, "hh:mm a");
            Swal.fire({
              title: "Appointment Booked!",
              icon: "success",
              text: `See you on ${formattedDate} at ${formattedTime}!`,
              confirmButtonColor: "#00ACC1",
            });

            if (id) navigate("/dashboard");
            else navigate("/");
          } else console.log("There was an error encountered.");
        }
      });
    } catch (err) {
      // setErrorMsg(err.message);
    }
  };

  return (
    <>
      <header className="bg-cyan-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Book an Appointment</h1>
        <p className="text-lg">We’re excited to see your smile!</p>
      </header>

      <main className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={id}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="dentist" className="block text-sm font-medium">
              Preferred Dentist
            </label>
            <select
              id="dentist"
              name="dentist"
              required
              onChange={(e) => {
                setDentist(e.target.value);
              }}
              value={dentistId}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="">Select a Dentist</option>
              {dentists.map(({ _id, name, title }, i) => {
                return (
                  <option key={i} value={_id}>
                    {name}, {title}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Preferred Date
            </label>
            {/* set the minimum date at least */}
            <input
              type="datetime-local"
              id="date"
              name="date"
              min={new Date(
                new Date().getTime() +
                  (new Date().getTimezoneOffset() + 480) * 60 * 1000
              )
                .toISOString()
                .slice(0, 16)}
              value={dateTime}
              onChange={(e) => {
                setDateTime(e.target.value);
              }}
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium">
              Service Type
            </label>
            <select
              id="service"
              name="service"
              required
              onChange={(e) => {
                setService(e.target.value);
              }}
              value={serviceId}
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="">Select a service</option>
              {services.map(({ _id, name }, i) => {
                return (
                  <option key={i} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition font-semibold"
            >
              {id ? "Edit Appointment" : "Submit Appointment Request"}
            </button>
          </div>
          <div className="text-center">
            <a href="/" className="text-cyan-600 hover:underline">
              Back to Homepage
            </a>
          </div>
        </form>
      </main>

      <footer className="text-center text-sm py-4 bg-gray-200 mt-10">
        &copy; 2025 BrighterSmile Dental Clinic | 123 Alabang-Zapote Road, Las
        Piñas City, Metro Manila
      </footer>
    </>
  );
}

export default Booking;
