import React from 'react';
import './assets/css/main.css';
import './assets/css/member-management.css';

const MemberManagement = () => {
  return (
    <div className="layout">
      {/* 사이드바 */}
      <aside className="sidebar">
        <img className="sidebar__logo" src="assets/images/datalnk-logo.png" alt="데이터잉크 아이콘" />
        <div className="sidebar__menu">
          <a href="/main" className="sidebar__icon sidebar__icon--active">
            <img src="assets/images/main-home-icon.png" alt="메인홈" />
          </a>
          <a href="/data" className="sidebar__icon">
            <img src="assets/images/data-icon.png" alt="데이터라벨링" />
          </a>
          <a href="/member" className="sidebar__icon">
            <img src="assets/images/member-icon.png" alt="멤버관리" />
          </a>
          <a href="/" className="sidebar__icon">
            <img src="assets/images/notice-icon.png" alt="공지사항" />
          </a>
        </div>
      </aside>

      <aside className="extra-sidebar">
        <div className="extra-sidebar__menu">
          <a href="/main" className="extra-sidebar__link">대시보드(Home)</a>
          <a href="/data" className="extra-sidebar__link">데이터라벨링</a>
          <a href="/member" className="extra-sidebar__link">멤버관리</a>
          <a href="/" className="extra-sidebar__link">공지사항</a>
        </div>
      </aside>

      {/* 메인(헤더 + 콘텐츠) 영역 */}
      <div className="main">
        {/* 헤더 영역 */}
        <header className="header">
          <div className="header__back-icon">
            <img src="assets/images/back-icon.png" alt="뒤로가기" />
          </div>
          <div className="header__title">Member management</div>
          <div className="header__search">
            <input type="text" className="header__search-input" />
            <img src="assets/images/search-icon.png" alt="검색 아이콘" className="header__search-icon" />
          </div>
          <div className="header__icons">
            <img src="assets/images/chat.png" alt="채팅" className="header__icon header__icon--chat" />
            <img src="assets/images/alert.png" alt="알람" className="header__icon header__icon--alert" />
            <img src="assets/images/profile.png" alt="프로필" className="header__icon header__icon--profile" />
            <img src="assets/images/profile-drop.png" alt="드롭다운" className="header__icon header__icon--dropdown" />
          </div>
        </header>

        {/* 콘텐츠 영역 */}
        <section className="member-list">
          <div className="member-list__title">전체 멤버 리스트</div>
          <div className="member-list__discription">
            가입한 멤버들의 리스트를 확인하고<br />
            멤버추가 버튼을 이용하여 새로운 멤버를 등록할 수 있습니다.
          </div>

          <div className="member-list__tab_and_button">
            <div className="tab-section__tabs">
              <button className="tab-section__tab tab-section__tab--active">멤버 리스트</button>
              <button className="tab-section__tab">프로젝트 관리</button>
            </div>
            <button className="member-list__add-btn">멤버 추가</button>
          </div>
          <table className="member-list__table">
            <thead>
              <tr id="table_category">
                <th>No</th>
                <th>이름</th>
                <th>소속(부서)</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>역할</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>김영크</td>
                  <td>소속(부서)</td>
                  <td>bitcamp12@gmail.com</td>
                  <td>010-1112-2334</td>
                  <td>관리자</td>
                  <td>2024.09.10 23:00</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <Stack spacing={2}>
            <Pagination count={10} />
            <Pagination count={10} color="primary" />
            <Pagination count={10} color="secondary" />
            <Pagination count={10} disabled />
          </Stack>
        </section>
      </div>
    </div>
  );
}

export default MemberManagement;