import flask_testing
import unittest

from src.app import create_app
from src.extensions import db
from sqlalchemy import text

# TestApp is for creating a test app instance


class TestApp(flask_testing.TestCase):

    def create_app(self):

        # Create Flask app
        app = create_app()
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
        app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
        app.config['TESTING'] = True

        db.init_app(app)

        with app.app_context():
            db.create_all()
            with open('backend/test.sql') as f:
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


class TestApplications(TestApp):
    def test_get_application(self):
        test_data = {"id": 1,
                     "listing_id": 3,
                     "role_name": "Call Centre",
                     "staff_id": 160331,
                     "staff_name": "Nara Loo",
                     "app_desc": "this is hr trying out",
                     "app_date": "2023-10-22"
                     }
        response = self.client.get("/api/applications/1")
        self.maxDiff = None
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, test_data)

    def test_get_applications_detail(self):
        test_data = {"id": 1,
                     "listing_id": 3,
                     "role_name": "Call Centre",
                     "staff_id": 160331,
                     "staff_name": "Nara Loo",
                     "app_desc": "this is hr trying out",
                     "app_date": "2023-10-22",
                     "applicant": {
                         "country": "Singapore",
                         "dept": "HR",
                         "email": "Nara.Loo@allinone.com.sg",
                         "role": 4,
                         "staff_fname": "Nara",
                         "staff_id": 160331,
                         "staff_lname": "Loo",
                         "staff_skills": [
                             "Business Acumen",
                             "Human Resource Advisory",
                             "People and Performance Management",
                             "Problem Solving"
                         ]},
                     "role_listing": {
                         "id": 3,
                         "role_name": "Call Centre",
                         "role_desc": "Call Centre Executive is responsible for providing assistance to customers by addressing their queries and requests. He/She advises customers on appropriate products and services based on their needs. He is responsible for the preparation of customer documentation. In the case of complex customer requests, he escalates them to senior officers. He is able to abide by safety and/or security standards in the workplace.\\r\\n\\r\\nThe Call Centre Executive  pays strong attention to details to verify and process documentation. He also shows initiative and quick decision-making skills to provide excellent personalised customer services and support. He is comfortable with various stakeholder interactions whilst working in shifts and possesses adequate computer literacy to process customer documentation. ",
                         "dept": "HR",
                         "manager_name": "Anh Van",
                         "role_skills": [
                             "Call Centre Management",
                             "Collaboration",
                             "Communication",
                             "Customer Relationship Management",
                             "Digital Fluency",
                             "Problem Solving",
                             "Stakeholder Management",
                             "Technology Application"
                         ],
                         "start_date": "2023-10-22",
                         "end_date": "2023-10-24",
                         "manager_id": 160306,
                         "country": "Vietnam"
                     }}

        response = self.client.get("/api/applications/1?detail=true")
        self.maxDiff = None

        print(response.json)
        print("TEST DATA" + str(test_data))
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.json, test_data)


if __name__ == '__main__':
    unittest.main()
