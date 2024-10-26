import React, { useState } from 'react';
import '../../css/project-card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProjectId } from '../../slices/labelTableSlice';

const ProjectCard = ({ projects }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div className="project-card__container">
            {projects.map((project, index) => (
                <div className="project-card" key={index} onClick={() => handleCardClick(project.id)}>
                    <div className="project-card__header">
                        <span className='project-name'>{project.name}</span>
                        <div
                            className="project-card__deadline"
                            style={{ backgroundColor: project.deadline <= 30 ? '#FD5B5B' : '#7C97FE' }}
                        >
                            D-{project.deadline}
                        </div>
                        <button className="project-card__bookmark" onClick={handleBookmarkClick}>
                            <img 
                                src={isBookmarked ? '/icons/none_pin-icon.svg' : '/icons/pin-icon.svg'}
                                alt={isBookmarked ? '즐겨찾기 됨' : '즐겨찾기'}
                            />
                        </button>
                    </div>
                    <div className="project-card__details">
                        <span className="project-card__explanation">{project.description}</span>
                        <span>
                            진행률 <span className="project-card__percent"> {project.progress}</span>%
                        </span>
                        <div className="project-card__progress-container">
                            <span className="project-card__progress" style={{ width: `${project.progress}%` }}></span>
                            <span className="project-card__progress-background"></span>
                        </div>
                    </div>
                    <div className="project-card__members">
                        <div className="project-card__manager">
                            <span>관리자</span>
                            <img src="/images/manager-profile_img.png" alt="관리자 프로필" />
                        </div>
                        <div className="project-card__reviewer">
                            <span>검수자</span>
                            <img src="/images/reviewer-profile_img.png" alt="검수자 프로필" />
                        </div>
                        <div className="project-card__labeler">
                            <span className="project-card__labeler-text">멤버</span>
                            <div className="project-card__labeler-profile">
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
