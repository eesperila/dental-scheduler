# Pre-requisite

- Go to `dental-scheduler/server` directory
- Run `npm start`. Make sure to run the server and the MongoDB \
  🚀 Server running on port 5000 \
  ✅ MongoDB connected successfully

## Running the React App

- Go to `dental-scheduler/client` directory
- Run `npm start`. The app will be running on port `3000`
- Go to `http://localhost:3000` in the browser
- This page should display the homepage of the Dental Scheduler app

## Pre-defined values

### Available Dentists

    Dr. Olivia Hart, DDS
    Dr. Marcus Lin, DMD
    Dr. Priya Sha, DDS
    Dr. James Caldwell, DMD
    Dr. Alexie Santos, DDS

### Available Services

    Routine Check-up & Cleanings
    Teeth Whitening
    Dental Implants
    Braces / Invisalign
    Emergency Care
    Dental Veneers
    Dental Crowns
    Cosmetic Fillings

## Booking an Appointment

- Click the `Book an Appointment` button in the homepage
- It will redirect you to `/appointment` page.
  - Fill up the form:
    - Fullname (Name of the patient, `alphanumeric`)
    - Email - this will be the identifier that the specific schedule is for that particular patient. They will see the appointment in the `/dashboard` page once they register and login.
    - Phone Number (contact number of the patient, `numeric`)
    - Preferred Dentist - this is a pre-defined list of Dentists available in the database (see the `/server/models/Dentists` schema)
    - Preferred Date and Time
    - Service Type - this is a pre-defined list of services available in the database (see the `/server/models/Dentists` schema)

## Login

- Click the `Login` button in the homepage to be available to see scheduled appointments
- It will redirect you to `/login` page.
  - Fill up the form:
    - Email (registed email address)
    - Password (nominated password during the registration)
- When the account is successfully validated, it will redirect you to `/dashboard` page

## Sign Up

- Clicking the `Sign Up` link at the bottom, it will be redirected to `/register` page.
- Fill up the form:
  - Full Name
  - Email
  - Phone Number
  - Password
  - Confirm Password
- Clicking the `Register` button will save the patient information to the database.
- It will be redirected to the login page.

## Dashboard page

- Displays the Appointment schedule for specific patient

| Date          | Time     | Phone       | Dentist                 |               |
| ------------- | -------- | ----------- | ----------------------- | ------------- |
| May 17, 2025  | 03:00 PM | 09190746385 | Dr. Marcus Lin, DMD     | Edit / Cancel |
| June 10, 2025 | 12:30 PM | 09207754735 | Dr. Olivia Hart, DDS    | Edit / Cancel |
| June 22, 2025 | 09:45 AM | 09108473622 | Dr. James Caldwell, DMD | Edit / Cancel |

### Editing an appointment

- Clicking the `Edit` link will redirect you to `/appointments/edit/<appointment_id>`
- The `Edit Appointment` form is similar with `Booking Appointment` but it is pre-poluated.
- The `Email` field is NOT editable since it is the identifier that relates to the patient.
- Click the `Edit Appointment` button to confirm the changes.
- Then the app will be redirected back to the `/dashboard` page to quickly look at the changes made in the appointment.

### Cancelling an appointment

- Clicking the `Cancel` link, the app will display a dialog dialog to confirm the cancellation. If you choose to cancel the appointment, your scheduled appointment will be cancelled and it will display a message box confirming the cancellation and it wll just refresh the page.
