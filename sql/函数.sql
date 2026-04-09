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
select round(1, 2); - 返回1保留2位小数;
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