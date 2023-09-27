from src.extensions import db
from sqlalchemy import ForeignKey, Date
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.orm import relationship



class Staff(db.Model):
    __tablename__ = 'staff'
    staff_id = db.Column(db.Integer, primary_key= True)
    staff_fname = db.Column(db.String(50), nullable=False)
    staff_lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    access_role = db.Column(db.Integer, nullable=False)
    

    def __init__(self,staff_fname, staff_lname, dept, country, email, access_role):
        self.staff_fname = staff_fname
        self.staff_lname = staff_lname
        self.dept = dept
        self.country = country
        self.email = email
        self.access_role = access_role


    def json(self):
        return{"Staff_ID": self.staff_id,
               "Staff_FName": self.staff_fname,
               "Staff_LName": self.staff_lname,
               "Dept": self.dept,
               "Country": self.country,
               "Email": self.email,
               "Access_Role": self.access_role}
    

class Role(db.Model):
    __tablename__ = 'role'
    role_name = db.Column(db.String(20), primary_key=True)
    role_desc = db.Column(db.String(100), nullable=False)

    def __init__(self, role_name, role_desc):
        self.role_name = role_name
        self.role_desc = role_desc

    def json(self):
        return{"Role_Name": self.role_name,
               "Role_Desc": self.role_desc}
    


class Skill(db.Model):
    __tablename__ = 'skill'
    skill_name = db.Column(db.String(50), primary_key=True)
    skill_desc = db.Column(db.String(100), nullable=False)

    def __init__(self, skill_name, skill_desc):
        self.skill_name = skill_name
        self.skill_desc = skill_desc

    def json(self):
        return{"Skill_Name": self.skill_name,
               "Skill_Desc": self.skill_desc}
    


class RoleListing(db.Model):
    __tablename__ = 'role_listing'
    id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(20), ForeignKey('role.role_name'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    manager_id = db.Column(db.Integer, ForeignKey('staff.staff_id'), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    def __init__(self, role_name, start_date, end_date, manager_id, country):
        self.role_name = role_name
        self.start_date = start_date
        self.end_date = end_date
        self.manager_id = manager_id
        self.country = country

    def json(self):
        return{"Role_Name": self.role_name,
               "Start_Date": self.start_date,
               "End_Date": self.end_date,
               "Manager_ID": self.manager_id,
               "Country": self.country}
    

class Application(db.Model):
    __tablename__ = 'application'
    id = db.Column(db.Integer, ForeignKey('role_listing.id'), primary_key=True)
    staff_id = db.Column(db.Integer, ForeignKey('staff.staff_id'), primary_key=True)
    app_desc = db.Column(db.String(100), nullable=False)
    app_date = db.Column(db.Date, nullable=False)

    def __init__(self, id, staff_id, app_desc, app_date):
        self.id = id
        self.staff_id = staff_id
        self.app_desc = app_desc
        self.app_date = app_date

    def json(self):
        return{"ID": self.id,
               "Staff_ID": self.staff_id,
               "App_Desc": self.app_desc,
               "App_Date": self.app_date}
    

class RoleSkill(db.Model):
    __tablename__ = 'role_skill'
    role_name = db.Column(db.String(20), ForeignKey('role.role_name'), primary_key=True)
    skill_name = db.Column(db.String(50), ForeignKey('skill.skill_name'), primary_key=True)

    def __init__(self, role_name, skill_name):
        self.role_name = role_name
        self.skill_name = skill_name

    def json(self):
        return{"Role_Name": self.role_name,
               "Skill_Name": self.skill_name}
    
class StaffSkill(db.Model):
    __tablename__ = 'staff_skill'
    staff_id = db.Column(db.Integer, ForeignKey('staff.staff_id'), primary_key=True)
    skill_name = db.Column(db.String(50), ForeignKey('skill.skill_name'), primary_key=True)

    def __init__(self, staff_id, skill_name):
        self.staff_id = staff_id
        self.skill_name = skill_name

    def json(self):
        return{"Staff_ID": self.staff_id,
               "Skill_Name": self.skill_name}