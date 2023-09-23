from src.extensions import db
from sqlalchemy import ForeignKey, Date
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy.orm import relationship

class Staff(db.Model):
    __tablename__ = 'staff'
    staffid = db.Column(db.Integer, primary_key = True, auto_increment=True)
    stafffname = db.Column(db.String(50), nullable=False)
    stafflname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    access_role = db.Column(db.Integer, nullable=False, foreignkey=True)


    def __init__(self,stafffname, stafflname, dept, country, email, access_role):
        self.stafffname = stafffname
        self.stafflname = stafflname
        self.dept = dept
        self.country = country
        self.email = email
        self.access_role = access_role


    def json(self):
        return{"Staff_ID": self.staffid,
               "Staff_FName": self.stafffname,
               "Staff_LName": self.stafflname,
               "Dept": self.dept,
               "Country": self.country,
               "Email": self.email,
               "Access_Role": self.access_role}