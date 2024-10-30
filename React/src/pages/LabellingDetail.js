import React , { useState } from 'react';
import { useParams } from 'react-router-dom';
import PdfViewer from '../components/PdfViewer'; // PDF 뷰어 컴포넌트
import LabelSelectForm from '../components/LabelSelectForm'; // LabelSelectForm 컴포넌트
import LabelingTable from '../components/LabelingTable'; // LabelingTable 컴포넌트
import '../css/reviewer.css';

const LabellingDetail = () => {
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
                    <LabelingTable />
                    {/* <LabelingTable taskId={id} onDataTransform={setTransformedData}/> */}
                    <LabelSelectForm />
                    {/* <LabelSelectForm taskId={id} transformedData={transformedData}/> */}
                </div>
            </div>
        </section>
    );
};

export default LabellingDetail;
