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
  PRIMARY KEY (`Staff_ID`),
);

-- Table structure for table `role_listing`
DROP TABLE IF EXISTS `role_listing`;
CREATE TABLE IF NOT EXISTS `role_listing` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `Role_Name` varchar(20) NOT NULL REFERENCES role(Role_Name),
  `Start_Date` date NOT NULL,
  `End_Date` date NOT NULL,
  `Manager_ID` int NOT NULL REFERENCES staff(Staff_ID),
  `Country` varchar(50) NOT NULL,
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



