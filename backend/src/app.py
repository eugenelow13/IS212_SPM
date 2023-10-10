from flask import Flask, Blueprint
from src.extensions import db
import os
from src.blueprints.listings import listings
from src.blueprints.applications import applications
from src.blueprints.staff import staff
from src.blueprints.roles import roles



app = Flask(__name__)



# mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("SQLALCHEMY_DATABASE_URI")

# Register applications, listings, and staff blueprints under api (nest all)
api = Blueprint("api", __name__, url_prefix="/api")

api.register_blueprint(applications)
api.register_blueprint(listings)
api.register_blueprint(staff)
api.register_blueprint(roles)

# Register api blueprint in app
app.register_blueprint(api)

# Init App
db.init_app(app)
