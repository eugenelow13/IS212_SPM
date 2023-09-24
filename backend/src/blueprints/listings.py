from flask import Blueprint
# from src.models import Role

listings = Blueprint("listings", __name__, url_prefix="/listings")

@listings.route("/", methods=["GET"])
def see_listings():
    pass

@listings.route("/<int:listing_id>", methods=["GET"])
def see_listing():
    pass

@listings.route("/", methods=["POST"])
def create_listing():
    pass

