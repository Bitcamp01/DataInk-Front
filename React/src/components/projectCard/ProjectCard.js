import React, { useEffect, useState } from 'react';
import '../../css/project-card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProjectId } from '../../slices/labelTableSlice';
import { updateBookmarkStatus } from '../../apis/userProjectsApis';
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchProjectMembersDirectly = async (projectId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user-projects/members/${projectId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
            }
        });
        return response.data.items || []; // items 배열만 반환
    } catch (error) {
        console.error("Error fetching project members:", error);
        return [];
    }
};

const ProjectCard = ({ projects }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [projectMembers, setProjectMembers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (projects.length > 0) {
                const membersData = {};
                for (let project of projects) {
                    const members = await fetchProjectMembersDirectly(project.id);
                    membersData[project.id] = members;
                }
                setProjectMembers(membersData);
            }
        };
        fetchData();
    }, [projects]);

    const handleBookmarkClick = async (event, project) => {
        event.stopPropagation();
        try {
            await updateBookmarkStatus({
                projectId: project.id,
                isBookmarked: !project.isBookmarked,
            });
        } catch (error) {
            console.error("Error updating bookmark status:", error);
        }
    };

    const handleCardClick = (projectId) => {
        dispatch(setProjectId(projectId));
        navigate(`/label/work`);
    };

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
                    {/* 멤버 데이터 */}
                    <div className="project-card__members">
                        <div className="project-card__admin">
                            <span className="project-card__admin-text">관리자</span>
                            <span className="admin">
                                {(projectMembers[project.id] || [])
                                    .filter((member) => member.authen === 'ROLE_ADMIN')
                                    .map((member) => member.name)
                                    .join(', ') || '없음'}
                            </span>
                        </div>
                        <div className="project-card__manager">
                            <span className="project-card__manager-text">검수자</span>
                            <span className="manager">
                                {(projectMembers[project.id] || [])
                                    .filter((member) => member.authen === 'ROLE_MANAGER')
                                    .map((member) => member.name)
                                    .join(', ') || '없음'}
                            </span>
                        </div>
                        <div className="project-card__labeler">
                        <span className="project-card__labeler-text">멤버</span>
                            <div className="labeler">
                                {(projectMembers[project.id] && projectMembers[project.id].filter((member) => member.authen === 'ROLE_USER').length > 0)
                                    ? projectMembers[project.id]
                                        .filter((member) => member.authen === 'ROLE_USER')
                                        .slice(0, 4)
                                        .map((member, idx) => (
                                            <span key={idx} className="labeler">
                                                {member.name}
                                            </span>
                                        ))
                                    : '없음'}
                                {(projectMembers[project.id] && projectMembers[project.id].filter((member) => member.authen === 'ROLE_USER').length > 4) && (
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
