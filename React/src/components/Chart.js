import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import '../css/Chart.css';
import { useState, useEffect } from 'react';

// Tick 컴포넌트 정의
const CustomTick = (props) => {
    const { x, y, payload, selectedView, currentMonth, currentYear, today } = props;
    const tickValue = parseInt(payload.value);
    
    let color = '#BDBDBD'; // 기본 색상
    if ((selectedView === '월별' && tickValue === currentMonth) ||
        (selectedView === '년도별' && tickValue === currentYear) ||
        (selectedView === '일자별' && tickValue === today.getDate())) {
        color = '#2E7AF2'; // 파란색으로 강조
    }

    return (
        <text x={x} y={y + 10} fill={color} textAnchor="middle">
            {payload.value}
        </text>
    );
};

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
                const currentYear = new Date().getFullYear(); // 현재 연도 가져오기
                for (let i = -3; i <= 2; i++) {
                    const month = (currentMonth + i + 12) % 12 || 12; // 1~12로 조정
                    const year = currentYear + Math.floor((currentMonth + i - 1) / 12); // 년도 계산
                    const num = (year < currentYear || (year === currentYear && month <= currentMonth))
                        ? Math.floor(Math.random() * 30)
                        : 0;
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
            <div className="chart__header-container">
                <h3 className="chart__title">완료된 작업현황</h3>
                <div className="chart__controls">
                    <div className="chart__refresh-button-wrapper">
                        <button onClick={refreshChart} className="chart__refresh-button">
                            <img src='/icons/Refresh_icon.svg' alt="refresh" />
                        </button>
                    </div>
                    <div className="chart__dropdown-wrapper">
                        <button onClick={toggleDropdown} className="chart__dropdown-button">
                            {selectedView}
                            <span className="chart__dropdown-arrow"></span>
                        </button>
                        {isDropdownOpen && (
                            <ul className="chart__dropdown-menu">
                                {['월별', '년도별', '일자별'].map((view, index) => (
                                    <li
                                        key={index}
                                        className={`chart__dropdown-item ${view === selectedView ? 'chart__dropdown-item--selected' : ''}`}
                                        onClick={() => handleSelectView(view)}
                                    >
                                        {view}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div style={{marginTop: '5px'}}>
                <ResponsiveContainer key={chartKey} width={400} height={330}>
                    <BarChart data={data} margin={{bottom: 10}}>
                        <CartesianGrid strokeDasharray="none" horizontal={true} vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            tick={<CustomTick selectedView={selectedView} currentMonth={currentMonth} currentYear={currentYear} today={today} />} 
                            interval={0}
                            padding={{bottom: 10}}
                        />
                        <YAxis tick={{ fill: "#BDBDBD" }}  />
                        <Tooltip 
                            cursor={false} 
                            formatter={(value) => [`${value}`, '작업 수']} 
                            labelFormatter={() => ''} 
                        />
                        <Bar dataKey="num" barSize={40}>
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
        </div>
    );
}
