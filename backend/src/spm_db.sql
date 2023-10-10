-- create spm_db DB
drop schema if exists spm_db;
create schema spm_db;
use spm_db;

-- Table structure for table `access_control`
-- DROP TABLE IF EXISTS `access_control`;
-- CREATE TABLE IF NOT EXISTS `access_control` (
--   `Access_ID` int NOT NULL,
--   `Access_Control_Name` varchar(20) NOT NULL,
--   PRIMARY KEY (`Access_ID`)
-- );

-- Table structure for table `role`
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `Role_Name` varchar(20) NOT NULL,
  `Role_Desc` longtext NOT NULL,
  PRIMARY KEY (`Role_Name`)
);

-- Table structure for table `skill`
DROP TABLE IF EXISTS `skill`;
CREATE TABLE IF NOT EXISTS `skill` (
  `Skill_Name` varchar(50) NOT NULL,
  `Skill_Desc` longtext NOT NULL,
  PRIMARY KEY (`Skill_Name`)
);

-- Table structure for table `staff`
DROP TABLE IF EXISTS `staff`;
CREATE TABLE IF NOT EXISTS `staff` (
  `Staff_ID` int NOT NULL AUTO_INCREMENT,
  `Staff_FName` varchar(50) NOT NULL,
  `Staff_LName` varchar(50) NOT NULL,
  `Dept` varchar(50) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Role` int NOT NULL,
  PRIMARY KEY (`Staff_ID`)
);

-- Table structure for table `role_listing`
DROP TABLE IF EXISTS `role_listing`;
CREATE TABLE IF NOT EXISTS `role_listing` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Role_Name` varchar(20) NOT NULL REFERENCES role(Role_Name),
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Manager_ID` int NOT NULL REFERENCES staff(Staff_ID),
  `Country` varchar(50) NOT NULL
);

-- Table structure for table `application`
DROP TABLE IF EXISTS `application`;
CREATE TABLE IF NOT EXISTS `application` (
  `id` int NOT NULL REFERENCES role_listing(id),
  `Staff_ID` int NOT NULL REFERENCES staff(Staff_ID),
  `App_Desc` longtext NOT NULL,
  `App_Date` date NOT NULL,
  PRIMARY KEY (`id`,`Staff_ID`)
);

-- Table structure for table `role_skill`
DROP TABLE IF EXISTS `role_skill`;
CREATE TABLE IF NOT EXISTS `role_skill` (
  `Role_Name` varchar(20) NOT NULL REFERENCES role(Role_Name),
  `Skill_Name` varchar(50) NOT NULL REFERENCES skill(Skill_Name),
  PRIMARY KEY (`Role_Name`,`Skill_Name`)
);

-- Table structure for table `staff_skill`
DROP TABLE IF EXISTS `staff_skill`;
CREATE TABLE IF NOT EXISTS `staff_skill` (
  `Staff_ID` int NOT NULL REFERENCES staff(Staff_ID),
  `Skill_Name` varchar(20) NOT NULL REFERENCES skill(Skill_Name),
  PRIMARY KEY (`Staff_ID`,`Skill_Name`)
);

INSERT INTO role (Role_Name, Role_Desc) VALUES ('Admin', 'Administrator role');
INSERT INTO role (Role_Name, Role_Desc) VALUES ('User', 'User role');
INSERT INTO role (Role_Name, Role_Desc) VALUES ('Manager', 'Manager role');

INSERT INTO skill (skill_name, skill_desc) VALUES ('Skill1', 'Description of Skill1');
INSERT INTO skill (skill_name, skill_desc) VALUES ('Skill2', 'Description of Skill2');
INSERT INTO skill (skill_name, skill_desc) VALUES ('Skill3', 'Description of Skill3');

INSERT INTO staff (Staff_FName, Staff_LName, Dept, Country, Email, Role) VALUES ('John', 'Doe', 'Human Resources', 'United States', 'john.doe@example.com', 1);
INSERT INTO staff (Staff_FName, Staff_LName, Dept, Country, Email, Role) VALUES ('Jane', 'Smith', 'Finance', 'Canada', 'jane.smith@example.com', 2);
INSERT INTO staff (Staff_FName, Staff_LName, Dept, Country, Email, Role) VALUES ('Alice', 'Johnson', 'Marketing', 'United Kingdom', 'alice.johnson@example.com', 3);

INSERT INTO role_skill (Role_Name, Skill_Name) VALUES ('Admin', 'Skill1');
INSERT INTO role_skill (Role_Name, Skill_Name) VALUES ('Admin', 'Skill2');
INSERT INTO role_skill (Role_Name, Skill_Name) VALUES ('Admin', 'Skill3');

INSERT INTO role_listing (Role_Name, Start_Date, End_Date, Manager_ID, Country) VALUES ('Admin', '2023-01-01', '2023-12-31', 1, 'United States');
INSERT INTO role_listing (Role_Name, Start_Date, End_Date, Manager_ID, Country) VALUES ('User', '2023-02-01', '2023-11-30', 2, 'Canada');
INSERT INTO role_listing (Role_Name, Start_Date, End_Date, Manager_ID, Country) VALUES ('Manager', '2023-03-01', '2023-10-31', 3, 'United Kingdom');
