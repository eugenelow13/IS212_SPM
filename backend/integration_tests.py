import flask_testing
import unittest
from src.app import app

# TestApp is for creating a test app instance
class TestApp(flask_testing.TestCase):
    # app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    # app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    # app.config['TESTING'] = True

    def create_app(self):
        return app

    def setUp(self):
        pass

    def tearDown(self):
        pass

# test GET /listings
class TestRoleListingQueryAll(TestApp):
    def test_get_all(self):

        response = self.client.get("/api/listings/")
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
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()