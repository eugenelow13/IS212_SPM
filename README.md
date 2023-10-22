# IS212_SPM
Frontend: Bootstrap, Javascript, React
Backend: Python (Flask)
Database: MySQL (Requires WAMP to be running)

## Testing (locally using venv, backend only for now)

### Set up python virtual environment (if not done so yet)
python -m venv env

### Activate your virtual environment based on your local environment (Have to activate to be in the virtual environment) (For consistency purposes when testing and for the CI/CD pipeline)
source env/bin/activate     # Linux/macOS
env\Scripts\activate.bat    # In CMD
env\Scripts\Activate.ps1    # In Powershell

### Install python dependencies (if not done so yet)
<!-- 
    Make sure that any newly installed dependencies are added to the requirements.txt!!!
    pip freeze >> requirements.txt
 -->
pip install -r requirements.txt

<!--
    ### Navigate to the front-end folder and start the React application
    cd sbrp_client
    npm i
    npm run dev
    cd ..
-->

### Create a .env file (if not yet created) and add the following environment variables
SQLALCHEMY_DATABASE_URI=mysql://root@localhost:3306/spm_db  # for default MySQL settings on Windows

### Start Wampserver (Required for MySQL Database)
Ensure that Wampserver is installed and running.
Configure MySQL settings within Wampserver if necessary.

### Navigate to the back-end folder and start the Flask application
cd backend
python run.py

Open a new shell (as the previous one should have been locked with python run.py)

### Run unit tests (unit_tests.py)
cd backend
python unit_tests.py

### Run integration tests (integration_tests.py)
python integration_tests.py

### To deactivate the environment
deactivate                              # Linux/macOS
\path\to\venv\Scripts\deactivate.bat    # In CMD
\path\to\venv\Scripts\Deactivate.ps1    # In Powershell

### Remove env (if needed)
Simply delete the env folder