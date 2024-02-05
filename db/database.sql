CREATE DATABASE IF NOT EXISTS NexodeskAPI;

USE NexodeskAPI;

create table dataInfo (
id int(11) NOT NULL auto_increment,
name VARCHAR(45)NOT NULL,
email VARCHAR(80)NOT NULL,
phone int(12)NOT NULL,
subjet VARCHAR(256)NOT NULL,
message VARCHAR(512)NOT NULL,
primary key(id)
);

insert into nexodesk values
(1, 'david', 'example@desk.com', 529611234567, 'example', 'examplemessge')

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Pass_2086!';
