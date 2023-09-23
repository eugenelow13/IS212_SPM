from flask import Blueprint
from flask import jsonify
from src.models import Staff

staff = Blueprint("staff", __name__, url_prefix="/staff")

@staff.route("/", methods=["GET"])
def see_staffs():
    stafflist = Staff.query.all()
    if(len(stafflist)):
        return jsonify(
            {
                "code":200,
                "data":{
                    "staff": [staff.json() for staff in stafflist]
                }
            }
        )
    return jsonify(
        {
            "code":404,
            "message":"There are no staffs."
        }
    ),404

@staff.route("/<int:staff_id>", methods=["GET"])
def see_staff():
    pass

@staff.route("/", methods=["POST"])
def create_staff():
    pass

