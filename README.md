# Hospital Appointment Scheduler

## Project Description

This project is a hospital appointment scheduling system. Patients can enter their symptoms or required specialization (e.g., cardiology, surgery), and the system will find the nearest available appointment date with a doctor of the specified specialization. The system considers doctor availability, patient load, and appointment duration.

## Technical Requirements

-   Programming language: JavaScript (Node.js)
-   Database: PostgreSQL
-   Docker for containerization

## Base URL

http://localhost:3000

## API Documentation

### ERD

![Project Entity–relationship model](https://github.com/AgustinTafura/solvd-project/blob/main/hospital-appointment-scheduler.jpg)

### 1. Endpoint `api/v1/register`

**Endpoint:** `api/v1/register`  
**Standard:** JWT

**Request:**

```bash
curl -X 'POST' \
'/login' \
-H 'Content-Type: application/json' \
-d '{
    "email": "john@example.com",
    "name": "John Doe",
    "password": "password"
}'
```

**Response body:**

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "john@example.com",
	"password": "password"
}
```

### 2. Endpoint `api/v1/login`

**Endpoint:** `api/v1/login`  
**Standard:** JWT

**Request:**

```bash
curl -X 'POST' \
'/login' \
-H 'Content-Type: application/json' \
-d '{
    "email": "email",
    "password": "password"
}'
```

**Response body:**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoiMTY3OTMzMTQ1MDI0aCJ9.4d2cdf71-78e57a475bed0bd4414526df-196a8ed6"
}
```

### 3. Endpoint `api/v1/patients`

-   **GET `api/v1/patients`** - Get all patients  
    Server responds with status code 200 and all patient records.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/patients'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
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
    ```

-   **GET `api/v1/patients/{patient_id}`** - Get a patient by ID  
    Server responds with status code 200 and the patient record if it exists.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/patients/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "John Doe",
    	"email": "john@example.com",
    	"phone": "123-456-7890"
    }
    ```

-   **POST `api/v1/patients/{patient_id}`** - Create a new patient
    Server responds with status code 201 and the created patient record.

    **Request:**

    ```bash
    curl -X 'POST' \
     -H 'Authorization: Bearer <your-token>'
    'api/v1/patients' \
     -H 'Content-Type: application/json' \
     -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }'

    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "John Doe",
    	"email": "john@example.com",
    	"phone": "123-456-7890"
    }
    ```

-   **PUT `api/v1/patients/{patient_id}`** - Update a patient by ID  
     Server responds with status code 200 and the updated patient record.

    **Request:**

    ```bash
    curl -X 'PUT' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/patients/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "John Doe",
    	"email": "john@example.com",
    	"phone": "123-456-7890"
    }
    ```

-   **DELETE `api/v1/patients/{patient_id}`** - Delete a patient by ID  
     Server responds with status code 204 if the patient is successfully deleted.

    **Request:**

    ```bash
    curl -X 'DELETE' 'api/v1/patients/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```
    No Content
    ```

### 4. Endpoint `api/v1/doctors`

-   **GET `api/v1/doctors`** - Get all doctors  
    Server responds with status code 200 and all doctor records.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/doctors'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"name": "Dr. Smith",
    		"specialization_id": "15"
    	},
    	{
    		"id": 2,
    		"name": "Dr. Brown",
    		"specialization_id": "18"
    	}
    ]
    ```

-   **GET `api/v1/doctors/{doctor_id}`** - Get a doctor by ID  
    Server responds with status code 200 and the doctor record if it exists.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/doctors/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Dr. Smith",
    	"specialization_id": "15"
    }
    ```

-   **POST `api/v1/doctors/{doctor_id}`** - Create a new doctor  
     Server responds with status code 201 and the created doctor record.

    **Request:**

    ```bash
    curl -X 'POST' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/doctors' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "Dr. Smith",
    "specialization_id": "15"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Dr. Smith",
    	"specialization_id": "15"
    }
    ```

-   **PUT `api/v1/doctors/{doctor_id}`** - Update a doctor by ID
    Server responds with status code 200 and the updated doctor record.

    **Request:**

    ```bash
    curl -X 'PUT' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/doctors/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "Dr. Smith",
    "specialization_id": "20"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Dr. Smith",
    	"specialization_id": "20"
    }
    ```

-   **DELETE `api/v1/doctors/{doctor_id}`** - Delete a doctor by ID
    Server responds with status code 204 if the doctor is successfully deleted.

    **Request:**

    ```bash
    curl -X 'DELETE' 'api/v1/doctors/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```
    No Content
    ```

### 5. Endpoint `api/v1/appointments`

-   **POST `api/v1/appointments`** - Create an appointment  
    Server responds with status code 201 and the created appointment record.

    **Request:**

    ```bash
    curl -X 'POST' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/appointments' \
    -H 'Content-Type: application/json' \
    -d '{
        "patient_id": 1,
        "doctor_id": 2,
        "start_date": "2024-07-10T10:00:00Z",
        "end_date": "2024-07-10T10:20:00Z"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"patient_id": 1,
    	"doctor_id": 2,
    	"start_date": "2024-07-10T10:00:00Z",
    	"end_date": "2024-07-10T10:20:00Z"
    }
    ```

-   **GET `api/v1/appointments`** - Get all appointments  
    Server responds with status code 200 and all appointment records.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/appointments'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"patient_id": 1,
    		"doctor_id": 2,
    		"start_date": "2024-07-10T10:00:00Z",
    		"end_date": "2024-07-10T10:20:00Z"
    	},
    	{
    		"id": 2,
    		"patient_id": 2,
    		"doctor_id": 1,
    		"start_date": "2024-07-11T11:00:00Z",
    		"end_date": "2024-07-11T11:20:00Z"
    	}
    ]
    ```

