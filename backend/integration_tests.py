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
        test_data = {
            "app_date": "2023-10-26",
            "app_desc": "Some nice stuff about myself",
            "dept": "Engineering",
            "id": 3,
            "listing_id": 36,
            "role_name": "Consultant",
            "staff_id": 140002,
            "staff_name": "Susan Goh"
        }
        response = self.client.get("/api/applications/3")
        self.maxDiff = None
        self.assertEqual(response.status_code, 200)
        # assert dicts are equivalent
        self.assertDictEqual(response.json, test_data)

        # self.assertEqual(response.json, test_data)

    def test_get_applications_detail(self):
        test_data = {
            "app_date": "2023-10-26",
            "app_desc": "Some nice stuff about myself",
            "applicant": {
                "country": "Singapore",
                "dept": "Sales",
                "email": "Susan.Goh@allinone.com.sg",
                "role": 2,
                "staff_fname": "Susan",
                "staff_id": 140002,
                "staff_lname": "Goh",
                "staff_skills": [
                    "Accounting and Tax Systems",
                    "Business Environment Analysis",
                    "Customer Relationship Management",
                    "Professional and Business Ethics"
                ]
            },
            "id": 3,
            "dept": "Engineering",
            "listing_id": 36,
            "role_listing": {
                "country": "Indonesia",
                "dept": "Engineering",
                "end_date": "2023-10-28",
                "id": 36,
                "manager_id": 150866,
                "manager_name": "Henry Chan",
                "role_desc": "The Consultant is responsible for providing Sales technical expertise to the sales team and clients during the sales process. He/She delivers presentations and technical demonstrations of the organisation's products to prospective clients. He translates the client's business requirements into technical specifications and requirements, and provides technical inputs for proposals, tenders, bids and any relevant documents. He uses prescribed guidelines or policies to analyse and solve problems. He works in a fast-paced and dynamic environment, and travels frequently to clients' premises for technical sales pitches and meetings. He is familiar with client relationship management and sales tools. He possesses deep product and technical knowledge, and is knowledgeable of the trends, developments and challenges of the industry domain. The Sakes Consultant displays effective listening skills and is inquisitive in nature. He possesses deep technical and domain knowledge, pays attention to detail, and has strong analytical and problem-solving capabilities. He has a service-oriented personality and is a team player who works towards developing solutions collaboratively.",
                "role_name": "Consultant",
                "role_skills": [
                    "Account Management",
                    "Business Development",
                    "Business Needs Analysis",
                    "Collaboration",
                    "Communication",
                    "Data Analytics",
                    "Problem Management",
                    "Problem Solving",
                    "Product Management",
                    "Project Management",
                    "Stakeholder Management"
                ],
                "start_date": "2023-10-26"
            },
            "role_name": "Consultant",
            "staff_id": 140002,
            "staff_name": "Susan Goh"
        }

        response = self.client.get("/api/applications/3?detail=true")
        self.maxDiff = None

        print(response.json)
        print("TEST DATA" + str(test_data))
        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.json, test_data)


if __name__ == '__main__':
    unittest.main()
