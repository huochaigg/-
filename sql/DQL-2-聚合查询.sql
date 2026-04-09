select * from users;

select count(*) from users;

select avg(age) from users;

select max(age) from users;

select min(age) from users;

select sum(age) from users;

select Country, sum(age) as total_age from users where Country = '九江';