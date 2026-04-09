-- 表操作

-- 查询所有数据库
show databases;

-- 查询当前数据库
select database();

-- 创建数据库
create database test;
create database if not exists test; -- 如果数据库不存在，则创建数据库
create database if not exists test character set utf8mb4; -- 如果数据库不存在，则创建数据库，并指定字符集
create database if not exists test character set utf8mb4 collate utf8mb4_general_ci; -- 如果数据库不存在，则创建数据库，并指定字符集和排序规则

-- 查询数据库
show databases;


-- 删除数据库
drop database test;
drop database if exists test; -- 如果数据库存在，则删除数据库, 如果不存在，则不删除，并返回0，不报错
-- 返回0代表什么？代表删除成功，返回1代表删除失败

-- 使用数据库
use test;


-- 创建表
create table users ( -- 和下面的有什么区别: 如果表不存在，则创建表，如果表存在，则不创建，并返回0，不报错
  id int primary key auto_increment,
  name varchar(20) not null,
  age int not null,
  email varchar(50) not null
);

create table if not exists users (
  id int primary key auto_increment,
  name varchar(20) not null,
  age int not null,
  email varchar(50) not null
);

-- 查询表
show tables;

-- 查询表结构
describe users;

-- 查询表的建表语句
show create table users;

-- 删除表
drop table if exists users; -- 如果表存在，则删除表，如果不存在，则不删除，并返回0，不报错

-- 查询指定表的建表语句
show create table test.users; -- 查询指定表的建表语句，并指定数据库
show create table egg_database.users;

-- 修改表名
alter table users rename to users2;


-- 修改表结构
alter table users add column email varchar(50) not null;
-- 在name列后面添加字段
alter table users add column email varchar(50) not null after name;
-- 在第一列添加字段
alter table users add column email varchar(50) not null first;

-- 修改字段类型
-- alter table 表名 modify column 字段名 数据类型 comment '注释';
alter table users modify column email varchar(50) not null;
-- alter table 表名 change column 字段名 新字段名 数据类型 comment '注释';
alter table users change column email email2 varchar(50) not null;


-- 删除表结构
drop table users; 
drop table if exists users;