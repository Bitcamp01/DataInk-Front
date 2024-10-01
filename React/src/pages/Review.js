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
import PdfViewer from '../components/PdfViewer'; // PDF 뷰어 컴포넌트
import SelectForm from '../components/SelectForm'; // SelectForm 컴포넌트
import ReviewerTable from '../components/ReviewerTable'; // ReviewerTable 컴포넌트
import '../css/reviewer.css';

const Review = () => {
    // const pdfFilePath = 'D:/%%%  private  %%%/개인문서/SQLD합격증.pdf'; // 여기에 PDF 파일 경로를 설정합니다. 근데 절대경로를 곁들인

    return (
        <section className="content">
            <div className="pdf-section">
                <PdfViewer/>
                {/* <PdfViewer fileUrl={pdfFilePath} /> */}
                {/* 후자로 할 경우 이 형식으로 해야 함 */}
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
