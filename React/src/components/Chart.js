import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../css/Chart.css';

export default function App() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('월별');
    const [chartKey, setChartKey] = useState(0); // 차트를 리렌더링할 때 사용하는 키
    const [data, setData] = useState([]); // 데이터를 관리하는 상태

    const today = new Date();

    // 데이터 가져오는 함수 (나중에 백엔드에서 값을 불러올 때 이 부분을 수정)
    const fetchDataForView = (view) => {
        const generatedData = [];

        switch (view) {
            case '월별':
                for (let i = -3; i <= 2; i++) {
                    const month = (currentMonth + i + 12) % 12 || 12;
                    const num = month <= currentMonth ? Math.floor(Math.random() * 30) : 0;
                    generatedData.push({ name: month.toString(), num });
                }
                break;

            case '년도별':
                for (let i = -3; i <= 2; i++) {
                    const year = currentYear + i;
                    const num = year <= currentYear ? Math.floor(Math.random() * 30) : 0;
                    generatedData.push({ name: year.toString(), num });
                }
                break;

            case '일자별':
                const dayToday = today.getDate();
                const monthToday = today.getMonth() + 1;
                const yearToday = today.getFullYear();

                for (let i = -3; i <= 2; i++) {
                    const date = new Date(yearToday, monthToday - 1, dayToday + i);
                    const day = date.getDate();
                    const num = date <= today ? Math.floor(Math.random() * 30) : 0;
                    generatedData.push({ name: day.toString(), num });
                }
                break;

            default:
                break;
        }

        return generatedData;
    };

    // 드롭다운 변경 시 데이터 갱신
    useEffect(() => {
        const newData = fetchDataForView(selectedView);
        setData(newData);
    }, [selectedView, currentMonth, currentYear]);

    // 새로고침 버튼을 클릭하면 차트의 키 값을 업데이트하여 다시 렌더링
    const refreshChart = () => {
        setChartKey(prevKey => prevKey + 1);
        const newData = fetchDataForView(selectedView); // 새로고침 시 데이터 다시 생성
        setData(newData);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleSelectView = (view) => {
        setSelectedView(view);
        setDropdownOpen(false);
    };

    return (
        <div>
            <div className="header-container">
                <h2 className="title">완료된 작업현황</h2>
                <div className="controls">
                    <div className="dropdown-wrapper">
                        <button onClick={toggleDropdown} className="dropdown-button">
                            {selectedView}
                            <span className="dropdown-arrow"></span>
                        </button>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                {['월별', '년도별', '일자별'].map((view, index) => (
                                    <li
                                        key={index}
                                        className={`dropdown-item ${view === selectedView ? 'selected' : ''}`}
                                        onClick={() => handleSelectView(view)}
                                    >
                                        {view}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button onClick={refreshChart} className="refresh-button">
                        <img src='/icons/Refresh_icon.svg' alt="refresh"></img>
                    </button>
                </div>
            </div>
            <ResponsiveContainer key={chartKey} width={436} height={423}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="none" horizontal={true} vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                        cursor={false} 
                        formatter={(value) => [`${value}`, '작업 수']} 
                        labelFormatter={() => ''} 
                    />
                    <Bar dataKey="num">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={parseInt(entry.name) === (selectedView === '월별' ? currentMonth : selectedView === '년도별' ? currentYear : today.getDate()) ? "#7C97FE" : "#D6D6D6"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
