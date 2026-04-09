-- 表查询

-- 查询所有字段
select * from users;

-- 查询指定字段
select Country, age from users;

-- 查询指定字段，并指定别名
select Country as '地址', age as '年龄' from users;


select id, Country, age from users where id > 5000;

select id, Country, age, gender from users where Country = '九江' and age > 20;

select id, createtime, Country, age, gender, other from users where Country = '九江' || Country = '南昌';

-- 非
select id, createtime, Country, age, gender, other from users where not gender = 1;

-- 模糊查询
select id, createtime, Country, age, gender, other from users where Country like '%九江%';

select id, createtime, Country, age, gender, other from users where Country like '%江%';