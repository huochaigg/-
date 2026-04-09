-- 分页查询

select * from users;

select * from users limit 5;

-- 从第二条开始，查询5条
select * from users limit 1, 5;

-- 从第六条开始，查询5条
select * from users limit 6, 5;

-- 从第n条开始，查询m条
-- select * from users limit n, m;