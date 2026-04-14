-- 字符串相关
select * from users;


select concat('Hello', 'World');
select length('Hello');
select substring('Hello', 1, 3);
select replace('Hello World', 'Hello', '--');
select lower('Hello');
select upper('hello');
select reverse('Hello');
select trim('Hello ');
select instr('Hello World', 'World'); -- 返回World在Hello World中的位置
select lpad('Hello', 10, '0');
select rpad('Hello', 10, '0');
select ltrim(' Hello');
select rtrim('Hello ');

-- 数值相关
select ceil(10.1);
select floor(10.1);
select mod(10, 3); -- 返回10除以3的余数
select rand();
select round(1, 2); -- 返回1保留2位小数;
select truncate(1.23456, 2); -- 返回1.23456保留2位小数
select truncate(1.236, 2); -- 返回1.23

-- 生成六位随机数
select lpad(round(rand()*1000000), 6, '0');

-- 日期相关
select curdate(); -- 2026-04-09
select curtime(); -- 21:52:37
select now(); -- 2026-04-09 21:53:15

select year('2012-12-21');
select month('2012-12-21');
select day('2012-12-21');
select date_add('2012-12-21', interval 1 day);
select date_sub('2012-12-21', interval 1 day);
select datediff('2012-12-21', '2012-12-23');
-- 格式化日期时间 
select date_format('2012-12-21', '%Y-%m-%d'); -- 2012-12-21
select date_format('2012-12-21', '%Y-%m-%d %H:%i:%s');
select date_format('2012-12-21', '%Y-%m-%d %H:%i:%s');

-- 查询所有人的创建天数,并且根据创建天数倒序排序
select id, createtime from users order by datediff(now(), createtime) desc;
select id, datediff(now(), createtime) createday from users order by createday desc;

-- 流程相关
select * from users;


select if(1 > 0, 'yes', 'no');
select ifnull(null, 'default');

select id, Country, 
  case when age > 30 then '中年'
    when age >= 20 and age < 30 then '青年'
    when age < 20 then '少年'
    else '其他'
  end as age_text 
from users;

select id, Country,
  case
    when age < 20 then '少年'
    when age >= 20 and age < 30 then '青年'
    when age >= 30 then '中年'
    else '其他'
  end as age_label
from users;



-- 可以为null,因为有些同学旷考了
create table score (
  id int primary key auto_increment,
  name varchar(20),
  math int null,
  english int null,
  chinese int null
);

insert into score (name, math, english, chinese) values 
 ('张三', 90, 80, 70),
 ('李四', 80, 70, 60),
 ('王五', 70, 60, 50),
 ('赵六', null, null, null),
 ('孙七', 40, 30, 20),
 ('周八', 93, 85, 77);

select * from score; 

delete from score; -- 删除所有数据
drop table score; -- 删除表

select id, name,
  case
    when math < 60 then '不及格'
    when math >= 60 and math < 80 then '及格'
    when math >= 80 and math < 90 then '良好'
    when math >= 90 then '优秀'
    else '缺考'
  end as `数学`,
  case
    when english < 60 then '不及格'
    when english >= 60 and english < 80 then '及格'
    when english >= 80 and english < 90 then '良好'
    when english >= 90 then '优秀'
    else '缺考'
  end as `英语`,
  case
    when chinese < 60 then '不及格'
    when chinese >= 60 and chinese < 80 then '及格'
    when chinese >= 80 and chinese < 90 then '良好'
    when chinese >= 90 then '优秀'
    else '缺考'
  end as `语文`
from score;