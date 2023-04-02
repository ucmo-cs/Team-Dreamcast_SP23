# Dreamcast Senior Project
## 1. Introduction 
#### 1.1 Purpose
- Risen One Consulting - Employee Development Portal 
#### 1.2 Scope 
- This solution will allow employees and managment to set goals, go over performance evaluations, and set development plans that will assist in employee to supervisor management as well as motivate and encorage employees. This is being developed as a portion of the already existing Risen One employee portal and should make the review process much easier.

#### 1.3 Definitions, acronyms, and abbreviations 
- `Development Plan` - a document filled out by an employee that outlines their specific short and long term goals. Allows employees to outline any development needs they have or raise concerns.
- `Self Assessments` - a document filled out by an employee that they can outline their sucessful moments, strengths, and weaknesses throughout a given review cycle.
- `Manager Assessments` - a document filled out by an manager that they can outline an employee's sucessful moments, strengths, and weaknesses throughout a given review cycle. Managers can use this form to submit to also give feedback to their employees.
### 2. Specific requirements
- The system will be developed with the implementation of NodeJS, serverless framework including AWS Lambda and DynamoDB for the backend API, and use the Angular and JavaScript programming languages to implement the employee facing GUI. 
#### 2.1 External Interface Requirement
- The application should communicate between the front end and backend by sending JSON objects outlining the properties to stored/manipulated in the backend or displayed on the front end. When a request is made to the backend for a specific employee or development plan, the system will reqguest it from the correspoinding table, return the findings and output them for the user.

#### 2.2 Functional Requirement
- The system shall...
    - Allow employee's the opportunity to create, update, delete, and view `development plans` outlining their goals and asipirations.
    - Allow employee's the opportunity to create, update, delete, and view `self assessments` that allow them to log thoughts about their current work.
    - Allow employee's the opportunity to view `performance evaluations` submitted by managers regarding work done throughout a review cycle.
    - Allow managers to submit `performance evaluations` outlining imporvement points and praise for employee work.
    - Allow employees to move freely between three tabs displaying the above plans/evaluations.
    - Allow managers and employees to request previous iterations of the outlined plans/evaluations.
    - Only allow managers to create and edit `perfromance evaluations` and only allow them to create evaluations for employees that server under them.

## Local Dev Set Up

## Documentation
```mermaid
erDiagram
    EMPLOYEE ||--o{ SELFASSESMENT : has_many
    EMPLOYEE ||--o{ MANAGERASSESMENT : has_many
    EMPLOYEE ||--o{ DEVELOPMENTPLAN : has_many
    EMPLOYEE {
        int P-id
        string firstName
        string lastName
        string position
        bool isManager
        int[] managedEmployees
        selfAssesment[] selfassesments
        developmentplan[] developmentplans
        managerassesments[] reviews
    }

    SELFASSESMENT {
        int P-id
        int F-employeeID
        string[] accomplishments
        string takeyways
        string allthefields
    }

    DEVELOPMENTPLAN {
        int P-id
        int F-employeeID
        string allthefields
    }

    MANAGERASSESMENT {
        int P-it
        int F-mangerID
        int F-employeeID
        string allthefields
    }
```



### Sequence
```mermaid
    sequenceDiagram
        actor me
        actor you
        me->>you: "This is mermaid!"
        you-->me: "Wow so cool"
```