from flask import Blueprint, request, jsonify
from src.models import Application, RoleListing
from src.extensions import db
from sqlalchemy.exc import IntegrityError
import datetime 

applications = Blueprint("applications", __name__, url_prefix="/<int:listing_id>/applications")

@applications.route("/", methods=["GET"])
def see_applications(listing_id):
    pass

    print(Application.query.all())
    return "see applications"

@applications.route("/<int:staff_id>", methods=["GET"])
def see_application(staff_id):
    pass

@applications.route("/", methods=["POST"])
def create_application(listing_id):

    body = request.get_json()
    app_desc = body["app_desc"]
    staff_id = body["staff_id"]

    # return {"content": str(RoleListing.query.all())}, 200

    role_listing = RoleListing.query.get(int(listing_id))

    if not role_listing:
        return {"message": "Invalid role listing"}, 404

    app_date = datetime.date.today()
    start_date = role_listing.start_date
    end_date = role_listing.end_date

    if app_date < start_date:
        return {"message": "Role listing has not opened yet"}, 401
    
    if app_date > end_date:
        return {"message": "Role listing has expired"}, 401

    if int(staff_id) == int(role_listing.manager_id):
        return {"message": "Cannot apply for self-posted role"}, 401
    
    try:
        application = Application(listing_id, staff_id, app_desc, app_date)
        db.session.add(application)
        db.session.commit()

    except IntegrityError:
        return {"message": "You have already applied for the role"}, 401

    except:
        return {
            "message": "An error occured while creating the role listing"
        }, 500

    return jsonify({
        "message": f"Application for {staff_id} has been created for {role_listing.role_name} role."
    }), 200



