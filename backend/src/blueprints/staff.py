from flask import Blueprint

staff = Blueprint("staff", __name__, url_prefix="/staff")

@staff.route("/", methods=["GET"])
def see_staffs():
    pass
    return "see staffs"

@staff.route("/<int:staff_id>", methods=["GET"])
def see_staff():
    pass

@staff.route("/", methods=["POST"])
def create_staff():
    pass