-   **GET `api/v1/appointments/{appointment_id}`** - Get an appointment by ID  
     Server responds with status code 200 and the appointment record if it exists.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/appointments/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"patient_id": 1,
    	"doctor_id": 2,
    	"start_date": "2024-07-10T10:00:00Z",
    	"end_date": "2024-07-10T10:20:00Z"
    }
    ```

-   **PUT `api/v1/appointments/{appointment_id}`** - Update an appointment by ID  
     Server responds with status code 200 and the updated appointment record.

    **Request:**

    ```bash
    curl -X 'PUT' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/appointments/1' \
    -H 'Content-Type: application/json' \
    -d '{
    "patient_id": 1,
    "doctor_id": 2,
    "start_date": "2024-07-10T10:00:00Z",
    "end_date": "2024-07-10T10:20:00Z"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"patient_id": 1,
    	"doctor_id": 2,
    	"start_date": "2024-07-10T10:00:00Z",
    	"end_date": "2024-07-10T10:20:00Z"
    }
    ```

-   **DELETE `api/v1/appointments/{appointment_id}`** - Delete an appointment by ID  
     Server responds with status code 204 if the appointment is successfully deleted.

    **Request:**

    ```bash
    curl -X 'DELETE' 'api/v1/appointments/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```
    No Content
    ```

### 6. Endpoint `api/v1/specializations`

-   **POST `api/v1/specializations`** - Create a specialization
    Server responds with status code 201 and the created specialization record.

    **Request:**

    ```bash
        curl -X 'POST' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/specializations' \
        -H 'Content-Type: application/json' \
        -d '{
        "name": "Cardiology"
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Cardiology"
    }
    ```

-   **GET `api/v1/specializations`** - Get all specializations
    Server responds with status code 200 and all specialization records.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/specializations'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"name": "Cardiology"
    	},
    	{
    		"id": 2,
    		"name": "Neurology"
    	}
    ]
    ```

-   **GET `api/v1/specializations/{specialization_id}`** - Get a specialization by ID
    Server responds with status code 200 and the specialization record if it exists.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/specializations/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Cardiology"
    }
    ```

-   **PUT `api/v1/specializations/{specialization_id}`** - Update a specialization by ID
    Server responds with status code 200 and the updated specialization record.

    **Request:**

    ```bash
        curl -X 'PUT' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/specializations/1' \
        -H 'Content-Type: application/json' \
        -d '{
        "name": "Cardiothoracic Surgery"
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Cardiothoracic Surgery"
    }
    ```

-   **DELETE `api/v1/specializations/{specialization_id}`** - Delete a specialization by ID
    Server responds with status code 204 if the specialization is successfully deleted.

    **Request:**

    ```bash
        curl -X 'DELETE' 'api/v1/specializations/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    No Content
    ```

### 7. Endpoint `api/v1/symptoms`

-   **POST `api/v1/symptoms`** - Create a symptom
    Server responds with status code 201 and the created symptom record.

    **Request:**

    ```bash
        curl -X 'POST' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/symptoms' \
        -H 'Content-Type: application/json' \
        -d '{
        "name": "Chest Pain"
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Chest Pain"
    }
    ```

-   **GET `api/v1/symptoms`** - Get all symptoms
    Server responds with status code 200 and all symptom records.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/symptoms'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"name": "Chest Pain"
    	},
    	{
    		"id": 2,
    		"name": "Headache"
    	}
    ]
    ```

