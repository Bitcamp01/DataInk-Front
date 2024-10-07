import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';

const PdfViewer = ({ fileUrl }) => { // fileUrl prop을 받음
    useEffect(() => {
        // 전달된 fileUrl을 사용하여 PDF 파일 임베드
        PDFObject.embed(fileUrl, "#pdf-viewer");
    }, [fileUrl]); // fileUrl이 변경될 때마다 실행

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


// 사용하실 때 둘 중에 맞는 부분이 있을겁니다. 전자가 되면 전자로 하시고 후자가 되시면 후자로 하시면 됩니다.


