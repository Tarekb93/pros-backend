BEGIN;

DROP TABLE IF EXISTS users,professions,workers CASCADE;

CREATE TABLE professions(
  id SERIAL PRIMARY KEY,
  name text UNIQUE,
  icon text
);


CREATE TABLE workers(
  id SERIAL PRIMARY KEY,
  fullName text,
  phone integer NOT NULL,
  professionName text references professions(name),
  description text,
  avilability text,
  location text,
  rating decimal,
  picture text,
  is_trusted text
  );


CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name text,
  username VARCHAR(255)  NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone integer NOT NULL,
  email text
);


INSERT INTO professions (name, icon) VALUES
('airConditioner', '/database/assets/airCondi.JPEG'),('electricians', 'database/assets/airCondi.JPEG'),('renovations','database/assets/airCondi.JPEG'),('instelator','database/assets/airCondi.JPEG'),('movers','database/assets/airCondi.JPEG'),('gasTechnician','database/assets/airCondi.JPEG');

INSERT INTO workers (fullName, phone, professionName,description,avilability,location,rating,picture,is_trusted) VALUES
('mervat', '0549999999', 'airConditioner','10 years of experince','24/7','north','6.5','linkpic','yes'),('mario', '0549999998', 'electricians','Giving my best','24/7','south','9.5','linkpic','yes'),('hamod', '0549999997','renovations','Giving my best','sun-thu 08:00-18:00','south','3.5','linkpic','NO'),('sasha', '0549999996','instelator','multi finctional','sun-thu 09:00-19:00','east','7.5','linkpic','yes'),('barma', '0549999995','movers','hard worker','mun-fri 12:00-19:00','west','7.7','linkpic','yes'),('yoyo', '0549999994','gasTechnician','hard worker','mun-fri 12:00-19:00','there','7.7','linkpic','yes');

INSERT INTO users (name, username, password, phone, email) VALUES
('user1', 'username1','password1','0541111111','email1'),('user2', 'username2','password2','0542222222','email2'),('user3', 'username3','password3','0543333333','email3'),('user4', 'username4','password4','0544444444','email4');





COMMIT;