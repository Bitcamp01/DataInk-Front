import React from 'react';
import PdfViewer from './PdfViewer'; // PDF 뷰어 컴포넌트
import SelectForm from './SelectForm'; // SelectForm 컴포넌트
import ReviewerTable from './ReviewerTable'; // ReviewerTable 컴포넌트

const ReviewContent = () => {
    return (
        <section className="content">
            <div className="pdf-section">
                <PdfViewer />
            </div>
            <div className="work-space">
                <div className="container">
                    <ReviewerTable />
                    <SelectForm />
                </div>
            </div>
        </section>
    );
};

export default ReviewContent;
