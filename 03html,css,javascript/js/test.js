//document.write("자바스크립트 외부 링크 테스트");

// 한 줄 주석 //
// 여러줄 주석 /*  */

//변수: 자료를 넣는 상자, 1개만 담을 수 있음, 나중에 담은 것으로 대체
//var 변수명, let변수명, const 변수명

//let 변수명 - 자료를 업데이트 할 수 있다.
//const 변수명 - 처음 선언할 때만 자료를 넣을 수 있고, 업데이트 안됌
//변수 이름 만드는 법: 카멜 표기법 - 시작은 소문자 다른 단어가 붙으면 그 단어는 대문자
                       //ex) myName, finalResult
// let: 같은 이름의 변수를 생성x  

let num; // num이라는 이름의 변수 선언 빈박스 만듦.
num=10; //num이라는 박스에 10이라는 자료를 넣음
        // =는 오른쪽에 있는 자료를 왼쪽에 넣는다(할당한다) 는 뜻.

let num2=20;

console.log(num); // console은 웹브라우저의 개발자도구의 console에 출력
console.log(num2); 

document.write(num+num2); //document는 웹브라우저의 html화면에 출력


//const: 상수형 변수, 같은 이름의 변수 생성 x, 선언 후 할당 x
        //선언과 동시에 값을 할당해야 함

// const num3; // 선언만 했기 때문에 error
const num3=30;


document.write(num3);

//num3=40; //const변수에 재할당을 하려고 해서 error


let num4=50;
const num5=100;
let result = num4*num5;
document.write(result);


//자료형 
// 숫자형(정수, 실수), 문자형, 논리형(true,false)
// 배열 array[숫자, 문자, 함수, 객체리터럴 등이 들어감] 순서가 있다,인덱싱,슬라이싱
//객체 리터럴, JSON, {key:value}

//숫자형
num=10;
num2=3.14;
num4=3;
let num6=2;
console.log(num*num2);
console.log(num/num2);
console.log(num/num4);
console.log(num/num6);

let string1="hello";
let string2="javascript";
console.log(string1);
console.log(string1+string2); // string+string은 이어 써진다


//이스케이프 문자
console.log(string1+"\t"+string2);
console.log(string1+"\n"+string2);
console.log(string1+" \'"+string2+"\'");

//템플릿 문자열(백틱 ` `)
let string3=`템플릿 문자열을 큰따옴표(")나 작은따옴표(')가 아닌 백틱(\`)으로 문자열을 만든다.`;
console.log(string3);
let string4=`템플릿 문자열은 \$\{\}을 이용해서 변수의 내용을 바로 출력 가능 num : ${num}`;

console.log(string4);
console.log(`num + num2 = ${num+num2}`);

// 배열 array: 여러 개의 자료가 나열되어 있는 형태의 자료형
// []  대괄호 안에 여러개의 다른 데이터형의 자료도 넣을 수 있음
// 순서가 있는 자료형, 순서에 맞추어 인덱스 번호 부여
// 번호로 자료를 호출 가능, 범위를 지정해서 호출도 가능

let studentScore = [80,70,90,60]; //국어,영어,수학,과학 점수
let arrayValues = [80, 3.14, "배열", [1,"신기해", {배열:'array'}]];
console.log(studentScore);
console.log(arrayValues);

//배열은 순서가 있다. 배열 안에 있는 자료를 꺼내는 방법
//0번부터 버호가 순서대로 매겨짐
//배열 안의 자료를 꺼내는 방법은 배열 변수명[번호]
//console.log(studentScore[1]); // 번호가 0번부터 시작하기 때문에 1번은 70
//console.log(studentScore[0]);
console.log(arrayValues[2]);
console.log(arrayValues[3][1]);

//객체 리터럴 JSON
//{key : value}
// key를 호출하면 value가 출력됨
//{name:'홍길동', school:'서초 중학교', age:14}

// let addressList = {name:'홍길동', school:'서초', age:14};
// console.log(addressList);
// let addressList2 = {name:['홍길동','둘리','에스파'], school:['서초','강남','성남'], age:[14,15,16]};
// console.log(addressList2);

// //객체리터럴의 자료를 꺼내는 방법: key를 호출한다.
// console.log(addressList2['name'][2]);

// //형변환: 자료형을 바꾸는 것
// const numChar =10+"10"; //자바스크립트에서는 숫자와 문자 연산을 하면 자동으로 문자연산을 한다
// console.log(numChar);


// let strNum="10";
// num =10;
// if(num==strNum) {
//     console.log("같음")
// }
// //Number()는 문자를 숫자로 변환, String()은 숫자를 문자로 변환

// //연산자 +, -, *, /, %, **
// // ++a 전치연산자, a++후치연산자

// //논리 연산자
// //&&,||

// //삼항 연산자 x ? y : z -> x냐? 참y, 거짓z

// let score=90;
// let grade=score >=90 ? 'a+':'b';
// console.log(grade);

// //조건문 다루기 if else else if
// num=10;
// if(num%2==0) {
//     console.log("even");
// }
// else {
//     console.log('odd');
// }

// for (let i = 0; i< 4; i++) {
//    console.log(studentScore[i]);
    
// }
// //중첩반복문
// for (let i = 0; i <= 23; i++) {
//     for (let j = 0; j <= 59; j++) {
//         console.log(i+"시"+j+"분");
        
//     }
// }

// for(let k in studentScore) {
//     console.log(studentScore[k])
// }

//break; 특정 조건을 만나면 반복을 중단
// for(let i=0; i<10; i++) {
//     console.log(i)
//     if(i==4){
//         break;
//     }
// }

//continue; 특정 조건을 만나면 건너뜀
// for(let i=0; i<20; i++) {
   
//     if(i%2==0){
//         console.log(i)
//     }
//     else {
//         continue;
//     }
// }


//함수
// function 함수명(인자 값) {
//           return 값
// }
// function gugudan() {
//     for(let i=1; i<=9; i++) {
//         console.log(`3 * ${i} = ${3*i}`);
//     }
// }
// gugudan();

// function gugudan(num) {
//     for(let i=1; i<=9; i++) {
//         console.log(`${num} * ${i} = ${num*i}`);
//     }
// }
// gugudan(2);

// //함수를 정의하는 다른 방법 
// const fn3 = (num) => {
//     for(let i=1; i<=9; i++) {
//        console.log(`${num} * ${i} = ${num*i}`)
// }
// }
// fn3(6);


// const calcSum = (num1, num2) => {
//     result=num1+num2;
//     return result;
// }

// console.log(calcSum(6,3));


// const hol = (num1,num2) => {
//     let arr =[]
//     for(num1; num1<=num2; num1++) {
//         if(num1%2==1) {
//             console.log(num1);
//             arr.push(num1);
//         }
//     }
//     return arr;
// }

// console.log(hol(1,10));


//브라우저 객체 모델 사용하기
function popup() {
    window.open('http://www.naver.com','팝업','width=200','height=100')
}

const el=document.querySelector(".box-1");
el.style.color="red";
console.log(el);