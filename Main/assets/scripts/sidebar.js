const sidebar = document.querySelector('.sidebar');
const extraSidebar = document.querySelector('.extra-sidebar');
const main = document.querySelector('.main');
const extraSidebarLinks = document.querySelectorAll('.extra-sidebar__link'); // extra-sidebar 링크들


let isSidebarOpen = false; // 사이드바가 열려있는 상태를 추적

// 사이드바 열고 닫기 함수
function openSidebar() {
    extraSidebar.style.left = '4.375rem'; // sidebar의 너비만큼 이동
    isSidebarOpen = true; // 사이드바가 열림
    // 링크들 활성화 (커서도 다시 pointer로 변경)
    extraSidebarLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
    });
}

function closeSidebar() {
    extraSidebar.style.left = '-10.625rem'; // extra-sidebar를 숨김
    isSidebarOpen = false; // 사이드바가 닫힘
    // 링크들 비활성화 (커서도 기본값으로 변경)
    extraSidebarLinks.forEach(link => {
        link.style.pointerEvents = 'none';
        link.style.cursor = 'default';
    });
}

// 링크 클릭 비활성화 처리
extraSidebarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        if (!isSidebarOpen) {
            event.preventDefault(); // 사이드바가 닫힌 상태에서는 링크를 비활성화
        }
    });
});

// sidebar에 마우스를 올렸을 때
sidebar.addEventListener('mouseenter', openSidebar);

// extra-sidebar에서 마우스를 내렸을 때
extraSidebar.addEventListener('mouseleave', closeSidebar);
