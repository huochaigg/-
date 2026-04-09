select * from users;

select gender, count(*) from users group by gender;
select Country, count(*) from users group by Country;

select gender, Country, other, count(*) from users group by gender, Country, other;

select Country, avg(age) from users group by Country;

-- avg(age) 精确并保留两位小数
select Country, round(avg(age), 2) as avg_age from users group by Country;

-- 查询每个地区的人数，且只显示人数大于等于5的国家
select Country, count(*) 
from users 
group by Country
having count(*) >= 5;

select gender, count(*) as gender_count from users group by gender having gender_count >= 5;