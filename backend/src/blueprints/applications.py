from flask import Blueprint
from src.models import Application

applications = Blueprint("applications", __name__, url_prefix="/applications")

@applications.route("/", methods=["GET"])
def see_applications():
    pass
    print(Application.query.all())
    return "see applications"

@applications.route("/<int:application_id>", methods=["GET"])
def see_application():
    pass

@applications.route("/", methods=["POST"])
def create_application():
    pass

