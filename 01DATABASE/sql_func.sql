# SQL 함수
#sql 함수 작동 방법
# select 함수(값) 

#절대값 abs
select ABS(1),ABS(-1);

#문자열의 길이 측정 length(문자열)
select length('mysql');

#반올림 round(숫자)
select round(7.512112,3);

#숫자형 함수+,-,*,/,%(나머지) mod, div(몫만 반환)
select 7 mod 2;
select 7 div 2;

#올림 ceil, 내림 floor
select ceil(4.3),floor(5.8);

#제곱, 루트, 음수양수 확인
select power(4,3); #제곱
select sqrt(3); #루트
select sign(5), sign(-7);#양수면 1 반환 음수면 -1반환

#truncate(값, 자리수) 버림
select round(2.2345,3), truncate(2.2345,3); # 2.235, 2.234
select round(1153.456, -2), truncate(1153.456, -2);

#문자형 함수
#문자의 길이를 알아보는 함수
select char_length('sql'), length('sql'), char_length('홍길동'), length('홍길동');

#문자를 연결하는 함수 concat(), concat_ws()
select concat('this','is','Mysql') as concat1; #공백없이 문자를 합침
select concat(null,'this','mysql') as concat1; #null이 있으면 null 반환
select concat_ws(' ', 'this', 'is', 'mysql') as concat3; #문자열 사이에 공백을 넣음

#대문자를 소문자로 소문자를 대문자로
select lower('ABcd');
select upper('sql');

#lpad, rpad 문자열의 자릿수를 일정하게 하고 빈공간을 지정한 문자로 채우기
#lpad(값, 자릿수, 채울문자)
select lpad('sql',7,'#');

#공백을 없애는 함수 ltrim(문자열), rtrim(문자열)
select rtrim('              sql                   ');


select left('this is my sql',5);

#날짜형 함수
select curdate(); # 현재 날짜 년-월-일
select curtime(); # 현재 시간 시:분:초
select now(); # curdate 와 curtime 합친거


#요일 표시 함수 dayname(날짜)
select dayname('2024-08-02');

select date_format('2024-06-01', '%Y-%M-%e'); #2024-June-1

select dayname(last_day(sysdate()));


# 형 변환 함수: 형 변환 데이터 타입을 변환하는 함수
# char() char 타입으로 변환
# signed() 정수형(int)으로 변환
# decimal() decimal(숫자)으로 변환
# double() double형으로 변환
# float() float 타입으로 변환
# date() date 타입으로 변환
# datetime() datetime타입으로 변환
# CAST(값 as 변환할 데이터 타입)

select cast(10 as char);
select cast('-10' as signed);
select cast('10.1234' as decimal);

#convert(값, type)
select convert('10',decimal);

use world;
# 출력 컬럼 이름을 concat으로 합쳐서 출력하기 
#world의 country 테이블에서 인구가 4500만명~5500만명 사이에 있는 국가 조회.
select code, concat(name,'(',continent,')')as '나라이름(대륙)',region,population
from country
where population between 45000000 and 55000000;




