CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  entries BIGINT DEFAULT 0,
  joined TIMESTAMP NOT NULL
);


CREATE TABLE Login(
  id SERIAL PRIMARY KEY,
  hash VARCHAR(100) NOT NULL,
  email TEXT UNIQUE NOT NULL
);
