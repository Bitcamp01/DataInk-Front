const sidebar = document.querySelector('.sidebar');
const extraSidebar = document.querySelector('.extra-sidebar');
const main = document.querySelector('.main');

// 사이드바 열고 닫기 함수
function openSidebar() {
    extraSidebar.style.left = '4.375rem'; // sidebar의 너비만큼 이동
    main.style.marginLeft = '15rem'; // extra-sidebar와 함께 main도 이동
}

function closeSidebar() {
    extraSidebar.style.left = '-10.625rem'; // extra-sidebar를 숨김
    main.style.marginLeft = '4.375rem'; // main이 sidebar로 다시 붙음
}

// sidebar에 마우스를 올렸을 때
sidebar.addEventListener('mouseenter', openSidebar);
sidebar.addEventListener('mouseleave', closeSidebar);

// extra-sidebar에 마우스를 올렸을 때
extraSidebar.addEventListener('mouseenter', openSidebar);
extraSidebar.addEventListener('mouseleave', closeSidebar);
