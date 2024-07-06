
# Hospital Appointment Scheduler

## Project Description
This project is a hospital appointment scheduling system. Patients can enter their symptoms or required specialization (e.g., cardiology, surgery), and the system will find the nearest available appointment date with a doctor of the specified specialization. The system considers doctor availability, patient load, and appointment duration.

## Technical Requirements
- Programming language: JavaScript (Node.js)
- Database: PostgreSQL
- Docker for containerization

## Base URL
http://localhost:3000

## API Documentation

### 1. Endpoint `api/v1/login`
**Endpoint:** `api/v1/login`  
**Standard:** JWT  

**Request:**
\`\`\`bash
curl -X 'POST' \
'/login' \
-H 'Content-Type: application/json' \
-d '{
  "username": "username",
  "password": "password"
}'
\`\`\`

**Response body:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoiMTY3OTMzMTQ1MDI0aCJ9.4d2cdf71-78e57a475bed0bd4414526df-196a8ed6"
}
\`\`\`

### 2. Endpoint `api/v1/patients`
- **GET `api/v1/patients`** - Get all patients  
  Server responds with status code 200 and all patient records.

  **Request:**
  \`\`\`bash
  curl -X 'GET' 'api/v1/patients'
  \`\`\`

  **Response body:**
  \`\`\`json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "098-765-4321"
    }
  ]
  \`\`\`

- **GET `api/v1/patients/{patientId}`** - Get a patient by ID  
  Server responds with status code 200 and the patient record if it exists.
  
  **Request:**
  \`\`\`bash
  curl -X 'GET' 'api/v1/patients/1'
  \`\`\`

  **Response body:**
  \`\`\`json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
  }
  \`\`\`

- **POST `api/v1/patients/{patientId}`** - Create a new patient
    Server responds with status code 201 and the created patient record.

    **Request:**
      \`\`\`bash
    curl -X 'POST' \
    'api/v1/patients' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }'
    \`\`\`

    **Response body:**
      \`\`\`json
    {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }
    \`\`\`

- **PUT `api/v1/patients/{patientId}`** - Update a patient by ID  
    Server responds with status code 200 and the updated patient record.

    **Request:**
    \`\`\`bash
    curl -X 'PUT' \
    'api/v1/patients/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }'
    \`\`\`

    **Response body:**
    \`\`\`json
    {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }
    \`\`\`

- **DELETE  `api/v1/patients/{patientId}`** - Delete a patient by ID  
    Server responds with status code 204 if the patient is successfully deleted.

    **Request:**
    \`\`\`bash
    curl -X 'DELETE' 'api/v1/patients/1'
    \`\`\`

    **Response body:**
    \`\`\`
    No Content
    \`\`\`

### 3. Endpoint `api/v1/doctors`
- **GET `api/v1/doctors`** - Get all doctors  
  Server responds with status code 200 and all doctor records.

  **Request:**
  \`\`\`bash
  curl -X 'GET' 'api/v1/doctors'
  \`\`\`

  **Response body:**
  \`\`\`json
  [
    {
      "id": 1,
      "name": "Dr. Smith",
      "specialization": "Cardiology"
    },
    {
      "id": 2,
      "name": "Dr. Brown",
      "specialization": "Surgery"
    }
  ]
  \`\`\`

- **GET `api/v1/doctors/{doctorId}`** - Get a doctor by ID  
  Server responds with status code 200 and the doctor record if it exists.
  
  **Request:**
  \`\`\`bash
  curl -X 'GET' 'api/v1/doctors/1'
  \`\`\`

  **Response body:**
  \`\`\`json
  {
    "id": 1,
    "name": "Dr. Smith",
    "specialization": "Cardiology"
  }
  \`\`\`

- **POST `api/v1/doctors/{doctorId}`** - Create a new doctor  
    Server responds with status code 201 and the created doctor record.

    **Request:**
    \`\`\`bash
    curl -X 'POST' \
    'api/v1/doctors' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "Dr. Smith",
    "specialization": "Cardiology"
    }'
    \`\`\`

    **Response body:**
    \`\`\`json
    {
    "id": 1,
    "name": "Dr. Smith",
    "specialization": "Cardiology"
    }
    \`\`\`

- **PUT `api/v1/doctors/{doctorId}`** - Update a doctor by ID 
    Server responds with status code 200 and the updated doctor record.

    **Request:**
    \`\`\`bash
    curl -X 'PUT' \
    'api/v1/doctors/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "Dr. Smith",
    "specialization": "Cardiology"
    }'
    \`\`\`

    **Response body:**
    \`\`\`json
    {
    "id": 1,
    "name": "Dr. Smith",
    "specialization": "Cardiology"
    }
    \`\`\`

- **DELETE  `api/v1/doctors/{doctorId}`** - Delete a doctor by ID 
    Server responds with status code 204 if the doctor is successfully deleted.

    **Request:**
    \`\`\`bash
    curl -X 'DELETE' 'api/v1/doctors/1'
    \`\`\`

    **Response body:**
    \`\`\`
    No Content
    \`\`\`

### 4. Endpoint `api/v1/appointments`
- **POST `api/v1/appointments`** - Create an appointment  
  Server responds with status code 201 and the created appointment record.
  
  **Request:**
  \`\`\`bash
  curl -X 'POST' \
  'api/v1/appointments' \
  -H 'Content-Type: application/json' \
  -d '{
    "patientId": 1,
    "doctorId": 2,
    "date": "2024-07-10T10:00:00Z"
  }'
  \`\`\`

  **Response body:**
  \`\`\`json
  {
    "id": 1,
    "patientId": 1,
    "doctorId": 2,
    "date": "2024-07-10T10:00:00Z"
  }
  \`\`\`

- **GET `api/v1/appointments`** - Get all appointments  
  Server responds with status code 200 and all appointment records.

  **Request:**
  \`\`\`bash
  curl -X 'GET' 'api/v1/appointments'
  \`\`\`

  **Response body:**
  \`\`\`json
  [
    {
      "id": 1,
      "patientId": 1,
      "doctorId": 2,
      "date": "2024-07-10T10:00:00Z"
    },
    {
      "id": 2,
      "patientId": 2,
      "doctorId": 1,
      "date": "2024-07-11T11:00:00Z"
    }
  ]
  \`\`\`

- **GET `api/v1/appointments/{appointmentId}`** - Get an appointment by ID  
    Server responds with status code 200 and the appointment record if it exists.
    
    **Request:**
    \`\`\`bash
    curl -X 'GET' 'api/v1/appointments/1'
    \`\`\`

    **Response body:**
    \`\`\`json
    {
        "id": 1,
        "patientId": 1,
        "doctorId": 2,
        "date": "2024-07-10T10:00:00Z"
    }
    \`\`\`

- **PUT  `api/v1/appointments/{appointmentId}`** - Update an appointment by ID  
    Server responds with status code 200 and the updated appointment record.
    
    **Request:**
    \`\`\`bash
    curl -X 'PUT' \
    'api/v1/appointments/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "patientId": 1,
    "doctorId": 2,
    "date": "2024-07-10T10:00:00Z"
    }'
    \`\`\`

    **Response body:**
    \`\`\`json
    {
    "id": 1,
    "patientId": 1,
    "doctorId": 2,
    "date": "2024-07-10T10:00:00Z"
    }
    \`\`\`

- **DELETE  `api/v1/appointments/{appointmentId}`** - Delete an appointment by ID  
    Server responds with status code 204 if the appointment is successfully deleted.
    
    **Request:**
    \`\`\`bash
    curl -X 'DELETE' 'api/v1/appointments/1'
    \`\`\`

    **Response body:**
    \`\`\`
    No Content
    \`\`\`

## Install
\`\`\`bash
git clone <repository-url>
cd hospital-appointment-scheduler
npm install
\`\`\`

## Run
```bash
docker-compose up
npm start
```
