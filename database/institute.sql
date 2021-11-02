CREATE DATABASE institute;

CREATE TABLE schools(
    id int AUTO_INCREMENT,
    name varchar(200) NOT NULL,
    street varchar(200) NOT NULL,
    created date,
    updated date,
    status int DEFAULT 1,
    PRIMARY KEY (id)
);