import unittest
from unittest.mock import Mock
from backend.src.app import Staff, Skill, Role, RoleSkill, StaffSkill


class TestStaff(unittest.TestCase):
    def test_get_staff(self):
        s1 = Staff("Jane","Smith", "Finance", "Canada", "jane.smith@example.com", 2)
        to_json = s1.json()
        to_json["staff_skills"] = ["Nothing"]
        self.assertEqual(to_json, {"staff_fname": "Jane", "staff_lname": "Smith", "dept": "Finance", "country": "Canada", "email": "jane.smith@example.com", "role": 2, "staff_skills": ["Nothing"], "staff_id": None})

class TestSkill(unittest.TestCase):
    def test_get_skill(self):
        skill1 = Skill("Python", "Programming Language")
        self.assertEqual(skill1.json(), {"skill_name": "Python", "skill_desc": "Programming Language"})

class TestRole(unittest.TestCase):
    def test_get_role(self):
        role1 = Role("Developer", "Develops Software")
        to_json = role1.json()
        to_json["role_skills"] = ["painting"]
        self.assertEqual(to_json, {"role_name": "Developer", "role_desc": "Develops Software", "role_skills": ["painting"]})

class TestRoleSkill(unittest.TestCase):
    def test_get_role_skill(self):
        roleskill1 = RoleSkill("Developer", "Python")
        self.assertEqual(roleskill1.json(), {"role_name": "Developer", "skill_name": "Python"})

class TestStaffSkill(unittest.TestCase):
    def test_get_staff_skill(self):
        staffskill1 = StaffSkill(1, "Python")
        self.assertEqual(staffskill1.json(), {"staff_id": 1, "skill_name": "Python"})

if __name__ == '__main__':
    unittest.main()