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
    ```

