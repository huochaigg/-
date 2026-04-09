-- 插入数据
insert into users (Country, age, gender) values ('唐山', 30, 0);
insert into users (Country, age, gender) values ('茂名', 25, 1);

-- 插入全部
insert into users values (default, default, '北京', 30, 0, 'Product Manager');
insert into users values (default, default, '上海', 25, 1, 'Teacher');

-- 批量添加数据
insert into users (Country, age, gender) values ('九江', 19, 0), ('抚州', 45, 1);

-- 更新数据
-- 查询所有 other 为 null 的数据 并更新为 Product Manager
update users set other = 'Product Manager' where other is null;

-- 删除数据
delete from users where Country = '九江';
delete from users where age > 30;
delete from users where Country = '九江' and age > 30; -- 删除九江大于30岁的人

-- or：满足「任一」条件即删除 — 九江的人 或 年龄>30 的人（二者满足其一就会删）
delete from users where Country = '九江' or age > 30;

-- and 优先于 or 结合，等价于 (九江且年龄>30) 或 (other 为 Product Manager)，满足其一即删
delete from users where Country = '九江' and age > 30 or other = 'Product Manager';

-- 删除所有！！
delete from users;