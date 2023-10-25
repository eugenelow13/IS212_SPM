from flask import Flask, Blueprint
import os
from dotenv import load_dotenv

from src.blueprints.listings import listings
from src.blueprints.applications import applications
from src.blueprints.staff import staff
from src.blueprints.roles import roles

from flask_cors import CORS

# Load environment variables from .env file


def create_app():
    load_dotenv()

    # Create Flask app
    app = Flask(__name__)

    # This CORS(app) will allow all origins, methods, and headers
    CORS(app)

    # mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>, this will get the URI from the .env
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")

    # Register applications, listings, and staff blueprints under api (nest all)
    api = Blueprint("api", __name__, url_prefix="/api")

    # Path prefixed by /listings/<listing_id>/applications
    api.register_blueprint(applications)

    api.register_blueprint(listings)
    api.register_blueprint(staff)
    api.register_blueprint(roles)

    # Register api blueprint in app
    app.register_blueprint(api)

    return app
