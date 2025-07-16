CREATE TABLE if not exists `covid_month` ( 
  `Record_id` int NOT NULL AUTO_INCREMENT, 
  `Date` datetime DEFAULT NULL, 
  `Country` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL, 
  `Confirmed` int DEFAULT NULL, 
  `Deaths` int DEFAULT NULL, 
  `Recovered` int DEFAULT NULL, 
  `Active` int DEFAULT NULL, 
  `New_cases` int DEFAULT NULL, 
  `New_deaths` int DEFAULT NULL, 
  `New_recovered` int DEFAULT NULL, 
  `Continent` varchar(21) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL, 
  PRIMARY KEY (`Record_id`) 
) ENGINE=InnoDB AUTO_INCREMENT=4968 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

select * from covid_month limit 100;

select Record_id, Country, Date from covid_month; 

select distinct Country as '地址' from covid_month; 

select Record_id, Country, Date from covid_month where Deaths between 1000 and 2000; 

select count(*) from covid_month;

select max(`Deaths`) from covid_month;

show create table covid_month;

alter table covid_month add column `Population` int DEFAULT NULL;

# user表

drop table users;

CREATE TABLE if not exists `users` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `createtime` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Country` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL, 
  `age` int DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `other` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=4968 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO users (Country, age, gender, other) 
VALUES 
('东莞', 30, 'Male', 'Developer'),
('广州', 28, 'Male', 'Developer'),
('珠海', 22, 'Famile', 'Developer'),
('深圳', 40, 'Male', 'Developer'),
('佛山', 40, 'Male', 'Developer');

alter table users add column job varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL;

alter table users modify column age int not NULL;

alter table users modify job VARCHAR(50);

# 如何改为如果有status字段则不添加
alter table users add column status TINYINT(1) DEFAULT 1 COMMENT '状态，1表示正常，0表示删除' DEFAULT 1;

alter table users modify column status INT(1);

alter table users modify column status TINYINT(1) DEFAULT 1 NOT NULL;

# 报错
alter table users change column status state COMMENT '状态修改名称';

alter table users change column status state TINYINT(1) DEFAULT 1 NOT NULL COMMENT '状态修改名称';

alter table users change column state status TINYINT(1) DEFAULT 1 COMMENT '状态，1表示正常，0表示删除';

SELECT id, createtime, age FROM users where age > 30;

# 查询age非空的数量
select count(age) from users;


select gender, count(*) as count from users group by gender;

select gender, count(*) as count from users group by gender having count > 3;

select gender, count(*) as count from users where age >= 30 group by gender having count >= 3;

select gender, age from users;