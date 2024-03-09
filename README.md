# Job Portal Application

This is a Next.js web application for a job portal, designed to facilitate job posting, job search, and application management for both employers and job seekers.


## Deployment

The application is deployed and can be accessed [here](https://job-portal-beryl-theta.vercel.app/).

## Test Accounts

### Employee Login:
- **Email:** employee@gmail.com
- **Password:** Password123

### Employer Login:
- **Email:** employer@gmail.com
- **Password:** Password123

## Features

### Authentication

- User authentication with login, logout, and signup functionalities.
- Access control for employer and employee-specific features.

### Employer Features

- **Dashboard**: Provides an overview of statistics and recent activities.
- **Request Management**: Allows employers to view and manage job requests from applicants.
- **Job Posting**: Enables employers to post new job listings.

### Employee Features

- **Dashboard**: Displays personalized information and lists applied jobs.
- **Job Search and Viewing**: Allows users to search for jobs and view job details.
- **Application Management**: Enables users to view their applied jobs and manage applications.

### Backend API

- RESTful API endpoints for various functionalities.
- Routes for handling jobs, requests, resumes, and user-related actions.

### Reusable UI Components

- Includes a collection of reusable UI components for forms, job listings, job details, user profiles, etc.
- Enhances modularity and maintainability of the codebase.

## Folder Structure

./app
├── api
├── components
├── employer
├── helper
├── lib
├── login
├── profile
├── register
└── user

./components
├── AddJob.tsx
├── ApplyFilter.tsx
├── ApplyJob.tsx
├── DeleteJob.tsx
├── EditJob.tsx
├── JobListing.tsx
├── Jobrequests.tsx
├── Jobs.tsx
├── Me.tsx
├── MyAppliedLists.tsx
├── Navigation.tsx
└── ViewJob.tsx

./dbConfig
└── dbConfig.ts

./lib
└── utils.ts

./models
├── jobModel.js
├── requestModel.js
├── resumeModel.js
└── userModel.js


## Contributors

- **Vatsal Patel**
  - API Development:
    - Implemented APIs for managing jobs, authentication, and navigation on the client-side.
    - Created database schemas and handled database setup.
  - Project Setup:
    - Set up the initial project structure and configurations.

- **Drashti Adhyaru**
  - API Development:
    - Implemented APIs for managing resumes and requests.
    - Worked on the README file to provide project details and documentation.
  - Deployment:
    - Deployed the project to the production environment.

- **George David**
  - UI Design:
    - Designed the user interface for the application.
    - Created UI components for functionalities such as Add Job, Apply Job, View Job, and Resume.
  - API Integration:
    - Integrated UI components with backend APIs to enable functionality.

- **Lidia Abey**
  - Feature Development:
    - Implemented filter and search functionality.
    - Fixed bugs and handled other miscellaneous issues in the application.

# Job Portal API Documentation
## Users

### Signup
- **Endpoint:** `http://localhost:3000/api/users/signup`
- **Body:** 
    ```json
    {
        "firstName": "Ved",
        "lastName": "Adhyaru",
        "phone": 9909909999,
        "role": "employer",
        "email": "vat@gmail.com",
        "password": "Vatsal@12345"
    }
    ```

### SignIn
- **Endpoint:** `http://localhost:3000/api/users/login`
- **Body:** 
    ```json
    {
        "email": "vat@gmail.com",
        "password": "Vatsal@12345"
    }
    ```

### Logout
- **Endpoint:** `http://localhost:3000/api/users/logout`

### Me
- **Endpoint:** `http://localhost:3000/api/users/me`

### Get All Employees
- **Endpoint:** `http://localhost:3000/api/users/employees`

## Jobs

### Add Job
- **Endpoint:** `http://localhost:3000/api/jobs`
- **Body:** 
    ```json
    {
        "title": "System Developer",
        "companyName": "AHDH Corp",
        "description": "desc3",
        "type": "Contract",
        "pay": "20000$/3-months",
        "category": "IT",
        "address": "GTA"
    }
    ```

### Jobs (All)
- **Endpoint:** `http://localhost:3000/api/jobs`

### Jobs by Status
- **Endpoint:** `http://localhost:3000/api/jobs/status?status=applied`

### Delete Job
- **Endpoint:** `http://localhost:3000/api/jobs?jobId=65d12a58c113812c64aabfc8`

### Update Job
- **Endpoint:** `http://localhost:3000/api/jobs?jobId=65d123bd25c7bdfafc40e53f`
- **Body:** 
    ```json
    {
        "title": "Software Developer",
        "companyName": "AVF Corp",
        "description": "desc3",
        "type": "Contract",
        "pay": "20000$/3-months",
        "category": "IT",
        "address": "GTA"
    }
    ```

### Filter Job
- **Endpoint:** `http://localhost:3000/api/jobs/filter?category=IT&tyoe=parttime`

## Resume

### Get Resumes by UserID
- **Endpoint:** `http://localhost:3000/api/resumes`

### Create a Resume
- **Endpoint:** `http://localhost:3000/api/resumes`
- **Body:** 
    ```json
    {
        "firstName": "Vatsal",
        "lastName": "Patel",
        "age": "23",
        "experience": "4 years",
        "aboutYou": "great person",
        "highestQualification": "B.tech's",
        "availibility": "Full Time",
        "address": "60 stevenson",
        "status": "Unemployed"
    }
    ```

### Delete Resume by ResumeID
- **Endpoint:** `http://localhost:3000/api/resumes?resumeId=65d12ac3c113812c64aabfcc`

### Update Resume by ResumeID
- **Endpoint:** `http://localhost:3000/api/resumes?resumeId=65d130a3c113812c64aabfd2`
- **Body:** 
    ```json
    {
        "firstName": "Mehul",
        "lastName": "Patel",
        "age": "23",
        "experience": "5 years",
        "aboutYou": "great person",
        "highestQualification": "B.tech's",
        "availibility": "Full Time",
        "address": "60 stevenson",
        "status": "Unemployed"
    }
    ```

## Requests

### Get Requests
- **Endpoint:** `http://localhost:3000/api/requests`

### Create a Request
- **Endpoint:** `http://localhost:3000/api/requests`
- **Body:** 
    ```json
    {
        "jobId": "65d0e5b1048e1188d1eed8b3",
        "resumeId": "65d0e7c8048e1188d1eed8b6",
        "status": "accepted",
        "employerStatus": "viewed",
        "dateApplied": "17/02/2024"
    }










## Database Configuration

- Configuration files for database connections.
- Utilizes MongoDB for data storage.

## Installation

To run the application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.

## Contributors

- [Your Name](https://github.com/your-username)

## License

This project is licensed under the [MIT License](LICENSE).