-   **GET `api/v1/symptoms/{symptom_id}`** - Get a symptom by ID
    Server responds with status code 200 and the symptom record if it exists.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/symptoms/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Chest Pain"
    }
    ```

-   **PUT `api/v1/symptoms/{symptom_id}`** - Update a symptom by ID
    Server responds with status code 200 and the updated symptom record.

    **Request:**

    ```bash
        curl -X 'PUT' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/symptoms/1' \
        -H 'Content-Type: application/json' \
        -d '{
        "name": "Severe Chest Pain"
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"name": "Severe Chest Pain"
    }
    ```

-   **DELETE `api/v1/symptoms/{symptom_id}`** - Delete a symptom by ID
    Server responds with status code 204 if the symptom is successfully deleted.

    **Request:**

    ```bash
        curl -X 'DELETE' 'api/v1/symptoms/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    No Content
    ```

### 8. Endpoint `api/v1/specialization_symptoms`

-   **POST `api/v1/specialization_symptoms`** - Create a specialization_symptom associations
    Server responds with status code 201 and the created specialization_symptom record.

    **Request:**

    ```bash
        curl -X 'POST' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/specialization_symptoms' \
        -H 'Content-Type: application/json' \
        -d '{
        "specialization_id": 1,
        "symptom_id": 1
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"specialization_id": 1,
    	"symptom_id": 1
    }
    ```

-   **GET `api/v1/specialization_symptoms`** - Get all specialization_symptoms associations
    Server responds with status code 200 and all specialization_symptom records.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/specialization_symptoms'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"specialization_id": 1,
    		"symptom_id": 1
    	},
    	{
    		"id": 2,
    		"specialization_id": 1,
    		"symptom_id": 2
    	}
    ]
    ```

-   **GET `api/v1/specialization_symptoms/{specialization_symptom_id}`** - Get a specialization_symptom associations association by ID
    Server responds with status code 200 and the specialization_symptom record if it exists.

    **Request:**

    ```bash
        curl -X 'GET' 'api/v1/specialization_symptoms/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"specialization_id": 1,
    	"symptom_id": 1
    }
    ```

-   **PUT `api/v1/specialization_symptoms/{specialization_symptom_id}`** - Update a specialization_symptom association by ID
    Server responds with status code 200 and the updated specialization_symptom record.

    **Request:**

    ```bash
        curl -X 'PUT' \
        -H 'Authorization: Bearer <your-token>'
        'api/v1/specialization_symptoms/1' \
        -H 'Content-Type: application/json' \
        -d '{
            "specialization_id": 2,
            "symptom_id": 1
        }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"specialization_id": 2,
    	"symptom_id": 1
    }
    ```

-   **DELETE `api/v1/specialization_symptoms/{specialization_symptom_id}`** - Delete a specialization_symptom association by ID
    Server responds with status code 204 if the specialization_symptom association is successfully deleted.

    **Request:**

    ```bash
        curl -X 'DELETE' 'api/v1/specialization_symptoms/1'
        -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    No Content
    ```

### 9. Endpoint `api/v1/availability`

-   **POST `api/v1/availability`** - Create an availability record
    Server responds with status code 201 and the created availability record.

    **Request:**

    ```bash
    curl -X 'POST' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/availability' \
    -H 'Content-Type: application/json' \
    -d '{
      "doctor_id": 1,
      "day_of_week": 1,
      "start_time": "09:00:00",
      "end_time": "17:00:00"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"doctor_id": 1,
    	"day_of_week": 1,
    	"start_time": "09:00:00",
    	"end_time": "17:00:00"
    }
    ```

-   **GET `api/v1/availability`** - Get all availability records
    Server responds with status code 200 and all availability records.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/availability'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    [
    	{
    		"id": 1,
    		"doctor_id": 1,
    		"day_of_week": 1,
    		"start_time": "09:00:00",
    		"end_time": "17:00:00"
    	},
    	{
    		"id": 2,
    		"doctor_id": 2,
    		"day_of_week": 3,
    		"start_time": "10:00:00",
    		"end_time": "18:00:00"
    	}
    ]
    ```

-   **GET `api/v1/availability/{availability_id}`** - Get an availability record by ID  
     Server responds with status code 200 and the availability record if it exists.

    **Request:**

    ```bash
    curl -X 'GET' 'api/v1/availability/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"doctor_id": 1,
    	"day_of_week": 1,
    	"start_time": "09:00:00",
    	"end_time": "17:00:00"
    }
    ```

-   **PUT `api/v1/availability/{availability_id}`** - Update an availability by ID  
     Server responds with status code 200 and the updated availability record.

    **Request:**

    ```bash
    curl -X 'PUT' \
    -H 'Authorization: Bearer <your-token>'
    'api/v1/availability/1' \
    -H 'Content-Type: application/json' \
    -d '{
        "doctor_id": 1,
        "day_of_week": 2,
        "start_time": "08:00:00",
        "end_time": "16:00:00"
    }'
    ```

    **Response body:**

    ```json
    {
    	"id": 1,
    	"doctor_id": 1,
    	"day_of_week": 2,
    	"start_time": "08:00:00",
    	"end_time": "16:00:00"
    }
    ```

-   **DELETE `api/v1/availability/{availability_id}`** - Delete an availability record by ID  
     Server responds with status code 204 if the availability is successfully deleted.

    **Request:**

    ```bash
    curl -X 'DELETE' 'api/v1/availability/1'
    -H 'Authorization: Bearer <your-token>'
    ```

    **Response body:**

    ```
    No Content
    ```

## Install

```bash
git clone <repository-url>
cd hospital-appointment-scheduler
npm install
```

## Run

```bash
docker-compose up
npm start
```
