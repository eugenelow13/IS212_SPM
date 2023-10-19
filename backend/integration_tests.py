import flask_testing
import unittest
from src.app import app

# TestApp is for creating a test app instance


class TestApp(flask_testing.TestCase):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    app.config['TESTING'] = True

    def create_app(self):
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
            response = self.client.get(f"/api/staffs/roles/{role}")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.json["staffs"]), value)


if __name__ == '__main__':
    unittest.main()
