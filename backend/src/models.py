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