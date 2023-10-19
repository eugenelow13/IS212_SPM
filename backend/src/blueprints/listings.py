from flask import Blueprint, request, jsonify
from src.models import RoleListing
import datetime
from src.extensions import db
from sqlalchemy.exc import IntegrityError

# from src.models import Role

listings = Blueprint("listings", __name__, url_prefix="/listings")

@listings.route("/", methods=["GET"])
def get_all():
    listing_list = RoleListing.query.all()
    if(len(listing_list)):
        return jsonify({"role_listings": [listing.json() for listing in listing_list]}), 200
    return jsonify({"message": "No role listings found."}), 404

@listings.route("/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    listing = RoleListing.query.get(listing_id)
    if listing:
        return listing.json(), 200
    
    return {"message": "No role listings found."}, 404

@listings.route("/", methods=["POST"])
def create_listing():
    
    # Form Data
    body = request.get_json()

    # Parse start_date and end_date into datetime objects using YYYY-MM-dd format
    try:
        start_date = datetime.datetime.strptime(body["start_date"], "%Y-%m-%d").date()
        end_date = datetime.datetime.strptime(body["end_date"], "%Y-%m-%d").date()

    except ValueError:
        return {"message": "Invalid date input"} 

    # Validate start date and end date, making sure start date is on today or later, and end date is after start date
    # If not, return error status
    
    if start_date < datetime.date.today():
        return {"message": "Start date must be today or later"}, 400
    
    if end_date < start_date:
        return {"message": "End date must be after start date"}, 400

    # Create new listing
    role_listing = RoleListing(role_name=body["role_name"], start_date=start_date, end_date=end_date, manager_id=body["manager_id"], country=body["country"])

    try:
        db.session.add(role_listing)
        db.session.commit()

    except IntegrityError:
        return {"message": "Duplicate listing info provided"}, 400

    except:
        return jsonify(
            {
                "message": "An error occurred creating the role listing"
            }
        ), 500

    return jsonify(
        {
            "data": role_listing.json()
        }
    ), 201
    
    

@listings.route("/<int:listing_id>", methods=["PUT"])
def edit_listing(listing_id):

    # Form Data
    body = request.get_json()

    # Parse start_date and end_date into datetime objects using YYYY-MM-dd format
    try:
        start_date = datetime.datetime.strptime(body["start_date"], "%Y-%m-%d").date()
        end_date = datetime.datetime.strptime(body["end_date"], "%Y-%m-%d").date()

    except ValueError:
        return {"message": "Invalid date input"} 
    # Validate start date and end date, making sure start date is on today or later, and end date is after start date
    # If not, return error status
    
    if start_date < datetime.date.today():
        return {"message": "Start date must be today or later"}, 400
    
    if end_date < start_date:
        return {"message": "End date must be after start date"}, 400

    try:
        print(body)
        role_listing = RoleListing.query.get(listing_id)
        role_listing.role_name = body["role_name"]
        role_listing.start_date = start_date
        role_listing.end_date = end_date
        role_listing.manager_id = body["manager_id"]
        role_listing.country = body["country"]


        db.session.add(role_listing)
        db.session.commit()

    except IntegrityError:
        return {"message": "Duplicate listing info provided"}, 400

    except:
        return jsonify(
            {
                "message": "An error occurred creating the role listing"
            }
        ), 500

    return jsonify(
        {
            "message": f"Role Listing for {role_listing.id} creation succcesful",
            "data": role_listing.json()
        }
    ), 201
    
