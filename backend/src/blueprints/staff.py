from flask import Blueprint
from flask import jsonify
from src.models import Staff

staff = Blueprint("staff", __name__, url_prefix="/staff")

@staff.route("/", methods=["GET"])
def get_all():
    staff_list = Staff.query.all()
    if(len(staff_list)):
        return jsonify({"staff": [staff.json() for staff in staff_list]})
    return jsonify({"message": "No staff found."}), 404

@staff.route("/<int:staff_id>", methods=["GET"])
def get_staff():
    pass

@staff.route("/", methods=["POST"])
def create_staff():
    pass