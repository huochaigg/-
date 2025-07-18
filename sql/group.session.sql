# 分组查询

# 1. 创建表
-- show create table users;

CREATE TABLE if not exists `users` ( 
  `id` int NOT NULL AUTO_INCREMENT, 
  `createtime` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Country` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL, 
  `age` int DEFAULT NULL,
  `gender` INT(1) DEFAULT 1 COMMENT '性别，1表示男，0表示女',
  `other` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=4968 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

# 添加数据
INSERT INTO users (Country, age, gender, other) 
VALUES 
('东莞', 30, 1, 'Developer'),
('广州', 28, 1, 'Developer'),
('珠海', 22, 0, 'Developer'),
('深圳', 41, 1, 'Developer'),
('中山', 43, 1, 'Developer'),
('汕头', 45, 1, 'Developer'),
('汕尾', 46, 1, 'Developer'),
('梅州', 33, 1, 'Developer'),
('潮州', 22, 1, 'Developer'),
('惠州', 18, 1, 'Developer'),
('茂名', 20, 1, 'Developer'),
('赣州', 22, 1, 'Developer'),
('九江', 25, 1, 'Developer'),
('南昌', 28, 1, 'Developer'),
('佛山', 40, 1, 'Developer');

# 查询

select * from users limit 20;

select gender, count(*) as count from users group by gender;

select gender, count(*) as count from users where age >= 30 group by gender;

select Country, count(*) as count from users WHERE age >= 30 group by Country HAVING count >= 5;

select gender, avg(age) as age from users group by gender;
select Country, avg(age) as age from users group by Country;
