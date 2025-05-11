## Running the Server

- Go to `dental-scheduler/server` directory
- Run `npm start`. Make sure to run the server and the MongoDB \
  🚀 Server running on port 5000 \
  ✅ MongoDB connected successfully

## File Structure

```
server/
├── middleware/
│   └── auth.js             -- responsible for running in between the routes
├── models/
│   ├── Appointments.js     -- Database schema for Appointments collection
│   └── Dentists.js         -- Database schema for Dentists collection
│   └── Services.js         -- Database schema for Services collection
│   └── Users.js            -- Database schema for Users collection
├── routes/
│   └── auth.js             -- responsible for managing the API endpoints
├── .Dockerfile
├── .env
├── .env.production
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
├── server.js               -- entry point to the server
```

## API Endpoints

```
POST          /api/register                 Validation of user registration
POST          /api/validateLogin            Validation of user login
POST          /api/profileupdate/:id        Handling the manage profile page
POST          /api/book                     Handling of booking an appointment
POST          /api/appointments             Fetch all scheduled appointments of specific user
GET           /api/appointment/:id          Handling the validation of profile update
GET           /api/appointments/cancel/:id  Handling the validation of cancelling appointment
GET           /api/dentists                 Fetch the list of dentists
GET           /api/services                 Fetch the list of services
```

## Database Schema

### Appointments

```js
const AppointmentsSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateTime: { type: Date, required: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    dentistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentists",
      required: true,
    },
    status: { type: String, default: "confirmed" },
  },
  { timestamps: true }
);
```

### Dentists

```js
const DentistsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);
```

### Services

```js
const ServicesSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
  },
  { timestamps: true }
);
```

### User

```js
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
```
