import flask_testing
import unittest

from src.app import app
from src.extensions import db
from src.models import Staff, Skill, Role, RoleSkill, StaffSkill
from sqlalchemy import text

from flask import Flask, Blueprint
from src.extensions import db
from dotenv import load_dotenv

from src.blueprints.listings import listings
from src.blueprints.applications import applications
from src.blueprints.staff import staff
from src.blueprints.roles import roles

# TestApp is for creating a test app instance


class TestApp(flask_testing.TestCase):

    def create_app(self):

        # Create Flask app
        app = Flask(__name__)

        # Register applications, listings, and staff blueprints under api (nest all)
        api = Blueprint("api", __name__, url_prefix="/api")

        # Path prefixed by /listings/<listing_id>/applications
        api.register_blueprint(applications)

        api.register_blueprint(listings)
        api.register_blueprint(staff)
        api.register_blueprint(roles)

        # Register api blueprint in app
        app.register_blueprint(api)

        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
        app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
        app.config['TESTING'] = True

        db.init_app(app)

        with app.app_context():
            db.create_all()
            with open('test.sql') as f:
                for line in f:
                    db.session.execute(text(line))
            db.session.commit()

        return app


    def setUp(self):
        pass

    def tearDown(self):
        pass

# test GET /listings


class TestRoleListingQueryAll(TestApp):
    def test_get_all(self):

        response = self.client.get("api/listings/")
        # self.assertEqual(response.json, {
        #     "role_listings": [
        #         {
        #             "id": 1,
        #             "role_name": "Software Engineer",
        #             "start_date": "2021-01-01",
        #             "end_date": "2021-12-31",
        #             "manager_id": 1,
        #             "country": "Singapore"
        #         }
        #     ]
        # })
        print(response)
        self.assertEqual(response.status_code, 200)


class TestStaff(TestApp):
    def test_get_staff(self):
        data = {
            "country": "Singapore",
            "dept": "Sales",
            "email": "Bao.Luu@allinone.com.sg",
            "role": 2,
            "staff_fname": "Bao",
            "staff_id": 140901,
            "staff_lname": "Luu",
            "staff_skills": [
                "Applications Support and Enhancement",
                "Collaboration",
                "Project Management"
            ]
        }

        response = self.client.get("/api/staffs/140901")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, data)

    def test_get_staff_by_role(self):
        data = {
            "admin": 2,
            "user": 484,
            "manager": 47,
            "hr": 22
        }

        for role, value in data.items():
            response = self.client.get(f"/api/staffs/?role={role}")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json["staffs"]), value)


if __name__ == '__main__':
    unittest.main()
