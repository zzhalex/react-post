CREATE TABLE Person (
    PersonID bigserial,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

CREATE TABLE Post (
    PostID bigserial,
    Title varchar(255),
    Postcontent text,
	Posttype int,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE PersonandPost (
    ID bigserial,
    PostID int,
    PersonID int
);

CREATE TABLE city(
   city              VARCHAR(25) ,
  admin             VARCHAR(25) NOT NULL,
  country           VARCHAR(25) NOT NULL,
   population        INT
);