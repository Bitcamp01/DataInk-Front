// import React from 'react';
// import PdfViewer from './PdfViewer';
// import SelectForm from './SelectForm'; 
// import ReviewerTable from './ReviewerTable';

// const Review = () => {
//     return (
//         <section className="content">
//             <div className="pdf-section">
//                 <PdfViewer />
//             </div>
//             <div className="work-space">
//                 <div className="container">
//                     <ReviewerTable />
//                     <SelectForm />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Review;



import React from 'react';
import PdfViewer from './PdfViewer'; // PDF 뷰어 컴포넌트
import SelectForm from './SelectForm'; // SelectForm 컴포넌트
import ReviewerTable from './ReviewerTable'; // ReviewerTable 컴포넌트
import '../css/reviewer.css';

const Review = () => {
    const pdfFilePath = 'D:/%%%  private  %%%/개인문서/SQLD합격증.pdf'; // 여기에 PDF 파일 경로를 설정합니다. 지금은 제 폴더 경로 적은거

    return (
        <section className="content">
            <div className="pdf-section">
                <PdfViewer fileUrl={pdfFilePath} />
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

export default Review;
