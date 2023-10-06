from flask import Blueprint, jsonify
from src.models import Role

roles = Blueprint("roles", __name__, url_prefix="/roles")

@roles.route("/", methods=["GET"])
def see_roles():
    role_list = Role.query.all()
    
    if(len(role_list)):
        return jsonify({"roles": [role.json() for role in role_list]})
    return jsonify({"message": "No roles found."}), 404

@roles.route("/<int:role_id>", methods=["GET"])
def see_role():
    pass

@roles.route("/", methods=["POST"])
def create_role():
    pass
