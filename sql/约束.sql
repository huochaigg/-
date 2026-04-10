-- 约束

-- 创建部门
use test;
create table dept (
  id int primary key auto_increment,
  name varchar(20) not null unique
) engine=innodb default charset=utf8mb4;

drop table dept;

insert into dept (name) values
('研发'),
('市场'),
('财务'),
('销售'),
('总经理');


select * from dept order by id asc;

-- 创建员工
create table if not exists emp (
  id int primary key auto_increment comment '员工id',
  name varchar(50) not null comment '员工姓名',
  age int comment '员工年龄',
  job varchar(50) comment '员工职位',
  salary decimal(10,2) comment '员工工资',
  entrydate date comment '入职日期',
  managerid int comment '领导id',
  dept_id int comment '部门id',
  -- 外键1：部门
  constraint fk_emp_dept foreign key (dept_id)
    references dept(id)
    on delete restrict
    on update cascade,
  -- 外键2：领导（自关联）
  constraint fk_emp_manager foreign key (managerid)
    references emp(id)
    on delete set null
    on update cascade
) engine=innodb default charset=utf8mb4;

drop table emp;

-- 或者删除所有数据，并重置自增id
delete from emp;
alter table emp auto_increment = 1;

insert into emp (name, age, job, salary, entrydate, managerid, dept_id) values
('A', 40, '总经理', 20000, '2020-01-01', null, 5),
('张三', 24, '研发', 15000, '2020-01-01', 1, 1),
('李四', 21, '研发', 11000, '2020-01-01', 2, 1),
('王五', 22, '研发', 10000, '2020-01-01', 2, 1),
('赵六', 23, '销售', 15000, '2020-01-01', 1, 4),
('孙七', 24, '财务', 8000, '2020-01-01', 1, 3),
('周八', 25, '市场', 9000, '2020-01-01', 1, 2);

select * from emp;

delete from dept where id = 5;
insert into dept (id, name) values (5,'总经理');
