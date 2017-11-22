INSERT INTO user (ID, username, age, gender, phoneNumber, password)
VALUES (1, "Dot", 18, "female", "07734", "ovo!!!!!!");

INSERT INTO user (ID, username, age, gender, phoneNumber, password)
VALUES (2, "stringbean", 18, "male", "55378008", "late");

INSERT INTO user (ID, username, age, gender, phoneNumber, password)
VALUES (3, "vegetable", 18, "non-binary", "379009", "chili");

INSERT INTO user (ID, username, age, gender, phoneNumber, password)
VALUES (4, "potato", 18, "transgender female", "004008", "tomato");

INSERT INTO counsellor (ID, firstName, lastName, email, password)
VALUES (1, "Bean", "McFluff", "beanmcfluff@example.com", "beanisapug");

INSERT INTO counsellor (ID, firstName, lastName, email, password)
VALUES (2, "Fox", "McCloud", "foxmcloud@example.com", "corneria");

INSERT INTO session (ID, beginTime, endTime, counsellorID, userID)
VALUES (1, "1970-01-01 00:00:01", "1980-01-01 00:00:01", 1, 1);

INSERT INTO session (ID, beginTime, endTime, counsellorID, userID)
VALUES (2, "1980-01-01 00:12:22", "1980-01-01 12:00:01", 2, 3);

INSERT INTO session (ID, beginTime, endTime, counsellorID, userID)
VALUES (3, "2001-01-01 00:00:01", "2002-01-01 00:00:01", 1, 2);

INSERT INTO session (ID, beginTime, endTime, counsellorID, userID)
VALUES (4, "2003-01-01 00:00:01", "2010-01-01 00:00:01", 1, 4);

INSERT INTO session (ID, beginTime, endTime, counsellorID, userID)
VALUES (5, "2017-08-08 19:20:01", "2017-01-01 20:00:01", 1, 1);

INSERT INTO message(ID, sessionID, messageTime, counsellorID, userID, messageContent, fromCounsellor, fromTwilio)
VALUES (1, 1, "1970-01-01 00:00:01", 1, 1, "haii", 0, 1);

INSERT INTO message(ID, sessionID, messageTime, counsellorID, userID, messageContent, fromCounsellor, fromTwilio)
VALUES (2, 1, "1973-01-01 00:00:01", 1, 1, "i am on the web app", 0, 0);

INSERT INTO message(ID, sessionID, messageTime, counsellorID, userID, messageContent, fromCounsellor, fromTwilio)
VALUES (3, 1, "1979-01-01 00:00:01", 1, 1, "sup", 1, 0);
