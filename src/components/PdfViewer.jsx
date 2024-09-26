// import React, { useEffect } from 'react';
// import PDFObject from 'pdfobject';

// const PdfViewer = () => {
//     useEffect(() => {
//         PDFObject.embed("D:/%%%  private  %%%/개인문서/SQLD합격증.pdf", "#pdf-viewer");
//     }, []);

//     return <div id="pdf-viewer" style={{ width: '100%', height: '100%' }}></div>;
// };

// export default PdfViewer;

import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';

const PdfViewer = ({ fileUrl }) => {
    useEffect(() => {
        PDFObject.embed(fileUrl, '#pdf-viewer');
    }, [fileUrl]);

    return <div id="pdf-viewer" style={{ width: '100%', height: '100%' }}></div>;
};

export default PdfViewer;





