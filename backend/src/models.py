from src.extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Staff(db.Model):
    __tablename__ = 'staff'
    staff_id = db.Column(db.Integer, primary_key= True)
    staff_fname = db.Column(db.String(50), nullable=False)
    staff_lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    role = db.Column(db.Integer, nullable=False)

    role_listing = relationship("RoleListing", back_populates="manager")

    def __init__(self, staff_fname, staff_lname, dept, country, email, role):
        self.staff_fname = staff_fname
        self.staff_lname = staff_lname
        self.dept = dept
        self.country = country
        self.email = email
        self.role = role

    def json(self):
        return{"staff_id": self.staff_id,
               "staff_fname": self.staff_fname,
               "staff_lname": self.staff_lname,
               "dept": self.dept,
               "country": self.country,
               "email": self.email,
               "role": self.role}


class Role(db.Model):
    __tablename__ = 'role'
    role_name = db.Column(db.String(20), primary_key=True)
    role_desc = db.Column(db.String(100), nullable=False)

    role_skills = relationship("RoleSkill", back_populates="role")
    role_listing = relationship("RoleListing", back_populates="role")

    def __init__(self, role_name, role_desc):
        self.role_name = role_name
        self.role_desc = role_desc

    def json(self):
        return{"role_name": self.role_name,
               "role_desc": self.role_desc,
               "role_skills": [role_skill.skill_name for role_skill in self.role_skills]}


class Skill(db.Model):
    __tablename__ = 'skill'
    skill_name = db.Column(db.String(50), primary_key=True)
    skill_desc = db.Column(db.String(100), nullable=False)

    def __init__(self, skill_name, skill_desc):
        self.skill_name = skill_name
        self.skill_desc = skill_desc

    def json(self):
        return{"skill_name": self.skill_name,
               "skill_desc": self.skill_desc}


class RoleListing(db.Model):
    __tablename__ = 'role_listing'
    id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(20), ForeignKey('role.role_name'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    manager_id = db.Column(db.Integer, ForeignKey('staff.staff_id'), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    manager = relationship("Staff", back_populates="role_listing")
    role = relationship("Role", back_populates="role_listing")

    def __init__(self, role_name, start_date, end_date, manager_id, country):
        self.role_name = role_name
        self.start_date = start_date
        self.end_date = end_date
        self.manager_id = manager_id
        self.country = country

    def json(self):
        return{"id": self.id,
               "role_name": self.role_name,
               "start_date": self.start_date.strftime('%Y-%m-%d'),
               "end_date": self.end_date.strftime('%Y-%m-%d'),
               "manager_id": self.manager_id,
               "manager_name": self.manager.staff_fname + " " + self.manager.staff_lname,
               "country": self.country,
               "dept": self.manager.dept,
               "role_skills": [role_skill.skill_name for role_skill in self.role.role_skills]
               }
    

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
        return{"id": self.id,
               "staff_id": self.staff_id,
               "app_desc": self.app_desc,
               "app_date": self.app_date.strftime('%Y-%m-%d')}
    

class RoleSkill(db.Model):
    __tablename__ = 'role_skill'
    role_name = db.Column(db.String(20), ForeignKey('role.role_name'), primary_key=True)
    skill_name = db.Column(db.String(50), ForeignKey('skill.skill_name'), primary_key=True)

    role = relationship("Role", back_populates="role_skills")

    def __init__(self, role_name, skill_name):
        self.role_name = role_name
        self.skill_name = skill_name

    def json(self):
        return{"role_name": self.role_name,
               "skill_name": self.skill_name}
 
    
class StaffSkill(db.Model):
    __tablename__ = 'staff_skill'
    staff_id = db.Column(db.Integer, ForeignKey('staff.staff_id'), primary_key=True)
    skill_name = db.Column(db.String(50), ForeignKey('skill.skill_name'), primary_key=True)

    def __init__(self, staff_id, skill_name):
        self.staff_id = staff_id
        self.skill_name = skill_name

    def json(self):
        return{"staff_id": self.staff_id,
               "skill_name": self.skill_name}