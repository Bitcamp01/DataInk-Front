import React, { useState } from 'react';
import '../../css/project-card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProjectId } from '../../slices/labelTableSlice';

const ProjectCard = ({projects}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 북마크 상태 관리, 기본은 false, 즉 비활성화된 상태
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 클릭 핸들러
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  }

  // 카드 클릭 핸들러
  const handleCardClick = (projectId) => {
    dispatch(setProjectId(projectId)); // projectId를 전역 상태로 저장
    navigate(`/label/work`);
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
