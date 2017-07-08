CREATE TABLE twilio (
	ID int NOT NULL AUTO_INCREMENT,
	email VARCHAR(256) NOT NULL,
	twilioPhoneNumber VARCHAR(15),
	accountSid VARCHAR(34),
	authToken VARCHAR(32),
	UNIQUE(email),
	UNIQUE(twilioPhoneNumber),
	UNIQUE(authToken),
	PRIMARY KEY (ID)
);

CREATE TABLE user (
	ID int NOT NULL AUTO_INCREMENT, 
	age int,
	gender VARCHAR(24), 
	phoneNumber VARCHAR(15) NOT NULL , 
	password VARCHAR(30) NOT NULL, 
	PRIMARY KEY (ID)
);

CREATE TABLE counsellor (
	ID int NOT NULL AUTO_INCREMENT, 
	firstName VARCHAR(30) NOT NULL, 
	lastName VARCHAR(30) NOT NULL, 
	email VARCHAR(256) NOT NULL, 
	password VARCHAR(30) NOT NULL, 
	PRIMARY KEY (ID)
);

CREATE TABLE session (
	ID int NOT NULL AUTO_INCREMENT, 
	beginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	endTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	counsellorID INT NOT NULL, 
	userID INT, 
	PRIMARY KEY (ID) REFERENCES counsellor(ID), 
	FOREIGN KEY (userID) REFERENCES user(ID)
);

CREATE TABLE message (
	sessionID int, 
	messageTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
	counsellorID int, userID int, 
	messageContent VARCHAR(256) NOT NULL, 
	PRIMARY KEY (sessionID), 
	PRIMARY KEY (messageTime), 
	FOREIGN KEY (counsellorID) REFERENCES counsellor(ID), 
	FOREIGN KEY (userID) REFERENCES user(ID)
);