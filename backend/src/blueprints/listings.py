from flask import Blueprint, request, jsonify
from src.models import RoleListing
import datetime
from src.extensions import db

# from src.models import Role

listings = Blueprint("listings", __name__, url_prefix="/listings")

@listings.route("/", methods=["GET"])
def get_all():
    listing_list = RoleListing.query.all()
    if(len(listing_list)):
        return jsonify({"role_listings": [listing.json() for listing in listing_list]})
    return jsonify({"message": "No role listings found."}), 404

@listings.route("/<int:listing_id>", methods=["GET"])
def get_listing():
    pass

@listings.route("/", methods=["POST"])
def create_listing():
    
    # Form Data
    form_data = request.get_json()

    # Parse start_date and end_date into datetime objects using YYYY-MM-dd format
    start_date = datetime.datetime.strptime(form_data["start_date"], "%Y-%m-%d").date()
    end_date = datetime.datetime.strptime(form_data["end_date"], "%Y-%m-%d").date()

    # Validate start date and end date, making sure start date is on today or later, and end date is after start date
    # If not, return error status
    
    if start_date < datetime.date.today():
        return {"error": "Start date must be today or later."}, 400
    
    if end_date < start_date:
        return {"error": "End date must be after start date."}, 400

    # Create new listing
    role_listing = RoleListing(role_name=form_data["role_name"], start_date=start_date, end_date=end_date, manager_id=form_data["manager_id"], country=form_data["country"])

    try:
        db.session.add(role_listing)
        db.session.commit()

    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred while creating the role listing"
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": role_listing.json()
        }
    ), 201
    
    

@listings.route("/<int:listing_id>", methods=["PUT"])
def edit_listing():
   pass

