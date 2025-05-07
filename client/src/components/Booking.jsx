function Booking() {
  return (
    <>
      <header className="bg-cyan-600 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Book an Appointment</h1>
        <p className="text-lg">We’re excited to see your smile!</p>
      </header>

      <main className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label for="name" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="dentist" className="block text-sm font-medium">
              Preferred Dentist
            </label>
            <select
              id="dentist"
              name="dentist"
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="">Select a Dentist</option>
              <option>Dr. Olivia Hart, DDS</option>
              <option>Dr. Marcus Lin, DMD</option>
              <option>Dr. Priya Shah, DDS</option>
              <option>Dr. James Caldwell, DMD</option>
            </select>
          </div>

          <div>
            <label for="date" className="block text-sm font-medium">
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
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label for="service" className="block text-sm font-medium">
              Service Type
            </label>
            <select
              id="service"
              name="service"
              required
              className="mt-1 w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="">Select a service</option>
              <option>Routine Check-up</option>
              <option>Teeth Whitening</option>
              <option>Dental Implants</option>
              <option>Braces / Invisalign</option>
              <option>Emergency Care</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition font-semibold"
            >
              Submit Appointment Request
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
