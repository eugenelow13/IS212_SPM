# IS212_SPM

[Github Repo](https://github.com/eugenelow13/IS212_SPM)

Frontend: Bootstrap, Javascript, React  
Backend: Python (Flask)  
Database: MySQL (Requires WAMP to be running)<br>
<br>

## Python virtual environment

<h4> Set up python virtual environment (if not done so yet) </h4>  

- <code> python -m venv env </code> 

<h4> Activate your virtual environment based on your local environment (Have to activate to be in the virtual environment) (For consistency purposes when testing and for the CI/CD pipeline) </h4>

- <code> source env/bin/activate     # Linux/macOS </code>

- <code> env\Scripts\activate.bat    # In CMD </code>

- <code> env\Scripts\Activate.ps1    # In Powershell </code>

<h4> Install python dependencies (if not done so yet) </h4>

Make sure that any newly installed dependencies are added to the requirements.txt with pip freeze >> requirements.txt
 
- <code> pip install -r requirements.txt </code>

<h4> Create a .env file (if not yet created) and add the following environment variables </h4>

- <code> SQLALCHEMY_DATABASE_URI=mysql://root@localhost:3306/spm_db  # for default MySQL settings on Windows </code>

<h4> Start Wampserver (Required for MySQL Database) </h4>

- Ensure that Wampserver is installed and running.

- Configure MySQL settings within Wampserver if necessary.

- If first time opening the app, run the `spm_db.sql` file in MySQL Workbench to set up the database

<h4> Navigate to the back-end folder and start the Flask application </h4>

- <code> cd backend </code>

- <code> python run.py </code>

<h4> In another terminal, navigate to the front-end folder and start the React application </h4>

```
cd sbrp_client
npm i
npm run dev
```

## Linting (using flake8, doesn't need python app to be running)

- <code> Open a new shell (as the previous one should have been locked with python run.py) </code>

- <code> python -m flake8 backend/ </code>  

## Formatting (using yapf, doesn't need python app to be running)

- <code> python -m yapf --recursive --diff --parallel backend </code>


## Testing

<h4> Run unit tests (unit_tests.py) </h4>

- <code> cd backend </code>

- <code> python unit_tests.py </code>

<h4> Run integration tests (integration_tests.py) </h4>

- <code> python integration_tests.py </code>

<h4> To deactivate the environment </h4>

- <code> deactivate    # Or use the deactivate scripts in env/Scripts/ </code>

- <code> env\Scripts\deactivate.bat    # In CMD </code>

<!-- - <code> \path\to\venv\Scripts\Deactivate.ps1    # In Powershell </code> -->

<h4> Remove env (if needed) </h4>

- <code> Simply delete the env folder </code>

### E2E Testing with Cypress

- With `npm run dev` running the frontend on `localhost:5173` and with `backend/run.py` running the flask app on `localhost:5000`
- In a new separate terminal:
  - `cd sbrp_client`
  - `npx cypress run`

## How to Use
- At the login page, select the user role (You can type to filter out). Sample users are provided at the top.

### HR
- As a HR, navigate to **Create Listing** to create a new role listing.
- Go to **Listings** to see posted role listings. Click to see details and edit
- All tables are interactive, with text filtering and sorting for every column (click to toggle)
- Click on view applicants to see incoming applications. Click on an application to view applicant details, role-skill match, and self-description

### Staff
- As a staff, browse role listings using the interactive table, where you can sort by fields like role-skill match
- Click on a role listing to apply and fill up an optional self-description

### Manager
- In this release, manager shares the same fucntionality as a staff.
