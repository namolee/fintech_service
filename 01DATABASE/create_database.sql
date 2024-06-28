create schema NaverDB;

create table member
(
	아이디 char(8) not null primary key,
    회원이름 varchar(10) not null,
    인원수 tinyint not null,
    주소 char(2) not null,
    연락처국번 char(3) null,
    전화번호 char(8) null,
	평균키 tinyint unsigned null ,
    데뷔일자 date null
    );
alter table member modify column 평균키 tinyint unsigned null;

#컬럼명 변경
# alter table 테이블명 change 기존컬럼명 변경할컬럼명 컬럼타입;
alter table member change mem_id 아이디 char(8);

desc member;
create table buy
(
	순번 int auto_increment not null primary key,
    아이디 char(8) not null ,
    제품이름 char(6) not null,
    분류 char(4) null,
    가격 int unsigned not null,
    수량 smallint unsigned not null,
    foreign key(아이디) references member(아이디)
    
    );
    desc member;
insert into member values
('TWC', '트와이스',9,'서울','02','11111111',167,'2015.10.19'),
('BLK', '블랙핑크',4,'경남','055','22222222',163,'2016.08.08'),
('WMN', '여자친구',6,'경기','031','33333333',166,'2015.01.15'),
('OMY', '오마이걸',7,'서울',null,null,160,'2015.04.21'),
('GRL', '소녀시대',8,'서울','02','44444444',168,'2007.08.02'),
('ITZ', '잇지',5,'경남',null,null,167,'2019.02.12'),
('RED', '레드벨벳',4,'경북','054','55555555',161,'2014.08.01'),
('APN', '에이핑크',6,'경기','031','77777777',164,'2011.02.10'),
('SPC', '우주소녀',13,'서울','02','88888888',162,'2016.02.25'),
('MMU', '마마무',4,'전남','051','99999999',165,'2014.06.19');
    
insert into buy values
(1,'BLK','지갑',NULL,30,2),
(2,'BLK','맥북프로','디지털',1000,1),
(3,'APN','아이폰','디지털',200,1),
(4,'MMU','아이폰','디지털',200,5),
(5,'BLK','청바지','패션',50,3),
(6,'MMU','에어팟','디지털',80,10),
(7,'GRL','혼공SQL','서적',15,5),
(8,'APN','혼공SQL','서적',15,2),
(9,'APN','청바지','패션',50,1),
(10,'MMU','지갑',NULL,30,1),
(11,'APN','혼공SQL','서적',15,1),
(12,'MMU','지갑',NULL,30,4);
  
  
select * from member;
select * from buy;
commit;

#서브쿼리
select 회원이름, 평균키
from member
where 평균키 > (select 평균키 from member where 회원이름='에이핑크');




