from flask import Blueprint, jsonify, request
from src.models import Staff

ROLE_MAPPING = {
    "admin": "1",
    "user": "2",
    "manager": "3",
    "hr": "4"
}

staff = Blueprint("staffs", __name__, url_prefix="/staffs")


@staff.route("/", methods=["GET"])
def get_all():
    if role := request.args.get("role", type=str):
        return get_staff_by_role(role)

    staff_list = Staff.query.all()
    if (len(staff_list)):
        return jsonify({"staffs": [staff.json() for staff in staff_list]})
    return jsonify({"message": "No staff found."}), 404


# get all staff by role
def get_staff_by_role(role_group):
    role = ROLE_MAPPING[role_group]
    staff_list = Staff.query.filter_by(role=role).all()
    if len(staff_list):
        return jsonify({"staffs": [staff.json() for staff in staff_list]})
    return jsonify({"message": "No staff found with role {}.".format(role_group)}), 404


@staff.route("/<int:staff_id>", methods=["GET"])
def get_staff_by_id(staff_id):
    staff = Staff.query.get(staff_id)
    if staff:
        return staff.json(), 200
    return {"message": f"No staff found with id {staff_id}"}, 404


@staff.route("/<int:staff_id>/applications", methods=["GET"])
def get_staff_applications(staff_id):
    staff = Staff.query.get(staff_id)
    if staff:
        staff_applications = staff.applications
        if staff_applications:
            return {"applications": [application.json() for application in staff_applications]}, 200
    return {"message": "No applications found"}, 404
