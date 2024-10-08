import React, { useState } from 'react';
import '../../css/project-card.css';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ projects }) => {

    const navigate = useNavigate(); // navigate 함수 정의 (병주)

    // 북마크 상태 관리, 기본은 false, 즉 비활성화된 상태
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 북마크 클릭 핸들러
    const handleBookmarkClick = () => {
        // 클릭하면 상태를 반대로 변화시킴
        setIsBookmarked(!isBookmarked);
    }

    // 카드 클릭 핸들러 (병주)
    const handleCardClick = (projectId) => {
      navigate(`/label/work`); // 프로젝트 ID 생기면 아래처럼 경로로 전달, 지금은 없어서 받기만 하고 전달 x (병주)
      // navigate(`/label/work/${projectId}`);
    }

  return (
    <div>
      {projects.map((project, index) => (
        <div className="card" key={index} onClick={() => handleCardClick(project.id)}>
          <div className="projectCard-header">
            <h2>{project.name}</h2>
            <div className="deadline">D-{project.deadline}</div>
            {/* 즐겨찾기 버튼 */}
            <button className="bookmark" onClick={handleBookmarkClick}>
              <img 
                src={isBookmarked ? '/icons/none_pin-icon.svg' : '/icons/pin-icon.svg'}
                alt={isBookmarked ? '즐겨찾기 됨' : '즐겨찾기'}
              />
            </button>
          </div>
          <div className="projectDetails">
            <span className="explanation">{project.description}</span>
            <h4>
              진행률 <span className="project-percent"> {project.progress}</span>%
            </h4>
            <div className="progress-container">
              <span className="progress" style={{ width: `${project.progress}%` }}></span>
              <span className="progress-background"></span>
            </div>
          </div>
          <div className="members">
            {/* 관리자 */}
            <div className="manager">
              <span>관리자</span>
              <img src="/images/manager-profile_img.png" alt="관리자 프로필" />
            </div>
            {/* 검수자 */}
            <div className="reviewer">
              <span>검수자</span>
              <img src="/images/reviewer-profile_img.png" alt="검수자 프로필" />
            </div>
            {/* 멤버 */}
            <div className="labeler">
              <span className="labeler-text">멤버</span>
              <div className="labeler-profile">
                {/* 멤버 이미지들 */}
                {project.members
                  .filter(member => member.class === 'labeler')
                  .map((member, idx) => (
                    <img
                      key={idx}
                      style={idx === 0 ? { width: '43px', height: '43px' } : {}}
                      src={member.profileImg}
                      alt={`라벨러 프로필 ${idx + 1}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCard;
