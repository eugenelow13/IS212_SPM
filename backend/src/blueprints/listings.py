from flask import Blueprint, jsonify
from src.models import RoleListing

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
    pass
