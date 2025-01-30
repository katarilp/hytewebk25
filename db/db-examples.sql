-- "DROP DATABASE ...;" poistaa tietokannan kokonaan
-- "DROP DATABASE IF EXISTS ...;" poistaa tietokannan, jos se on olemassa
-- "CREATE DATABASE ...;" luo uuden tietokannan
-- "CREATE TABLE ...;" luo uuden taulun
-- "ALTER TABLE ... ADD COLUMN ...;" lisää uuden sarakkeen olemassa olevaan tauluun
-- "FOREIGN KEY ... REFERENCES ...;" lisää viite-eheysrajoitteen taulujen välille
-- "AUTO_INCREMENT" lisää automaattisesti kasvavan arvon sarakkeeseen
-- "PRIMARY KEY" määrittää sarakkeen pääavaimeksi
-- "NOT NULL" määrittää sarakkeen arvon olevan pakollinen
-- "UNIQUE" määrittää sarakkeen arvon olevan uniikki
-- "DEFAULT" määrittää sarakkeen oletusarvon
-- MariaBDssä " source (reitti tiedostoon)" ajaa sql-tiedoston, huom! ei tarvitse puolipistettä perään
-- desc taulun_nimi; näyttää taulun rakenteen

DROP DATABASE IF EXISTS db_examples;
CREATE DATABASE db_examples;
USE db_examples;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries. DECIMAL(5,2) means 5 digits in total, 2 of them are decimals. TEXTin pituus
-- on ihan yhtä pitkä kuin VARCHAR, mutta se vie enemmän tilaa tietokannassa kuin VARCHAR(jonka pituuden voi määritellä,
-- TEXTin pituuteen ei voi vaikuttaa.).
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';


-- Inserting data into tables
-- Inserting a single record, without specifying column names
INSERT INTO Users VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-02 10:00:00', 'regular');

-- Iserting multiple user rows at once (default values like created_at are inserted without need to specify them)
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Example when FK constraint fails (if user_id 15 does not exist)-> changed user_id from 15 to 2
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (2, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00');

-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');
