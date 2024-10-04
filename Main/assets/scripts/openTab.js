function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // 모든 탭 콘텐츠를 숨김
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // 모든 탭 링크에서 active 클래스 제거
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 클릭한 탭의 콘텐츠를 보이도록 처리
    document.getElementById(tabName).style.display = "block";
    
    // 클릭한 탭에 active 클래스 추가
    evt.currentTarget.className += " active";
}

// 기본적으로 첫 번째 탭 (Profile) 열기
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Profile").style.display = "block"; // 기본 탭 콘텐츠 열기
});
