DROP TABLE IF EXISTS squiggle_pages;

CREATE TABLE squiggle_pages(
	pageID int NOT NULL AUTO_INCREMENT,
	pageName VARCHAR(200) NOT NULL,
	pageURLCode VARCHAR(10) NOT NULL,
	PRIMARY KEY (pageID)
);


DROP TABLE IF EXISTS squiggle_data;

CREATE TABLE squiggle_data(
	pageID int,
	date DATE,
	visitorLocation VARCHAR(100),
	visitorReturn BOOLEAN,
	visitorBrowser VARCHAR(100)
);