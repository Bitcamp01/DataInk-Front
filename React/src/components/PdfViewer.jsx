import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';

const PdfViewer = () => {
    useEffect(() => {
        // 경로에서 public은 생략하고 /Sample.pdf처럼 절대 경로를 사용합니다.
        PDFObject.embed("/Sample.pdf", "#pdf-viewer");
    }, []);

    return <div id="pdf-viewer" style={{ width: '100%', height: '100%' }}></div>;
};

export default PdfViewer;

// import React, { useEffect } from 'react';
// import PDFObject from 'pdfobject';

// const PdfViewer = ({ fileUrl }) => {
//     useEffect(() => {
//         PDFObject.embed(fileUrl, '#pdf-viewer');
//     }, [fileUrl]);

//     return <div id="pdf-viewer" style={{ width: '100%', height: '100%' }}></div>;
// };

// export default PdfViewer;





