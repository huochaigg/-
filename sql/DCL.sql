-- 管理用户

-- 查询用户
use mysql;
select * from mysql.user;

-- 创建用户 并只能在localhost访问, 密码为123456
create user 'testuser'@'localhost' identified by '123456';

-- 创建用户 可以在任意主机访问, 密码为123456
create user 'testuser2'@'%' identified by '123456';

-- 修改用户密码
alter user 'testuser'@'localhost' identified with mysql_native_password by '123123';
alter user 'testuser2'@'%' identified with mysql_native_password by '456456';

-- 如何修改用户testuser能在任意主机访问, 密码为123456
-- 1) 把账号从 localhost 改成任意主机 %
rename user 'testuser'@'localhost' to 'testuser'@'%';
-- 2) 重设密码
alter user 'testuser'@'%' identified by '123456';
-- 3) 刷新权限（一般可省略）
flush privileges;


-- 删除用户
drop user 'testuser'@'localhost';
drop user 'testuser2'@'%';



