from flask import Blueprint, jsonify
from src.models import Staff

staff = Blueprint("staffs", __name__, url_prefix="/staffs")

@staff.route("/", methods=["GET"])
def get_all():
    staff_list = Staff.query.all()
    if(len(staff_list)):
        return jsonify({"staff": [staff.json() for staff in staff_list]})
    return jsonify({"message": "No staff found."}), 404

#get all staff by role
@staff.route("/<int:role>", methods=["GET"])
def get_staff_by_role(role):
    staff_list = Staff.query.filter_by(role=role).all()
    if len(staff_list):
        return jsonify({"staff": [{"Staff_ID": staff.staff_id, "Full_Name": staff.staff_fname + " " + staff.staff_lname} for staff in staff_list]})
    return jsonify({"message": "No staff found with role {}.".format(role)}), 404


@staff.route("/<int:staff_id>/applications", methods=["GET"])
def get_staff_applications(staff_id):
    staff = Staff.query.get(staff_id)
    if staff:
        staff_applications = staff.applications
        if staff_applications:
            return {"applications": [application.json() for application in staff_applications]}, 200
    return {"message": "No applications found"}, 404
    


@staff.route("/", methods=["POST"])
def create_staff():
    pass