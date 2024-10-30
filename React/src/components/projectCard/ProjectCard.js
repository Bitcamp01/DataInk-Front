import React, { useState } from 'react';
import '../../css/project-card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProjectId } from '../../slices/labelTableSlice';
import { updateBookmarkStatus } from '../../apis/userProjectsApis';

const ProjectCard = ({ projects }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 북마크 클릭 핸들러
    const handleBookmarkClick = (event, project) => {
        event.stopPropagation(); // 클릭 이벤트가 카드로 전파되지 않도록 막음
        dispatch(updateBookmarkStatus({
            projectId: project.id,
            isBookmarked: !project.isBookmarked
        }));
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
                        <button className="project-card__bookmark" onClick={(e) => handleBookmarkClick(e, project)}>
                            <img 
                                src={project.isBookmarked ? '/icons/pin-icon.svg' : '/icons/none_pin-icon.svg'}
                                alt={project.isBookmarked ? '즐겨찾기 됨' : '즐겨찾기 안됨'}
                            />
                        </button>
                    </div>
                    <div className="project-card__details">
                        <span className="project-card__explanation">{project.description}</span>
                        <span>
                            진행률 <span className="project-card__percent"> {project.progress}</span>%
                        </span>
                        <div>
                            {project.progress === 'Loading...' ? (
                                <div>
                                    <span className="project-card__loading-text">Loading...</span>
                                </div>
                            ) : (
                                <div className="project-card__progress-container">
                                    <span className="project-card__progress" style={{ width: `${project.progress}%` }}></span>
                                    <span className="project-card__progress-background"></span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="project-card__members">
                        <div className="project-card__admin">
                            <span className='project-card__admin-text'>관리자</span>
                            <span className='admin'>홍길동</span>
                        </div>
                        <div className="project-card__manager">
                            <span className='project-card__manager-text'>검수자</span>
                            <span className='manager'>홍길동</span>
                        </div>
                        <div className="project-card__labeler">
                            <span className="project-card__labeler-text">멤버</span>
                            <div className="labeler">
                                {project.members
                                    .map((member) => member.memberName) // 이름만 추출
                                    .filter((name) => name) // 빈 이름 제거
                                    .slice(0, 4) // 최대 5명만 표시
                                    .map((name, idx) => (
                                        <span key={idx} className="labeler">{name}</span>
                                    ))}
                                {project.members.filter((member) => member.memberName).length > 5 && (
                                    <span className="labeler">...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectCard;
