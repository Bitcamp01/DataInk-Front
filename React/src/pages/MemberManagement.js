// import React from 'react';
// import { useState } from 'react';
// import '../css/memberManagement.css';
// import FixedSizeGrid from '../components/Table_memberListAll'; 
// import Table_projectList from '../components/Table_projectList';

// const MemberManagement = () => {
//   const [activeTab, setActiveTab] = useState('member');

//   // 탭 변경 함수
//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//       <>
//         {/* 콘텐츠 영역 */}
//         <section className="member-list">
//           <div className="member-list__title">
//             {activeTab === 'member'?'전체 멤버 리스트' :'프로젝트 별 멤버 관리'}
//             </div>
//           <div className="member-list__discription">
//             {activeTab === 'member'? (
//               <> 가입한 멤버들의 리스트를 확인하고<br />
//               멤버추가 버튼을 이용하여 새로운 멤버를 등록할 수 있습니다
//               </>
//             ) : (
//               <>해당 프로젝트에 멤버를 추가, 삭제하여 관리자는 프로젝트 별로 멤버들을 손쉽게 관리 할 수 있습니다.
//               <br/>먼저, 관리할 프로젝트를 선택해주세요.
//               </>
//             )}
           
//           </div>
      
//           <div className="member-list__tab_and_button">
//           <div className="tab-section__tabs">
//         {/* 멤버 리스트 탭 */}
//         <button
//           className={`tab-section__tab ${activeTab === 'member' ? 'tab-section__tab--active' : ''}`}
//           onClick={() => handleTabClick('member')}>
//           멤버 리스트
//         </button>

//         {/* 프로젝트 관리 탭 */}
//         <button
//           className={`tab-section__tab ${activeTab === 'project' ? 'tab-section__tab--active' : ''}`}
//           onClick={() => handleTabClick('project')}>
//           프로젝트 관리
//         </button>
//         </div>

//         {/* 멤버 추가 버튼: activeTab이 'member'일 때만 보이게 */}
//         {activeTab === 'member' && (
//           <button className="member-list__add-btn">멤버 추가</button>
//         )}
//          </div>


//         {/* 테이블 영역 */} 
//         {activeTab === 'member' ?  <FixedSizeGrid /> : <Table_projectList/>}
       

//         </section>
//       </>
//   );
// }

// export default MemberManagement;