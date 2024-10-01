import React, { useEffect } from 'react';
import PDFObject from 'pdfobject';

const PdfViewer = () => {
    useEffect(() => {
        // 경로에서 public은 생략하고 /Sample.pdf처럼 절대 경로를 사용합니다.
        // 상대경로로 지정을 하면 무조건 cors 정책에 위배되며
        // public에 있는 상태에서 불러내야 하며 파일명은 되도록이면...아니 그냥 무조건 영어로, 특수기호 없이 하셔야 합니다.
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


// 사용하실 때 둘 중에 맞는 부분이 있을겁니다. 전자가 되면 전자로 하시고 후자가 되시면 후자로 하시면 됩니다.


