import React , { useState } from 'react';
import { useParams } from 'react-router-dom';
import PdfViewer from '../components/PdfViewer'; // PDF 뷰어 컴포넌트
import SelectForm from '../components/SelectForm'; // SelectForm 컴포넌트
import ReviewerTable2 from '../components/ReviewerTable2'; // ReviewerTable2 컴포넌트
import '../css/reviewer.css';

const Review = () => {
    // PDF 파일 경로를 여기에 설정
    const { id } = useParams();
    const pdfFilePath = '/practice.pdf'; // 상대 경로 설정

    const [transformedData, setTransformedData] = useState([]);

    return (
        <section className="review-content">
            <div className="pdf-section">
                {/* fileUrl prop을 PdfViewer에 전달 */}
                <PdfViewer fileUrl={pdfFilePath} />
            </div>
            <div className="work-space">
                <div className="review-work-container">
                    <ReviewerTable2 taskId={id} onDataTransform={setTransformedData}/>
                    <SelectForm taskId={id} transformedData={transformedData} />
                </div>
            </div>
        </section>
    );
};

export default Review;
